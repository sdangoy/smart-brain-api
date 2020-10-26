# smart-brain-api-2

The frontend of a React app that allows users to register accounts and sign-in to input a photo's online image URL to detect faces. The app also records how many times the user has submitted to detect. The backend server is implemented with PostgreSQL.

Installed packages:

- body-parser: to parse and have access to req.body to read JSON and form data (https://www.npmjs.com/package/body-parser)
- express: builds server (https://www.npmjs.com/package/express)
- nodemon: to run scripts and make sure server is running (https://www.npmjs.com/package/nodemon)
- bcrypt-nodejs: hash function to secure passwords stored in database (https://www.npmjs.com/package/bcrypt-nodejs)
- cors: used to bypass Chrome security error when connecting front-end to back-end by sending a CORS request (https://www.npmjs.com/package/cors)
- knex: used to connect to database (http://knexjs.org/)
- pg: PosgresSQL client for Node.js (https://www.npmjs.com/package/pg)
- dotenv-flow: used to set enivornmental variables to protect/make dynamic db info/API key and having multiple .env files (https://www.npmjs.com/package/dotenv)