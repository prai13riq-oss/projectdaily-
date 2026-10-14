from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "DailyMe Demo Server is working! ✨"


@app.route("/generate-outfit", methods=["POST"])
def generate_outfit():

    data = request.json

    print("\n==============================")
    print("ได้รับชุดจากเว็บไซต์")
    print(data)
    print("==============================")

    return jsonify({
        "success": True,
        "message": "สร้างชุดสำเร็จแล้ว ✨",
        "outfit": data
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )