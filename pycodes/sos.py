import streamlit as st
from streamlit_js_eval import streamlit_js_eval
import requests

# --- API Keys ---
OPENROUTER_API_KEY = "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"
GOOGLE_API_KEY = "AIzaSyAiCmCdegT7DrgtRIUUQWGsuj_cRahAlcg"

HEADERS = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

# --- Get Nearby Doctors ---
def get_emergency_doctors(location):
    prompt = f"""
    You are an emergency assistant. List 3 to 5 realistic-sounding nearby doctors available near "{location}".
    Only show:
    - Doctor's full name
    - Contact number

    Format the output clearly like:
    • Dr. Name - Phone Number
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

# --- Streamlit UI ---
st.set_page_config(page_title="🚨 SOS Doctor Help", page_icon="🚑")
st.title("🚨 Emergency SOS - Find Nearby Doctors")
st.markdown("This app detects your location and shows emergency doctors with contact numbers.")

location_name = None
lat = lon = None

# Detect location
if "sos_clicked" not in st.session_state:
    st.session_state["sos_clicked"] = False

if st.button("📍 Detect My Location & Find Help"):
    st.session_state["sos_clicked"] = True

if st.session_state["sos_clicked"]:
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
        key="sos_location"
    )

    if coords:
        lat = coords["lat"]
        lon = coords["lon"]
        st.success(f"📍 Coordinates: ({lat}, {lon})")

        try:
            google_url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lon}&key={GOOGLE_API_KEY}"
            response = requests.get(google_url)
            if response.status_code == 200:
                data = response.json()
                if data['results']:
                    location_name = data['results'][0]['formatted_address']
                    st.markdown(f"📌 **Detected Location:** {location_name}")

                    with st.spinner("Fetching emergency doctor contacts..."):
                        doctor_info = get_emergency_doctors(location_name)
                        if doctor_info:
                            st.markdown("### 👨‍⚕️ Emergency Contacts")
                            st.markdown(doctor_info)
                        else:
                            st.warning("Unable to retrieve emergency contacts.")
                else:
                    st.warning("No address found for coordinates.")
        except Exception as e:
            st.error(f"Google Maps API error: {e}")
    else:
        st.info("Waiting for location permission... Allow it in your browser.")
