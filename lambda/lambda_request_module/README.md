# Helper code

Step 1:
 
mkdir python
cd python

Step 2:

pip install requests -t ./

Step 3:

cd out of the above python folder and run below command to zip
 
zip -r request_layer.zip python/
 
Note : Your zip file should have a folder named python with all content inside. So download the zip, deflate it and check it once.
 
After that just add this zip as your lambda layer and remove 'from botocore.vendored import requests' with 'import requests'. Done !!