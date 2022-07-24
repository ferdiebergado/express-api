# express-api

A REST api built on express with minimal dependencies.

**THIS IS STILL A WORK IN PROGRESS...**

## Usage

1. Clone the repository:

    ```bash
    git clone https://github.com/ferdiebergado/express-api.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    **Locally**

    ```bash
    npm run dev
    ```

    **Using Docker**

    ```bash
    npm run docker:dev
    ```

4. Make a request to locahost:3000:

    ```bash
    curl localhost:3000
    ```

## Endpoints

**Authentication**

-   POST /auth/register

    -   Example data:

    ```json
    {
        "email": "abc@example.com",
        "password": "1234",
        "password_confirmation": "1234"
    }
    ```

-   POST /auth/login

    -   Example data:

    ```json
    {
        "email": "abc@example.com",
        "password": "1234"
    }
    ```
