# Client

The Client module is a web project that encompasses all the components required to manage the web view of the Enticy Stuff application.

## Installation

To set up the client module, follow these steps:

1. Install the necessary dependencies by running one of the following commands:

    ```bash
    npm install
    # or
    npm install --force
    ```

2. Copy the environment file and enter your sensitive data:

    ```bash
    cp .env.example .env
    ```

## Running the Client Application

To launch the client application, execute the following command:

```bash
npm start
```

This command will start the development server and make the web view accessible.

## Running Tests

Use the following command to run the test suite for the client:

```bash
npm run test
```

Running tests is crucial for ensuring the reliability and correctness of your web application.

## Building for Production

To prepare your application for production deployment, use the following script:

```bash
npm run build
```

This script creates a production-ready build in the `build` folder, optimizing the application for the best performance. It includes minification of files, and filenames in the production build will also include unique hashes, improving cache management and security. Once this script has completed successfully, your application is ready for deployment in a production environment.