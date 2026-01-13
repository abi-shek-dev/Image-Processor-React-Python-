from PIL import Image
import io

def process_image(file_stream, target_format):
    img = Image.open(file_stream)
    target_format = target_format.upper()
    
    # Handle Transparency (Alpha Channel)
    # If target is JPEG but source has transparency, paste onto a white background
    if target_format in ["JPEG", "JPG"]:
        if img.mode in ("RGBA", "P"):
            background = Image.new("RGB", img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
            img = background
        else:
            img = img.convert("RGB")
            
    # For all other formats, convert to RGB/RGBA automatically
    elif img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")

    img_io = io.BytesIO()
    img.save(img_io, format=target_format, quality=95)
    img_io.seek(0)
    return img_io