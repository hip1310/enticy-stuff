data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda/changeStatus.js"
  output_path = "${path.module}/lambda/changeStatus.zip"
}