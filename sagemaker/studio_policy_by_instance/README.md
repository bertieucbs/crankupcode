# Sagemaker studio sample policy

This is a sample less restrictive policy (not for prod) for sagemaker studio execution role which restrict instance type selection for create app and training job. For production, please make it less open per your requirements.


* When a user opens a SageMaker notebook (classic or Studio), they assume the SageMaker Execution Role associated with the classic notebook instance or their SMStudio user profile - so actions like **CreateTrainingJob** usually taken from a notebook need to be controlled on that role.Not on the person's IAM/console user

* For SageMaker Studio notebooks in particular, it's the **sagemaker:CreateApp** permission you need to restrict on the execution role - not **sagemaker:CreateNotebookInstance** (which refers only to the classic notebook instances - not Studio)

#### sagemaker:CreateApp restrict by Instance Types

CreateApp : Creates a running app for the specified UserProfile. Supported apps are JupyterServer and KernelGateway. This operation is automatically invoked by Amazon SageMaker Studio upon access to the associated Domain, and when new kernel configurations are selected by the user. A user may have multiple Apps active simultaneously. 


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

CreateTrainingJob : Starts a model training job. After training completes, Amazon SageMaker saves the resulting model artifacts to an Amazon S3 location that you specify. 

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
