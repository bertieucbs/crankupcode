import json
#from botocore.vendored import requests
import requests
import os
import urllib3


def lambda_handler(event, context):
    url = 'https://www.w3schools.com/python/demopage.js'
    r = requests.get(url)
    print(r)
    data = r.json()
    print(data)