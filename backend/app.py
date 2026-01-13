import zipfile
import os
import io
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from converter import process_image

app = Flask(__name__)

# FIX 1: Allow ALL origins temporarily to test if it's a CORS issue
# Once it works, you can change this back to your specific Vercel URL
CORS(app, resources={r"/*": {"origins": "*"}})

# FIX 2: Add Health Route for status checks and waking up
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "message": "PixelShift Engine is Awake"}), 200

@app.route('/convert', methods=['POST'])
def convert_route():
    try:
        files = request.files.getlist('images')
        target_format = request.form.get('format', 'PNG').upper()
        should_compress = request.form.get('compress') == 'true'

        if not files:
            return jsonify({"error": "No images uploaded"}), 400

        if len(files) == 1:
            processed_buffer = process_image(files[0].stream, target_format, should_compress)
            return send_file(
                processed_buffer,
                mimetype=f'image/{target_format.lower()}',
                as_attachment=True,
                download_name=f"converted.{target_format.lower()}"
            )

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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)