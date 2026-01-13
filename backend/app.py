import zipfile
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from converter import process_image
import io

app = Flask(__name__)
CORS(app)

@app.route('/convert', methods=['POST'])
def convert_route():
    try:
        # Get list of files from the 'images' field
        files = request.files.getlist('images')
        target_format = request.form.get('format', 'PNG').upper()
        should_compress = request.form.get('compress') == 'true'

        if not files:
            return jsonify({"error": "No images uploaded"}), 400

        # Case 1: Single Image (Return the image directly)
        if len(files) == 1:
            processed_buffer = process_image(files[0].stream, target_format, should_compress)
            return send_file(
                processed_buffer,
                mimetype=f'image/{target_format.lower()}',
                as_attachment=True,
                download_name=f"converted.{target_format.lower()}"
            )

        # Case 2: Multiple Images (Return a ZIP)
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for file in files:
                # Process each image
                processed_img = process_image(file.stream, target_format, should_compress)
                
                # Create a filename based on original
                original_name = file.filename.rsplit('.', 1)[0]
                filename = f"{original_name}.{target_format.lower()}"
                
                # Add to zip
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
    app.run(port=5000, debug=True)