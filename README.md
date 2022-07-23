# express-api

A REST api built on express with minimal dependencies.

## Usage

1. Clone the repository:

   `git clone https://github.com/ferdiebergado/express-api.git`

2. Install the dependencies:

   `npm install`

3. Run the application:

   **Locally**

   `npm run dev`

   **Using Docker**

   `npm docker:dev`

4. Make a request to locahost:3000:

   `curl localhost:3000`

## Endpoints

**Authentication**

- POST /auth/register

  - Example data:

  ```json
  {
    "email": "abc@example.com",
    "password": "1234",
    "password_confirmation": "1234"
  }
  ```

- POST /auth/login

  - Example data:

  ```json
  {
    "email": "abc@example.com",
    "password": "1234"
  }
  ```
