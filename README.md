# Birthday Message
Backend app for sending birthday message in user local time at 9 AM

# Postman
https://www.postman.com/juunsdev/workspace/juniardys/collection/16563585-5dfb014d-6e5e-4c6d-a38a-0f4c490e75fc

# How to run
### Dependencies
Install all dependecies below:
- [node](https://nodejs.org)
- [mysql](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
### Installing packages
Run the following command
```
npm install
```
### Setup Env
Copy `.env.example` to `.env` and setup the configurations.
### Run migration
Run the following command
```
npm run migrate:up
```
### Fetch timezone from external API
Run the following command
```
npm run fetch:timezone
```
### Run app
Run the following command
```
npm start
```
Project will be run in port `3000` (http://localhost:3000)

# Tech Stack
Node, Express, MySQL

# Authors
- Juniardy Setiowidayoga ([@juniardys](https://github.com/juniardys))
