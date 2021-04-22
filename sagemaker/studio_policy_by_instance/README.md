# Sagemaker studio sample policy

This is a sample less restrictive policy (not for prod) for sagemaker studio execution role which restrict instance type selection for create app and training job. For production, please make it less open per your requirements.

#### sagemaker:CreateApp restrict by Instance Types

```bash

        {
            "Sid": "AmazonSageMakerStudioCreateApp",
            "Effect": "Allow",
            "Action": [
                "sagemaker:CreateApp"
            ],
            "Resource": "*",
            "Condition": {
                "ForAllValues:StringLike": {
                    "sagemaker:InstanceTypes": [
                        "ml.t3.medium"
                    ]
                }
            }
        }

```

#### sagemaker:CreateTrainingJob restrict by Instance Types

```bash

        {
            "Sid": "AmazonSageMakerStudioCreateTrainingJob",
            "Effect": "Allow",
            "Action": [
                "sagemaker:CreateTrainingJob"
            ],
            "Resource": "*",
            "Condition": {
                "ForAllValues:StringLike": {
                    "sagemaker:InstanceTypes": [
                        "ml.m5.4xlarge"
                    ]
                }
            }
        }

```