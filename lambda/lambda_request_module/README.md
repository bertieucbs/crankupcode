# Importing the python ***requests*** module directly into your code

***Step 1:*** On your selected development environment or you can use AWS Cloud 9
 
```bash
mkdir python
cd python
```

***Step 2:***  Now install the request module

```bash
pip install requests -t ./
```

***Step 3:***  cd out of the above python folder and run below command to zip the content

```bash
cd ..
zip -r request_layer.zip python/
```
 
Note : Your zip file should have a folder named python with all content inside. So download the zip, deflate it and check it once.
 
***Step 4:*** After that just add this zip as your lambda layer to your function and use 'import requests'.

Reference : https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html

Sample code for lambda

```bash
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
 ```

