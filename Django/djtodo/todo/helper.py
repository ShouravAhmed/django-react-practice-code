from datetime import datetime, timedelta

import random
from django.core.cache import cache

from rest_framework import status


def is_correct_phone_number(phone_no):
    if len(phone_no) < 11 or len(phone_no) == 12 or len(phone_no) > 14:
        return False

    if len(phone_no) == 13 and not phone_no.startswith("88"):
        return False

    if len(phone_no) == 14 and not phone_no.startswith("+88"):
        return False

    if len(phone_no) > 11:
        phone_no = phone_no[-11:]

    valid_prefixes = ["013", "014", "015", "016", "017", "018", "019"]
    if phone_no[:3] not in valid_prefixes:
        return False

    return all((char.isdigit() for char in phone_no[3:]))


def mail_otp(otp):
    print("\n\nMAIL OTP:", otp, "\n\n")


def sms_otp(otp):
    print("\n\nSMS OTP:", otp, "\n\n")


def send_login_otp(phone_number):
    if not is_correct_phone_number(phone_number):
        return {'message': 'Please Enter A Correct Phone Number.', 'status': 'error'}

    otp = str(random.randint(100000, 999999))
    otp_cache_key = f'OTP_{phone_number}'

    otp_expire_in = cache.ttl(otp_cache_key)

    if otp_expire_in > 0:
        return {'message': f'An OTP has already been sent to your phone number {phone_number}.\nCan\'t resend OTP before {otp_expire_in} seconds.', 'status': 'OK'}

    cache.set(otp_cache_key, otp, timeout=100)
    cache.expire(otp_cache_key, timedelta(minutes=2))

    mail_otp(otp)
    sms_otp(otp)

    return {'message': f'An OTP has been sent to your phone number {phone_number}', 'status': 'OK'}
