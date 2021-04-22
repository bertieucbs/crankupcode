"""
For processing data sent to Firehose by Cloudwatch Logs subscription filters.
Cloudwatch Logs sends to Firehose records that look like this:
{
  "messageType": "DATA_MESSAGE",
  "owner": "123456789012",
  "logGroup": "log_group_name",
  "logStream": "log_stream_name",
  "subscriptionFilters": [
    "subscription_filter_name"
  ],
  "logEvents": [
    {
      "id": "01234567890123456789012345678901234567890123456789012345",
      "timestamp": 1510109208016,
      "message": "log message 1"
    },
    {
      "id": "01234567890123456789012345678901234567890123456789012345",
      "timestamp": 1510109208017,
      "message": "log message 2"
    }
    ...
  ]
}
The data is additionally compressed with GZIP.
"""

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