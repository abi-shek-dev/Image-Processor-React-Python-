from flask import Flask, request, send_file
from flask_cors import CORS
from converter import process_image

app = Flask(__name__)
CORS(app)

@app.route('/convert', methods=['POST'])
def convert():
    file = request.files.get('image')
    fmt = request.form.get('format', 'PNG')
    
    if not file:
        return {"error": "No file uploaded"}, 400
        
    try:
        result_io = process_image(file.stream, fmt)
        return send_file(result_io, mimetype=f'image/{fmt.lower()}')
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)