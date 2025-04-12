import streamlit as st
from practice1 import run_practice1
from nnn import run_nnn
from nnn1 import run_nnn1

# ✅ This must be the very first Streamlit command
st.set_page_config(page_title="Health Toolbox", page_icon="🩺")

# Navigation
st.sidebar.title("🧰 Choose a Tool")
app = st.sidebar.radio("Select a module:", [
    "Doctor Finder",
    "Generic Medicine Suggestion",
    "Medicine Health Analyzer"
])

# Run selected app
if app == "Doctor Finder":
    run_practice1()
elif app == "Generic Medicine Suggestion":
    run_nnn()
elif app == "Medicine Health Analyzer":
    run_nnn1()
