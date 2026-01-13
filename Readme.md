# 🚀 PixelShift PRO

**PixelShift PRO** is a premium, high-performance web application
designed for batch image conversion and optimization. Built with a
modern React frontend and a robust Flask backend, it provides a seamless
**drag-and-drop** experience for users who need to transform images into
various formats with professional-grade compression.

------------------------------------------------------------------------

## ✨ Features

-   **Batch Processing** -- Convert multiple images at once and receive
    them in a single `.zip` archive.
-   **Intelligent Conversion** -- Automatically flattens transparency
    for JPEG formats and handles mode conversions (RGBA → RGB).
-   **Pro Optimization** -- Toggleable lossless/lossy compression using
    industry-standard quality levels (e.g., Quality 85 for WEBP/JPEG).
-   **Global Drag-and-Drop** -- A full-screen drop zone that activates
    anywhere on the page.
-   **Real-Time Progress** -- Dual-stage tracking showing upload
    percentage and server-side processing status.
-   **Safety First** -- Individual file removal, 10MB file size
    validation, and a **Clear All** confirmation modal.

------------------------------------------------------------------------

## 🛠️ Technology Stack

### Frontend

-   **React.js (Vite)** -- Component-based UI and state management\
-   **Tailwind CSS** -- Utility-first styling for the emerald-white
    theme\
-   **Axios** -- Multipart form data handling and upload progress
    tracking

### Backend

-   **Flask (Python)** -- Lightweight REST API\
-   **Pillow (PIL)** -- Core image processing, conversion, and
    compression engine

------------------------------------------------------------------------

## ⚙️ Setup & Installation

### 1️⃣ Backend Setup

``` bash
cd backend
pip install flask flask-cors pillow
python app.py
```

Server runs at: **http://localhost:5000**

------------------------------------------------------------------------

### 2️⃣ Frontend Setup

``` bash
cd frontend
npm install axios react-icons lucide-react
npm run dev
```

------------------------------------------------------------------------

## 📂 Project Structure

    ├── backend/
    │   ├── app.py            # Flask API routes & batch logic
    │   └── converter.py      # Core Pillow-based image processing
    ├── src/
    │   ├── components/       # Reusable UI components (Toast, Loader, etc.)
    │   ├── App.jsx           # Main application logic and state
    │   ├── index.css         # Global styles and Emerald theme variables
    │   └── main.jsx          # React entry point
    └── README.md

------------------------------------------------------------------------

## 🛡️ API Endpoints

### POST `/convert`

Processes one or more images.

**Payload (multipart/form-data):** - `images` -- List of image files\
- `format` -- Target format (PNG, JPEG, WEBP, etc.)\
- `compress` -- `'true'` or `'false'`

**Response:** - Returns a processed image (single) - Returns a `.zip`
archive (batch)

------------------------------------------------------------------------

## ⚖️ License

This project is part of the **Xe54z | Image Converter | PixelShift Suite**.

------------------------------------------------------------------------

### 👨‍💻 Made with ❤️ by **Xe54z**
