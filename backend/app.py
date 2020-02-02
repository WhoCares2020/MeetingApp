from flask import Flask, request

from backend.audio_stream_test import start_stream_transcription

app = Flask(__name__)


@app.route('/startrecord', methods=['POST'])
def startrecord():
    print("START")
    start_stream_transcription()


@app.route('/stoprecord', methods=['POST'])
def stoprecord():
    print("STOP")
