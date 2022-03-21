# Storefront Backend Project

## Install dependencies
```
npm i bcrypt
npm i body-parser
npm i cors
npm i db-migrate-pg
npm i dotenv
npm i express
npm i jsonwebtoken
npm i morgan
npm i nodemon
npm i rimraf
npm i supertest
npm i @ert78gb/jasmine-ts --save-dev
npm i @types/bcrypt --save-dev
npm i @types/cors --save-dev
npm i @types/express --save-dev
npm i @types/jasmine --save-dev
npm i @types/jsonwebtoken --save-dev
npm i @types/morgan --save-dev
npm i @types/pg --save-dev
npm i @types/supertest --save-dev
npm i @typescript-eslint/eslint-plugin --save-dev
npm i @typescript-eslint/parser --save-dev
npm i cross-env --save-dev
npm i eslint --save-dev
npm i eslint-config-airbnb-base --save-dev
npm i eslint-config-prettier --save-dev
npm i eslint-config-standard --save-dev
npm i eslint-plugin-import --save-dev
npm i eslint-plugin-node --save-dev
npm i eslint-plugin-prettier --save-dev
npm i eslint-plugin-promise --save-dev
npm i jasmine --save-dev
npm i jasmine-spec-reporter --save-dev
npm i prettier --save-dev
npm i ts-node --save-dev
npm i tsc-watch --save-dev
npm i typescript --save-dev
```

## Set up DataBase
    In psql `CREATE USER user WITH PASSWORD 'pass';
    CREATE DATABASE store_front;
    CREATE DATABASE store_front_test;
    `\c store_front`
    `GRANT ALL PRIVILEGES ON DATABASE store_front TO user;`
    `\c store_front_test`
    `GRANT ALL PRIVILEGES ON DATABASE store_front_test TO user;`

## Running ports
    the port the app is running on is `3000`
    the port the database is running on is `5432`

## Enviromental Variables
``` 
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
ENVI=dev
BCRYPT_PASSWORD=icanthereyou
SALT_ROUNDS=10
JWT_SECRET=secrjwt
TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJwcm9kMiIsImxhc3RuYW1lIjoiNjAiLCJwYXNzd29yZCI6InBhc3MifQ.zo3dDYaQorReOU04__S1yZDK5G8yUopxU0axZ-GWT3M
```    

## Node commands
    to run the server `npm run start`
    to run tests `npm run test`