# 🌍 Earthquake Visualizer Web App

**Candidate ID:** Naukri1025  
**Submitted To:** Aganitha Cognitive Solutions — Full Stack Developer Take-Home Challenge  
**Developer:** Harshal Khadatare

🔗 **Live Demo:** [earthquake-visualizer-web-app.vercel.app](https://earthquake-visualizer-web-app.vercel.app/)  
📄 **Challenge Document:** [Take-Home Challenge Instructions](https://drive.google.com/file/d/10Rw3iLn5uMu_8M2SWx_5jSh18pioynyF/view?usp=sharing)

---

## 📘 Project Overview

**Earthquake Visualizer** is a web application designed for **Casey**, a geography student, who wants to visualize recent earthquake activity around the world and understand seismic patterns.  
The app fetches real-time earthquake data using the **USGS Earthquake API** and plots it on an **interactive map** using **React Leaflet**.

This project demonstrates:
- Understanding and interpreting user requirements.
- Building a responsive, data-driven, and user-friendly web app.
- Integration of third-party APIs and visualization libraries.
- Clean and maintainable React code architecture.

---

## 🌟 Features

✅ **Real-time Earthquake Data:** Fetches live earthquake details from the USGS API.  
✅ **Interactive Map:** Uses **React Leaflet** for displaying earthquake locations.  
✅ **Color-Coded Magnitudes:** Visual differentiation of earthquake intensity.  
✅ **Search Functionality:** Allows users to filter or locate specific regions.  
✅ **Responsive Design:** Works seamlessly on desktop and mobile screens.  
✅ **Minimalist UI:** Clean, modern design inspired by Microsoft & Google aesthetics.  
✅ **Error Handling:** Displays alerts when data isn’t available or there’s a network issue.

---

## ⚙️ Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| **Frontend Framework** | React.js (Vite) |
| **Mapping Library** | React Leaflet + Leaflet |
| **Styling** | CSS (custom responsive styles) |
| **API Used** | [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) |
| **Deployment** | Vercel |
| **State Management** | React useState & useEffect hooks |

---

## 🧠 AI Collaboration (Level 1 - 50%)

This project was developed with assistance from **ChatGPT (OpenAI)** to:
- Interpret the problem statement.
- Suggest architecture and component structure.
- Provide debugging and optimization insights.
- Improve design, responsiveness, and user experience.

**ChatGPT Collaboration Link:** (This conversation history link should be shared with the recruiter to show your approach.)

---

## 🚀 Setup Instructions (For Local Development)

Follow these steps to run the project locally:

```bash
# 1. Clone this repository
git clone https://github.com/Harshroo45/Earthquake-Visualizer-web-app.git

# 2. Navigate into the project directory
cd Earthquake-Visualizer-web-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

**Folder Structure: **
earthquake-visualizer/
│
├── public/
├── src/
│   ├── components/
│   │   ├── EarthquakeMap.jsx
│   │   ├── Legend.jsx
│   │   ├── SearchBar.jsx
│   │   ├── responsive.css
│   │   └── ...
│   ├── utils/
│   │   └── viewport.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md

**Developed with ❤️ by Harshal Khadatare**

