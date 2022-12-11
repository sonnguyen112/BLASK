import base64
from PIL import Image
from io import BytesIO
import uuid

def decode_base64(base64_img):
    try:
        im = Image.open(BytesIO(base64.b64decode(base64_img)))
        file_name = f"quiz_{uuid.uuid4()}.png"
        im.save(f"mediafiles/quiz_img/{file_name}")
        quiz_img_url = f"http://localhost:8000/media/quiz_img/{file_name}"
        return quiz_img_url
    except:
        return "http://localhost:8000/media/default.jpg"