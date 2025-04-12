def run_nnn():
    import streamlit as st
    import requests
    import base64

    API_KEY = "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"
    API_URL = "https://openrouter.ai/api/v1/chat/completions"
    MODEL = "google/gemini-2.0-flash-exp:free"

    st.title("Medicine Image Analyzer 💊")
    uploaded_file = st.file_uploader("Upload an image of the medicine", type=["png", "jpg", "jpeg"])

    if "original_reply" not in st.session_state:
        st.session_state.original_reply = None

    if "translated_reply" not in st.session_state:
        st.session_state.translated_reply = None

    if uploaded_file:
        st.image(uploaded_file, caption="Uploaded Image", use_container_width=True)

        if st.button("Give me generic name"):
            img_bytes = uploaded_file.read()
            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

            data = {
                "model": MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "You are a medical expert. You are given a medicine name and you have to suggest a generic medicine of the same medicine. Generate a list of 3 to 5 generic medicines which is same/similar to original medicine with it's recent price:"},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{img_base64}"
                                }
                            }
                        ]
                    }
                ]
            }

            headers = {
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            }

            response = requests.post(API_URL, headers=headers, json=data)

            try:
                result = response.json()
                st.session_state.original_reply = result['choices'][0]['message']['content']
                st.session_state.translated_reply = None
            except Exception as e:
                st.error(f"Error: {result.get('error', str(e))}")

    if st.session_state.original_reply:
        st.success("Response (in English):")
        st.markdown(st.session_state.original_reply)

        st.markdown("### 🌐 Translate Response")
        lang = st.selectbox("Translate to:", ["None", "Hindi", "Tamil", "Telugu"])

        lang_prompts = {
            "Hindi": "Translate the following medical info to Hindi:",
            "Tamil": "Translate the following medical info to Tamil:",
            "Telugu": "Translate the following medical info to Telugu:"
        }

        if lang != "None" and st.session_state.translated_reply is None:
            translate_data = {
                "model": MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": f"{lang_prompts[lang]}\n\n{st.session_state.original_reply}"}
                        ]
                    }
                ]
            }

            headers = {
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            }

            translate_response = requests.post(API_URL, headers=headers, json=translate_data)
            translated_result = translate_response.json()

            try:
                st.session_state.translated_reply = translated_result['choices'][0]['message']['content']
            except Exception as e:
                st.error("Translation failed.")

        if st.session_state.translated_reply:
            st.success(f"Response in {lang}:")
            st.markdown(st.session_state.translated_reply)
