#! /usr/bin/env python

from flask import Flask, request
from flask_cors import CORS
from flask_socketio import (
    SocketIO,
    send,
    emit,
    join_room,
    leave_room,
)

from audio_stream_test import start_stream_transcription

from backend.audio_stream_test import start_stream_transcription

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")



@app.route('/startrecord', methods=['POST'])
def startrecord():
    try:
        def send_transcript(s):
            socketio.emit('transcript', data=s)
        socketio.emit('recording', data=True)

        start_stream_transcription(on_update=send_transcript)
    finally:
        socketio.emit('recording', data=False)

    return '', 200

@app.route('/stoprecord', methods=['POST'])
def stoprecord():
    print("STOP")
    return '', 200

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
