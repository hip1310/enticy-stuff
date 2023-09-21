## Steps to get aws access_key and secret_key

1. Open IAM Identity Center Dashboard(https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home) in aws console
2. Create user from left side under access management->users click create user
3. Provide name for user(terraform_user)
4. set permissions(AdministratorAccess) then create.
5. Click on newly created user navigate to security credentials.
6. Now create access key with usecase(Local code)
7. Now you can see access_key and secret_key.


## Steps to run project
### `terraform init`
To init terraform project

### `terraform plan -var-file="vars.tfvars"`
To see what will be create or update.

### `terraform apply -var-file="vars.tfvars"`
To run code in aws
