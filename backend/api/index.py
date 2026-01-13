import zipfile
import os
import io
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from converter import process_image # Ensure this is in the /api folder

app = Flask(__name__)

# Security: Vercel serverless works best with open CORS for the API
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "online",
        "platform": "Vercel Serverless",
        "service": "PixelShift PRO Engine"
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

@app.route('/api/convert', methods=['POST'])
def convert_route():
    try:
        # Vercel has a 4.5MB request limit
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
                processed_img = process_image(file.stream, target_format, should_compress)
                original_name = file.filename.rsplit('.', 1)[0]
                filename = f"{original_name}.{target_format.lower()}"
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

# DO NOT include app.run() here for Vercel