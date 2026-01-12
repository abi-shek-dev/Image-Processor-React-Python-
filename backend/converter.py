# snippet for backend/converter.py
def process_image(input_bytes):
    img = Image.open(io.BytesIO(input_bytes))
    output = io.BytesIO()
    
    # Check if image has transparency
    if img.mode in ("RGBA", "P"):
        # You can keep transparency in WebP!
        img.save(output, format="WEBP", lossless=True, quality=100)
    else:
        # Standard high-quality conversion
        img.save(output, format="WEBP", quality=85, method=6)
        
    output.seek(0)
    return output