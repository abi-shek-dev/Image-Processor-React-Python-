from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from converter import process_image
import os

app = Flask(__name__)

# Enable CORS so your React app (usually on port 5173 or 3000) can make requests
CORS(app)

@app.route('/convert', methods=['POST'])
def convert_route():
    """
    Main endpoint for image conversion and compression.
    Expects:
        - 'image': The file object
        - 'format': Target format string (e.g., 'PNG', 'JPEG')
        - 'compress': String 'true' or 'false'
    """
    try:
        # 1. Validation
        if 'image' not in request.files:
            return jsonify({"error": "No image part in the request"}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # 2. Get Form Data
        target_format = request.form.get('format', 'PNG').upper()
        # Frontend sends boolean as string 'true'/'false' in FormData
        should_compress = request.form.get('compress') == 'true'

        # 3. Processing (Modular Logic from converter.py)
        # We pass the file stream directly to keep it in memory (no disk writes)
        processed_buffer = process_image(file.stream, target_format, should_compress)

        # 4. Return the file
        # The filename here is a default; the React frontend will rename it to the original
        return send_file(
            processed_buffer,
            mimetype=f'image/{target_format.lower()}',
            as_attachment=True,
            download_name=f"converted_image.{target_format.lower()}"
        )

    except Exception as e:
        print(f"Error during conversion: {str(e)}")
        return jsonify({"error": "Internal server error during processing"}), 500

if __name__ == '__main__':
    # Running on port 5000 by default
    app.run(host='0.0.0.0', port=5000, debug=True)