# pip install aws_cdk.aws_cloudwatch
# pip install aws_cdk.aws_logs
# pip install aws_cdk.aws_cloudwatch.Alarm
from aws_cdk import(
  aws_cloudwatch as cloudwatch,
  aws_logs as logs,
  core
  )

class CloudWatch(core.Stack):
  def __init__(self, app: core.App, id: str, **kwargs) -> None:
      super().__init__(app, id)

#should have batchprocesslog log group with 1 Metric Filter. 
# Create Cloudwatch log group
  def log_group = LogGroup(self, "batchprocesslog",
      retention = Infinity,
      ) 

  
 # Should have 1 Metric Filter for error terms.
  def MetricFilter(self, "MetricFilter",
      log_group = "batchprocesslog",
      metric_namespace = "cloudproject",
      metric_name = "error-message-count",
      filter_pattern = FilterPattern.exists("?'error' ?'ERROR' ?'Error'", "check error."),
      metric_value="1"
      )   

# 1 alarm for error terms.
  def alarm(self, "Alarm",
      AlarmName = "alarms-batchProcessErrors"
      ComparisonOperator = "GreaterThanThreshold",
      EvaluationPeriods = 1,
      MetricName = "error-message-count",
      Period = 60,
      Statistic = "SampleCount",
      Threshold = 0,
      ActionsEnabled = true,
      TreatMissingData = "missing",
      OKActions = [],
      InsufficientDataActions = [],    
      Dimensions = [],
      Metrics = [],
      )
