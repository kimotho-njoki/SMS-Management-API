# SMS Management API
Hapi JS API for an SMS management application. <br>
The SMS management application enables users to create contacts and send/receive messages to/from other contacts.

## Documentation
The documentation of this API can be found at:
> http://docs.shoppinglistapi6.apiary.io/#

## Getting Started
- Clone the repository onto your machine
- `npm install` dependencies in package.json
- Create a database and add the user, password and database name to `knex.js`
- Run the database migrations with knex migrate:make setup
- Run npm start to start the application
- You can use Postman to run the endpoints


#### Application End points

| Resource URL | Method | Description | 
| -------------|--------|-------------|
|/contact| POST   | POST a single contact |
|/contacts   | GET   | GET all contacts   |
|/contacts/<:contactID> | GET | GET a single contact |
|/contacts/delete/<:contactID> | DELETE  | DELETE a single contact | 
|/sms | GET | GET all sms messages  |
|/<:contactID>/sms | POST | POST an sms message |
|/sms/sent/<:contactID> | GET | GET all your sent sms messages |
|/sms/received/<:contactID> | GET | GET all sms messages you have received |
|/sms/delete/<:contactID>/<:smsID> | GET  | GET a single sms message |



