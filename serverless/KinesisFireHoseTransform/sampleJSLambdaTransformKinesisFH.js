

/*Run time for the Node.js script is  *Node.js 14.x*/

/*
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
*/

'use strict';

const zlib = require('zlib');

/**
 * logEvent has this format:
 *
 * {
 *   "id": "01234567890123456789012345678901234567890123456789012345",
 *   "timestamp": 1510109208016,
 *   "message": "log message 1"
 * }
 *
 * The default implementation below just extracts and replays the same data.
 *
 * The result must be returned in a Promise.
 */
function transformLogEvent(logEvent) {
    //console.log('test')
    //console.log(`${logEvent.message}\n`)
    return Promise.resolve(`${logEvent.message}\n`);
}

exports.handler = (event, context, callback) => {
    console.log('i am here in the handler')
    console.log(event)
    Promise.all(event.records.map(r => {
        const buffer = new Buffer(r.data, 'base64');
        
        const decompressed = zlib.gunzipSync(buffer);
        console.log(('i am here in the lambda2'))
        console.log('decompressed -->' + decompressed)
        const data = JSON.parse(decompressed);
        //console.log(data);
        if (data.messageType !== 'DATA_MESSAGE') {
            return Promise.resolve({
                recordId: r.recordId,
                result: 'ProcessingFailed',
            });
        } else {
            //console.log("data-->" + data.logEvents);
            //const promises = data.logEvents.map(transformLogEvent);
            //console.log('promises--' + promises)
                const encoded = new Buffer(decompressed).toString('base64');
                console.log('encoded-->' + encoded);
                return {
                    recordId: r.recordId,
                    result: 'Ok',
                    data: encoded,
                };
            
        }
    })).then(recs => callback(null, { records: recs }));
};