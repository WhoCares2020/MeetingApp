import os

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account as sa

from dotenv import load_dotenv

load_dotenv(verbose=True)
cred = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]


def get_emotion(sentence):
    credentials = sa.Credentials.from_service_account_file(cred)

    client = language.LanguageServiceClient(credentials=credentials)

    document = types.Document(
        content=sentence,
        type=enums.Document.Type.PLAIN_TEXT)

    sentiment = client.analyze_sentiment(document=document).document_sentiment
    return sentiment.score, sentiment.magnitude
