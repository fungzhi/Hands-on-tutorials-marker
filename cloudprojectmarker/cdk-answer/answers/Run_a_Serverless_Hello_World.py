#Hand on lab
# https://aws.amazon.com/getting-started/hands-on/run-serverless-code/

from aws_cdk import (aws_lambda as _lambda,
                    core,)

class LambdaFunction(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        my_lambda = _lambda.Function(
            self, 'hello-world-python',
            runtime=_lambda.Runtime.PYTHON_3_7,
            code=_lambda.Code.asset('lambda'),
            handler='hello.handler',
        )