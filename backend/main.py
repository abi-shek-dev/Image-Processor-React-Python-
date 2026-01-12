from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import io

app = FastAPI()

# --- CORS CONFIGURATION ---
# Vite's default port is 5173. We allow it specifically here.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Allowed list of frontends
    allow_credentials=True,
    allow_methods=["*"],               # Allow GET, POST, etc.
    allow_headers=["*"],               # Allow all headers
)

@app.post("/convert")
async def convert_to_webp(file: UploadFile = File(...)):
    # 1. Basic Validation
    if not file.filename.lower().endswith(".png"):
        raise HTTPException(status_code=400, detail="Only PNG files are supported.")

    try:
        # 2. Read file into memory (FastAPI handles large files via temp files automatically)
        content = await file.read()
        img = Image.open(io.BytesIO(content))

        # 3. Handle transparency (PNGs often have 'RGBA' or 'P' modes)
        # WebP supports transparency, but we ensure the mode is compatible.
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        # 4. Prepare the byte stream for the output
        output_buffer = io.BytesIO()
        
        # 'method=6' is the highest compression level (slower but smallest size)
        img.save(output_buffer, format="WEBP", quality=80, method=6)
        output_buffer.seek(0)

        # 5. Stream the result back to the user
        filename_without_ext = file.filename.rsplit(".", 1)[0]
        return StreamingResponse(
            output_buffer, 
            media_type="image/webp",
            headers={
                "Content-Disposition": f"attachment; filename={filename_without_ext}.webp"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)