def run_practice1():
    import streamlit as st
    from streamlit_js_eval import streamlit_js_eval
    import requests

    # --- API Setup ---
    OPENROUTER_API_KEY = "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"
    GOOGLE_API_KEY = "AIzaSyAiCmCdegT7DrgtRIUUQWGsuj_cRahAlcg"

    HEADERS = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    # --- Get specialization from symptom ---
    def get_specialization(symptom):
        msg = f"Suggest a medical specialist for the symptom: {symptom}. Only return the one specialization name which is more relevant such as Cardiologist, Dermatologist, Orthopedic, Neurologist, Psychiatrist, etc."
        data = {
            "model": "google/gemini-2.0-flash-exp:free",
            "messages": [{"role": "user", "content": msg}]
        }
        try:
            res = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=HEADERS, json=data)
            if res.status_code == 200:
                result = res.json()
                return result['choices'][0]['message']['content'].strip()
        except Exception as e:
            st.error(f"Error getting specialization: {e}")
        return None

    # --- Get doctors nearby ---
    def get_doctors_nearby(location, specialization):
        prompt = f"""
        List doctors available near "{location}" who specialize in "{specialization}" in the following format:

        ⦁ name of doctor -

        ⦁ experience -

        ⦁ specialization -

        ⦁ address -

        ⦁ contact number -

        Only provide 3–5 fictional but realistic-sounding examples.
        """
        data = {
            "model": "google/gemini-2.0-flash-exp:free",
            "messages": [{"role": "user", "content": prompt}]
        }
        try:
            res = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=HEADERS, json=data)
            if res.status_code == 200:
                result = res.json()
                return result['choices'][0]['message']['content'].strip()
        except Exception as e:
            st.error(f"Error fetching doctors: {e}")
        return None

    # --- Streamlit App ---
   # st.set_page_config(page_title="Doctor Finder", page_icon="🩺")
    st.title("🧑‍⚕️ Doctor Finder Based on Symptoms and Live Location")
    st.markdown("Get specialist doctor suggestions based on your symptoms and see nearby doctors using your GPS.")

    # --- Detect Location ---
    st.subheader("📍 Step 1: Detect Your Location")

    location_name = None
    lat = lon = None

    if "location_clicked" not in st.session_state:
        st.session_state["location_clicked"] = False

    if st.button("📍 Detect My Location"):
        st.session_state["location_clicked"] = True

    if st.session_state["location_clicked"]:
        coords = streamlit_js_eval(
            js_expressions="""
            new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
                        (err) => reject("Permission denied or unavailable: " + err.message)
                    );
                } else {
                    reject("Geolocation not supported");
                }
            })
            """,
            key="get_location"
        )

        if coords:
            lat = coords["lat"]
            lon = coords["lon"]
            st.success(f"✅ Your Coordinates: ({lat}, {lon})")

            try:
                google_url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&key={GOOGLE_API_KEY}"
                response = requests.get(google_url)
                if response.status_code == 200:
                    data = response.json()
                    if data['results']:
                        location_name = data['results'][0]['formatted_address']
                        st.write(f"📌 Location: {location_name}")
                    else:
                        st.warning("No address found for your coordinates.")
                else:
                    st.error("Failed to reach Google Maps API.")
            except Exception as e:
                st.error(f"Google Maps API error: {e}")
        else:
            st.info("⏳ Waiting for GPS access... Please allow location in your browser.")

    # --- Enter Symptom ---
    st.subheader("🩺 Step 2: Describe Your Symptoms")
    symptom = st.text_input("Enter your symptoms (e.g. headache, chest pain, rash)")

    # --- Get Doctors ---
    st.subheader("🔍 Step 3: Find Nearby Doctors")

    if st.button("Find Doctors Near Me"):
        if not location_name:
            st.warning("Please detect your location first.")
        elif not symptom:
            st.warning("Please enter your symptoms.")
        else:
            with st.spinner("Analyzing symptoms and fetching nearby doctors..."):
                specialization = get_specialization(symptom)
                if specialization:
                    st.success(f"✅ Suggested Specialization: {specialization}")
                    doctors = get_doctors_nearby(location_name, specialization)
                    if doctors:
                        st.markdown("### 👨‍⚕️ Nearby Doctors")
                        st.markdown(doctors)
                    else:
                        st.warning("No doctors found at the moment.")
                else:
                    st.error("Could not determine specialization. Try again.")
