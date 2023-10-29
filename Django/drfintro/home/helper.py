from datetime import datetime, timedelta

import random
from django.core.cache import cache


def mail_otp(otp):
    print("\n\nMAIL OTP:", otp, "\n\n")


def sms_otp(otp):
    print("\n\nSMS OTP:", otp, "\n\n")


def send_login_otp(phone_number):
    otp = str(random.randint(100000, 999999))
    otp_cache_key = f'OTP_{phone_number}'

    otp_expire_in = cache.ttl(otp_cache_key)

    if otp_expire_in > 0:
        return f'An OTP has already been sent to your phone number {phone_number}. Can\'t resend OTP before {otp_expire_in} second.'

    cache.set(otp_cache_key, otp, timeout=100)
    cache.expire(otp_cache_key, timedelta(minutes=2))

    mail_otp(otp)
    sms_otp(otp)

    return f'An OTP has been sent to your phone number {phone_number}'
