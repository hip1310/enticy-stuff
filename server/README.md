
## Setup aws config file setup steps

### Linux, macOS, or Unix users: ~/.aws/config

### Windows users: C:\Users\USER_NAME\.aws\config

### Create config file with below values

`[default]`

`aws_access_key_id = ${aws_access_key}`

`aws_secret_access_key = ${aws_secret_key}`

[Reference url](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html#setting-region-config-file)
