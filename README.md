A REST-based authentication API built with node.js, express.js, and MongoDB.
Uses JSON web tokens (JWTs) to protect most API routes.


Testing this authentication API in Postman

--
In a shell:

Run mongod

In the project directory, run:
npm start

--

In Postman:
--

1. Register a user by sending a JSON POST request to:

localhost:3005/users/register


returns an empty object: {}

------

2. Authenticate a user by sending a JSON Post request to:

http://localhost:3005/users/authenticate

{
	"username": "jsmith@gmail.com",
	"password": "jsm1th"
}

returns a user object that contains a token property:
{
    "_id": "5ced4d4f2167ae7bea21e637",
    "firstName": "James",
    "lastName": "Smith",
    "username": "jsmith@gmail.com",
    "email": "jsmith@gmail.com",
    "role": "admin",
    "dateCreated": "2019-05-28T15:01:35.206Z",
    "acceptedLicense": "2019-05-28T15:01:35.206Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2VkNGQ0ZjIxNjdhZTdiZWEyMWU2MzciLCJpYXQiOjE1NTkwNTU3NDJ9.9z3mfOVgI3A6fl1KO2TdrQ2kC43lPAAGMDamOkcqr4Y"
}

------

3. Issue a GET with Bearer Token to:

http://localhost:3005/users/listall

Use the token returned by the authentication POST request, above.
The user agent sends the JWT, typically in the Authorization header using the 
Bearer schema.

will return a list of user objects