# express-members-only

RESTful API for my Full-stack E-commerce website project with two separate frontends which you can see here:
<br />
#### [Store](https://github.com/husky93/ecommerce-store-frontend)
<br />
#### [Admin Dashboard](https://github.com/husky93/ecommerce-admin-frontend)
<br />
<br />

Made with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/). [MongoDB](https://www.mongodb.com/) was used for a database along with [mongoose](https://mongoosejs.com/) ODM for modeling the application. [passport.js](https://www.passportjs.org/) along with [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for JSON Web token generation and [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password encryption.

## How to run locally:
- Clone repository.
- Run ``npm install`` command in your terminal.
- Create .env file
- In .env file set up your own environmental variables that are used around the project.
- Run ``npm run start`` command in your terminal.
- Server will listen to requests from ``localhost:3000`` on default.

## Features
- API structure based on REST architecture best practices.
- CRUD operations available for every model.
- Role based authentication for certain API endpoints.
- Authentication with use of [passport.js](https://www.passportjs.org/) and [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken).
- Password encryption with [bcrypt.js](https://www.npmjs.com/package/bcryptjs).
- Application data models based on [mongoose's](https://mongoosejs.com/) schema based solution.
- POST and PUT requests validation with [express-validator](https://express-validator.github.io/docs/).


### Dependencies Used:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [passport.js](https://www.passportjs.org/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [MongoDB](https://www.mongodb.com/)
- [async](https://www.npmjs.com/package/async)
- [express-validator](https://express-validator.github.io/docs/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)

#### Dev dependencies and tools used:
- [nodemon](https://www.npmjs.com/package/nodemon)
- [babel](https://babeljs.io/)
- [Postman](https://www.postman.com/)