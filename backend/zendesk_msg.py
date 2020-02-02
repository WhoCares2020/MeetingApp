import jwt
import smooch
from smooch.rest import ApiException

KEY_ID = 'app_5e2cf154fda5e4000fb5d20d'
SECRET = 'pvqyRcu7WABj9Jo9mcr0xEW6Ck2wwBK0hLVmKeeBedvkb7vn5YwHdPP_3IHm_wCSnVpxhCaBqriMhHJq_Iocdw'

token_bytes = jwt.encode(
    {'scope': 'app'}, SECRET, algorithm='HS256', headers={'kid': KEY_ID})
token = token_bytes.decode('utf-8')

smooch.configuration.api_key['Authorization'] = token
smooch.configuration.api_key_prefix['Authorization'] = 'Bearer'
api_instance = smooch.ConversationApi()

COMM_INFO = {
    "messenger": ["5e2c892818768b000f696b4b", "faabcb43ffe3dbf868348792"],
    "whatsapp": ["5e2c892818768b000f696b4b", "15391ed89a11661282ef9b26"],
    "telegram": ["5e2c892818768b000f696b4b", "0f226e3cc9b63c1db2a10a3f"]

}


def smooch_send_message(app_id, app_user_id, message):
    try:
        message_post_body = smooch.MessagePost(
            'appMaker', 'text', text=message)
        api_response = api_instance.post_message(
            app_id, app_user_id, message_post_body)
        # print('API RESPONSE:')
    except ApiException as e:
        print('API ERROR: %s\n' % e)


def send_msg(recieved_msg):
    for user in COMM_INFO:
        smooch_send_message(app_id=COMM_INFO[user][0], app_user_id=COMM_INFO[user][1], message=recieved_msg)
