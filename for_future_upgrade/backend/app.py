from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import requests

app = Flask(__name__)
CORS(app)

doctor_df = pd.read_csv("doctors_indian_with_phone.csv")

API_KEY = "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"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def get_specialization(problem):
    msg = f"Suggest a medical specialist for the symptom: {problem}. Only return the one specialization name which is more relevant such as Cardiologist, Dermatologist, Orthopedic, Neurologist, Psychiatrist, etc."
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
        print("API error:", e)
    return None

@app.route("/api/find-doctor", methods=["POST"])
def find_doctor():
    data = request.json
    problem = data.get("problem")

    spec = get_specialization(problem)
    if not spec:
        return jsonify({"error": "Could not determine specialization"}), 500

    matches = doctor_df[doctor_df['specialization'].str.lower().str.contains(spec.lower())]
    doctors = matches.to_dict(orient="records")

    return jsonify({"specialization": spec, "doctors": doctors})

if __name__ == "__main__":
    app.run(debug=True)
