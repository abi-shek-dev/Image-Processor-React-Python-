from PIL import Image
import io

def process_image(file_stream, target_format, should_compress=False):
    """
    Processes the image: handles transparency, converts format, and applies compression.
    Ensures memory is freed for Serverless environments.
    """
    # Use 'with' to ensure the image object is closed
    with Image.open(file_stream) as img:
        target_format = target_format.upper()
        
        # Handle Transparency (Alpha Channel)
        if target_format in ["JPEG", "JPG"]:
            if img.mode in ("RGBA", "P"):
                background = Image.new("RGB", img.size, (255, 255, 255))
                mask = img.split()[3] if img.mode == "RGBA" else None
                background.paste(img, mask=mask)
                img = background
            else:
                img = img.convert("RGB")
        elif img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGB")

        img_io = io.BytesIO()
        save_kwargs = {"format": target_format}
        
        if should_compress:
            if target_format in ["JPEG", "JPG", "WEBP"]:
                save_kwargs["quality"] = 85  
                save_kwargs["optimize"] = True
            elif target_format == "PNG":
                save_kwargs["optimize"] = True
                save_kwargs["compress_level"] = 9 
        else:
            if target_format in ["JPEG", "JPG", "WEBP"]:
                save_kwargs["quality"] = 95
            save_kwargs["optimize"] = False

        # Save to buffer
        img.save(img_io, **save_kwargs)
        img_io.seek(0)
        
        return img_io