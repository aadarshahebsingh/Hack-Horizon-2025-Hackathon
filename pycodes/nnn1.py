def run_nnn1():
    import streamlit as st
    import requests
    import base64

    API_KEY = "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"
    API_URL = "https://openrouter.ai/api/v1/chat/completions"
    MODEL = "google/gemini-2.0-flash-exp:free"

    st.title("🩺 Medicine Health Analyzer")

    input_method = st.radio("Select Input Method:", ["📷 Upload Image", "📝 Enter Medicine Name"])

    medicine_name = None
    img_base64 = None

    if input_method == "📷 Upload Image":
        uploaded_file = st.file_uploader("Upload an image of the medicine", type=["png", "jpg", "jpeg"])
        if uploaded_file:
            st.image(uploaded_file, caption="Uploaded Image", use_container_width=True)
            img_bytes = uploaded_file.read()
            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

    elif input_method == "📝 Enter Medicine Name":
        medicine_name = st.text_input("Enter the name of the medicine")

    if st.button("Analyze My Medicine"):
        if not img_base64 and not medicine_name:
            st.warning("Please upload an image or enter a medicine name.")
        else:
            base_prompt = (
                "You're a medical expert. Based on the provided medicine, give me 4 bullet points:\n"
                "1. What disease/problem is this medicine used to treat?\n"
                "2. How long does it usually take to recover?\n"
                "3. Is it okay to stop the medicine now or is it necessary to complete the dose?\n"
                "4. What are some natural/home alternatives that can help alongside or instead of this medicine?\n"
            )

            if img_base64:
                content = [
                    {"type": "text", "text": base_prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"}}
                ]
            else:
                content = [
                    {"type": "text", "text": base_prompt + f"\nMedicine Name: {medicine_name}"}
                ]

            data = {
                "model": MODEL,
                "messages": [{"role": "user", "content": content}]
            }

            headers = {
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json"
            }

            response = requests.post(API_URL, headers=headers, json=data)
            result = response.json()

            try:
                final_reply = result['choices'][0]['message']['content']
                st.success("🧠 AI Health Analysis:")
                st.markdown(final_reply)
            except Exception as e:
                st.error(f"Error: {result.get('error', str(e))}")
