#! /usr/bin/env python

from flask import Flask, request
from flask_socketio import SocketIO, send, emit

from audio_stream_test import start_stream_transcription

app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/startrecord', methods=['POST'])
def startrecord():
    start_stream_transcription()


@app.route('/stoprecord', methods=['POST'])
def stoprecord():
    print("STOP")


if __name__ == '__main__':
    socketio.run(app)
