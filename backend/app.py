import zipfile
import os
import io
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from converter import process_image

app = Flask(__name__)

# Security: Set this to your Vercel URL in Render's Environment Variables
# For now, '*' allows all origins to ensure your first deployment works
FRONTEND_URL = os.environ.get('FRONTEND_URL', '*')
CORS(app, resources={r"/*": {"origins": [FRONTEND_URL]}})

# FIX: Root Route to prevent 404 errors during Render's health checks
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "online",
        "service": "PixelShift PRO Image Engine",
        "message": "Backend is active and ready for conversion."
    }), 200

# FIX: Health Check route for your React Navbar status indicator
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route('/convert', methods=['POST'])
def convert_route():
    try:
        # Get list of files from the 'images' field
        files = request.files.getlist('images')
        target_format = request.form.get('format', 'PNG').upper()
        should_compress = request.form.get('compress') == 'true'

        if not files:
            return jsonify({"error": "No images uploaded"}), 400

        # Case 1: Single Image
        if len(files) == 1:
            processed_buffer = process_image(files[0].stream, target_format, should_compress)
            return send_file(
                processed_buffer,
                mimetype=f'image/{target_format.lower()}',
                as_attachment=True,
                download_name=f"converted.{target_format.lower()}"
            )

        # Case 2: Multiple Images (ZIP)
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for file in files:
                # Process individual image
                processed_img = process_image(file.stream, target_format, should_compress)
                
                # Create dynamic filename
                original_name = file.filename.rsplit('.', 1)[0]
                filename = f"{original_name}.{target_format.lower()}"
                
                # Add to memory buffer
                zip_file.writestr(filename, processed_img.getvalue())

        zip_buffer.seek(0)
        return send_file(
            zip_buffer,
            mimetype='application/zip',
            as_attachment=True,
            download_name="converted_images.zip"
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Render's dynamic port assignment
    port = int(os.environ.get('PORT', 5000))
    # Binding to 0.0.0.0 is critical for cloud access
    app.run(host='0.0.0.0', port=port)