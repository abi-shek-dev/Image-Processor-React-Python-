from PIL import Image
import io

def process_image(file_stream, target_format, should_compress=False):
    """
    Processes the image: handles transparency, converts format, and applies compression.
    """
    # Load the image from the stream
    img = Image.open(file_stream)
    target_format = target_format.upper()
    
    # Handle Transparency (Alpha Channel)
    # JPEG does not support transparency. If converting from PNG/WEBP to JPEG:
    if target_format in ["JPEG", "JPG"]:
        if img.mode in ("RGBA", "P"):
            # Create a white background and paste the image over it
            background = Image.new("RGB", img.size, (255, 255, 255))
            # Use the alpha channel as a mask if it exists
            mask = img.split()[3] if img.mode == "RGBA" else None
            background.paste(img, mask=mask)
            img = background
        else:
            img = img.convert("RGB")
            
    # For other formats, ensure we are in a standard mode (RGB or RGBA)
    elif img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")

    # Create an in-memory buffer
    img_io = io.BytesIO()
    
    # Configure Save Arguments
    save_kwargs = {"format": target_format}
    
    if should_compress:
        if target_format in ["JPEG", "JPG", "WEBP"]:
            # 85 is the industry standard for "High Quality but Small Size"
            save_kwargs["quality"] = 85  
            save_kwargs["optimize"] = True
        elif target_format == "PNG":
            # PNG is lossless by nature; optimize removes metadata and uses better filters
            save_kwargs["optimize"] = True
            save_kwargs["compress_level"] = 9 # Range is 0-9
    else:
        # Standard high-quality save
        if target_format in ["JPEG", "JPG", "WEBP"]:
            save_kwargs["quality"] = 95
        save_kwargs["optimize"] = False

    # Save to the buffer
    img.save(img_io, **save_kwargs)
    img_io.seek(0)
    
    return img_io