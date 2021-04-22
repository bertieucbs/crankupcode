import json
import gzip
import base64
def processRecords(records):
    for r in records:
        record_data = r['data']
        print(type(record_data))
        print(record_data)
        data_decoded = base64.b64decode(record_data)
        print(data_decoded)
        data_decompress = gzip.decompress(data_decoded)
        y = json.loads(data_decompress)
        messageType = y["messageType"]
        recId = r['recordId']
        data = base64.b64encode(data_decompress)
        #Filter out CONTROL_MESSAGE
        if messageType == 'DATA_MESSAGE':
            yield {
                'data': data,
                'result': 'Ok',
                'recordId':recId
                }
        else:
            yield {
                'data': data,
                'result': 'ProcessingFailed',
                'recordId':recId
                }
def lambda_handler(event, context):
    records = list(processRecords(event['records']))
    return {"records": records}