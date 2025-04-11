import React, { useState } from "react";

// const API_KEY = "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"
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
// Replace with your actual key
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.0-flash-exp:free";
console.log("API Key:", API_KEY);

const MedicineAnalyzer = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLang, setSelectedLang] = useState("None");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setResponseText("");
    setTranslatedText("");

    const data = {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                "You are a medical expert. You are given a medicine name and you have to suggest a generic medicine of the same medicine. Generate a list of 3 to 5 generic medicines which is same/similar to original medicine:",
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      setResponseText(json.choices?.[0]?.message?.content || "No response");
    } catch (error) {
      alert("Error fetching analysis");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (selectedLang === "None" || !responseText) return;

    const prompts = {
      Hindi: "Translate the following medical info to Hindi:",
      Tamil: "Translate the following medical info to Tamil:",
      Telugu: "Translate the following medical info to Telugu:",
    };

    const data = {
      model: MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${prompts[selectedLang]}\n\n${responseText}`,
            },
          ],
        },
      ],
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      setTranslatedText(json.choices?.[0]?.message?.content || "No translation");
    } catch (err) {
      alert("Error translating response");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>💊 Medicine Image Analyzer</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageBase64 && (
        <>
          <img
            src={imageBase64}
            alt="Uploaded"
            style={{ width: "100%", marginTop: "1rem", borderRadius: "8px" }}
          />
          <button onClick={handleAnalyze} style={{ marginTop: "1rem" }}>
            {loading ? "Analyzing..." : "Get Generic Names"}
          </button>
        </>
      )}

      {responseText && (
        <div style={{ marginTop: "2rem" }}>
          <h3>📝 Analysis Result</h3>
          <p>{responseText}</p>

          <h4>🌐 Translate To:</h4>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
          <button onClick={handleTranslate} style={{ marginLeft: "10px" }}>
            Translate
          </button>

          {translatedText && (
            <div style={{ marginTop: "1rem" }}>
              <h4>📖 Translated</h4>
              <p>{translatedText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineAnalyzer;
