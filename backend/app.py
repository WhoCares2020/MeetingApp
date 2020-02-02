from flask import Flask, request

app = Flask(__name__)

@app.route('/startrecord', methods=['POST'])
def startrecord():
    print("START")

@app.route('/stoprecord', methods=['POST'])
def stoprecord():
    print("STOP")
