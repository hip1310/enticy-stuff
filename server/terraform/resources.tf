resource "aws_sns_topic" "order_updates" {
  name = "order_updates"
}

# naranpura warehouse sqs queue start
resource "aws_sqs_queue" "order_updates_queue_naranpura_warehouse" {
    name = "order-updates-queue-naranpura-warehouse"
    redrive_policy  = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.order_updates_dl_queue_naranpura_warehouse.arn}\",\"maxReceiveCount\":5}"
    visibility_timeout_seconds = 300

    tags = {
        Environment = "dev"
    }
}
resource "aws_sqs_queue" "order_updates_dl_queue_naranpura_warehouse" {
    name = "order-updates-dl-queue-naranpura-warehouse"
}
resource "aws_sns_topic_subscription" "order_updates_sqs_target_naranpura_warehouse" {
    topic_arn = "${aws_sns_topic.order_updates.arn}"
    protocol  = "sqs"
    endpoint  = "${aws_sqs_queue.order_updates_queue_naranpura_warehouse.arn}"
    filter_policy = <<FILTER_POLICY
{
  "wareHouseCode":["naranpura_warehouse"]
}
FILTER_POLICY
}
resource "aws_sqs_queue_policy" "order_updates_queue_policy_naranpura_warehouse" {
    queue_url = "${aws_sqs_queue.order_updates_queue_naranpura_warehouse.id}"

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
      "Resource": "${aws_sqs_queue.order_updates_queue_naranpura_warehouse.arn}",
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
# naranpura warehouse sqs queue end

# bopal warehouse sqs queue start
resource "aws_sqs_queue" "order_updates_queue_bopal_warehouse" {
    name = "order-updates-queue-bopal-warehouse"
    redrive_policy  = "{\"deadLetterTargetArn\":\"${aws_sqs_queue.order_updates_dl_queue_bopal_warehouse.arn}\",\"maxReceiveCount\":5}"
    visibility_timeout_seconds = 300

    tags = {
        Environment = "dev"
    }
}
resource "aws_sqs_queue" "order_updates_dl_queue_bopal_warehouse" {
    name = "order-updates-dl-queue-bopal-warehouse"
}

resource "aws_sns_topic_subscription" "order_updates_sqs_target_bopal_warehouse" {
    topic_arn = "${aws_sns_topic.order_updates.arn}"
    protocol  = "sqs"
    endpoint  = "${aws_sqs_queue.order_updates_queue_bopal_warehouse.arn}"
    filter_policy = <<FILTER_POLICY
{
  "wareHouseCode":["bopal_warehouse"]
}
FILTER_POLICY
}
resource "aws_sqs_queue_policy" "order_updates_queue_policy_bopal_warehouse" {
    queue_url = "${aws_sqs_queue.order_updates_queue_bopal_warehouse.id}"

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
      "Resource": "${aws_sqs_queue.order_updates_queue_bopal_warehouse.arn}",
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
# naranpura warehouse sqs queue end

# lambda function call
resource "aws_lambda_function" "results_updates_lambda" {
    filename         = "${path.module}/lambda/changeStatus.zip"
    function_name    = "changeStatus"
    role             = "${aws_iam_role.lambda_role.arn}"
    handler          = "changeStatus.handler"
    source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
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



# naranpura warehouse mapping with lamda start
resource "aws_lambda_event_source_mapping" "event_source_mapping_naranpura_warehouse" {
  event_source_arn = "${aws_sqs_queue.order_updates_queue_naranpura_warehouse.arn}"
  enabled          = true
  function_name    = "${aws_lambda_function.results_updates_lambda.arn}"
  batch_size       = 1
}
# naranpura warehouse mapping with lamda end

# bopal warehouse mapping with lamda start
resource "aws_lambda_event_source_mapping" "event_source_mapping_bopal_warehouse" {
  event_source_arn = "${aws_sqs_queue.order_updates_queue_bopal_warehouse.arn}"
  enabled          = true
  function_name    = "${aws_lambda_function.results_updates_lambda.arn}"
  batch_size       = 1
}
# bopal warehouse mapping with lamda end


# resource "aws_lambda_function_event_invoke_config" "changeStatus" {
#   function_name          = aws_lambda_function.results_updates_lambda.function_name
#   destination_config {

#     on_success {
#       destination = "${aws_sqs_queue.order_updates_queue_naranpura_warehouse.arn}"
#     }
#   }
# }