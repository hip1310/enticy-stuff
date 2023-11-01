resource "aws_sns_topic" "order_updates" {
  name = "order_updates"
}

# alaska warehouse sqs queue start
resource "aws_sqs_queue" "order_updates_queue_alaska_warehouse" {
    name = "order-updates-queue-alaska-warehouse"
    redrive_policy  = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.order_updates_dl_queue_alaska_warehouse.arn}\",\"maxReceiveCount\":5}"
    visibility_timeout_seconds = 300

    tags = {
        Environment = "dev"
    }
}
resource "aws_sqs_queue" "order_updates_dl_queue_alaska_warehouse" {
    name = "order-updates-dl-queue-alaska-warehouse"
}
resource "aws_sns_topic_subscription" "order_updates_sqs_target_alaska_warehouse" {
    topic_arn = "${aws_sns_topic.order_updates.arn}"
    protocol  = "sqs"
    endpoint  = "${aws_sqs_queue.order_updates_queue_alaska_warehouse.arn}"
    filter_policy = <<FILTER_POLICY
{
  "warehouseCode":["alaska_warehouse"]
}
FILTER_POLICY
filter_policy_scope = "MessageBody"
}
resource "aws_sqs_queue_policy" "order_updates_queue_policy_alaska_warehouse" {
    queue_url = "${aws_sqs_queue.order_updates_queue_alaska_warehouse.id}"

    policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "${aws_sqs_queue.order_updates_queue_alaska_warehouse.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_sns_topic.order_updates.arn}"
        }
      }
    }
  ]
}
POLICY
}
# alaska warehouse sqs queue end

# california warehouse sqs queue start
resource "aws_sqs_queue" "order_updates_queue_california_warehouse" {
    name = "order-updates-queue-california-warehouse"
    redrive_policy  = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.order_updates_dl_queue_california_warehouse.arn}\",\"maxReceiveCount\":5}"
    visibility_timeout_seconds = 300

    tags = {
        Environment = "dev"
    }
}
resource "aws_sqs_queue" "order_updates_dl_queue_california_warehouse" {
    name = "order-updates-dl-queue-california-warehouse"
}

resource "aws_sns_topic_subscription" "order_updates_sqs_target_california_warehouse" {
    topic_arn = "${aws_sns_topic.order_updates.arn}"
    protocol  = "sqs"
    endpoint  = "${aws_sqs_queue.order_updates_queue_california_warehouse.arn}"
    filter_policy = <<FILTER_POLICY
{
  "warehouseCode":["california_warehouse"]
}
FILTER_POLICY
filter_policy_scope = "MessageBody"
}
resource "aws_sqs_queue_policy" "order_updates_queue_policy_california_warehouse" {
    queue_url = "${aws_sqs_queue.order_updates_queue_california_warehouse.id}"

    policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "sqspolicy",
  "Statement": [
    {
      "Sid": "First",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "sqs:SendMessage",
      "Resource": "${aws_sqs_queue.order_updates_queue_california_warehouse.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_sns_topic.order_updates.arn}"
        }
      }
    }
  ]
}
POLICY
}
# alaska warehouse sqs queue end

# lambda function call
resource "aws_lambda_function" "results_updates_lambda" {
    filename         = "${path.module}/changeStatus.zip"
    function_name    = "changeStatus"
    role             = "${aws_iam_role.lambda_role.arn}"
    handler          = "out/lambda/index.handler"
    source_code_hash = "filebase64sha256(${path.module}/changeStatus.zip)"
    runtime          = "nodejs18.x"
}

resource "aws_iam_role" "lambda_role" {
    name = "LambdaRole"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Principal": {
            "Service": "lambda.amazonaws.com"
        }
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_role_sqs_policy" {
    name = "AllowSQSPermissions"
    role = "${aws_iam_role.lambda_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "sqs:ChangeMessageVisibility",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
        "sqs:ReceiveMessage",
        "sqs:SendMessage"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_role_logs_policy" {
    name = "LambdaRolePolicy"
    role = "${aws_iam_role.lambda_role.id}"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

# Event source from SQS



# alaska warehouse mapping with lamda start
resource "aws_lambda_event_source_mapping" "event_source_mapping_alaska_warehouse" {
  event_source_arn = "${aws_sqs_queue.order_updates_queue_alaska_warehouse.arn}"
  enabled          = true
  function_name    = "${aws_lambda_function.results_updates_lambda.arn}"
  batch_size       = 1
}
# alaska warehouse mapping with lamda end

# california warehouse mapping with lamda start
resource "aws_lambda_event_source_mapping" "event_source_mapping_california_warehouse" {
  event_source_arn = "${aws_sqs_queue.order_updates_queue_california_warehouse.arn}"
  enabled          = true
  function_name    = "${aws_lambda_function.results_updates_lambda.arn}"
  batch_size       = 1
}
# california warehouse mapping with lamda end


resource "aws_ses_email_identity" "ses_email" {
  email = "enticy-stuff@yopmail.com"  # Replace with your email address
}

resource "aws_ses_configuration_set" "example_configuration_set" {
  name = "ses-configuration-set"
}


# lambda function call promote Orders
data "archive_file" "promote_order" {
  type        = "zip"
  source_file = "${path.module}/src/lambda/promoteOrder.ts"
  output_path = "${path.module}/src/lambda/promoteOrder.zip"
}

resource "aws_lambda_function" "promote_orders" {
    filename         = "${path.module}/promoteOrder.zip"
    function_name    = "promoteOrder"
    role             = "${aws_iam_role.lambda_role.arn}"
    handler          = "out/lambda/promoteOrder.handler"
    runtime          = "nodejs18.x"
}

# CloudWatch Events rule to trigger the promoteOrder Lambda function on a schedule
resource "aws_cloudwatch_event_rule" "promote_orders" {
  name        = "CloudWatchRuleToPromoteOrder"
  description = "CloudWatch Events Rule to promote order every day"
  schedule_expression = "cron(0 12 * * ? *)"  # Run every day at 12:00 PM UTC
}

# CloudWatch Events rule target (Lambda function)
resource "aws_cloudwatch_event_target" "promote_orders" {
  rule      = aws_cloudwatch_event_rule.promote_orders.name
  target_id = "promoteOrder"
  arn       = aws_lambda_function.promote_orders.arn
}