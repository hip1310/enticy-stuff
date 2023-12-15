# Server

The Server module within the Enticy Stuff project encompasses all the components and features necessary to manage the Enticy Stuff application's backend.

## Installation

To set up the server module, follow these steps:

1. Install the required dependencies by running the following command:

    ```bash
    npm install
    ```

2. Copy the environment file and provide your sensitive data. You can use the provided example as a template:

    ```bash
    cp .env.example .env
    ```

## AWS Configuration Setup

In order to interact with AWS services, you need to configure your AWS credentials. Here are the steps to set up your AWS config file:

### For Linux, macOS, or Unix users:

Your AWS config file is located at `~/.aws/config`.

### For Windows users:

Your AWS config file is typically located at `C:\Users\USER_NAME\.aws\config`.

Create the AWS config file with the following values:

```bash
[default]
aws_access_key_id = ${aws_access_key}
aws_secret_access_key = ${aws_secret_key}
```

For more details, refer to the [AWS SDK Developer Guide](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html#setting-region-config-file).

## Running the Server

To launch the server application, use the following command:

```bash
npm start
```

This command will start the server and make it accessible.

## Running Tests

To run the test suite for the server, execute the following command:

```bash
npm run test
```

This will run the tests to ensure the server's functionality and reliability.

## Running Stripe Webhook

If you need to run the Stripe webhook for payment processing, use the following command:

```bash
stripe listen --forward-to localhost:8000/api/stripe/webhook
```

This command will set up the Stripe webhook and forward events to your local development environment for testing and processing.