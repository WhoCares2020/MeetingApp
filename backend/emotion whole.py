# -*- coding: utf-8 -*-
"""
Created on Sun Feb  2 03:47:57 2020

@author: Vikas
"""


from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account as sa

credentials = sa.Credentials.from_service_account_file(r'C:\Users\Vikas\Documents\My First Project-8c0f142f5684.json')

client = language.LanguageServiceClient(credentials=credentials)

mv = []



txt = u"Hello, my name is artists. from Toronto today we have with us a special guest. Omar from Ottowa very nice to meet you. So, what do you think about World War 3? World War 3 sounds like a very very very very bad idea and we should do our best. two not have World War 3. Thank you. In the case of world were 3 would you support United States of America? or Russia and China I would support. The side that insures the highest probability of my own Survival. So that is United States, obviously because China doesn't care about you. I mean it depends on if China's strategy is to siphon u.s. Talent or you know get people to convert. So I'll I'll see who has a better offer. They are a Communist Party. I mean at least there a party I mean u.s. Is not a party and I like parties. So I guess I'll join them. Corvettes grade vent and that's it for the show."

sent = txt.split('.')

for i in sent:
    
    document = types.Document(
            content=i,
            type=enums.Document.Type.PLAIN_TEXT)
    
    sentiment = client.analyze_sentiment(document=document).document_sentiment
    mv.append(sentiment.score)

