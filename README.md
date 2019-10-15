# Version 2.0
This is a second version of the WEB-API original repo  <a href="https://github.com/FerPC92/Web-Api-NodeJS"> https://github.com/FerPC92/Web-Api-NodeJS</a>

**``What's new?``**<br />
 In the features of the original repo, i recommend implement`` MongoDB`` or another DB to get a better structure of the app data, this is the result of that. (this repo has only one commit , the original repo has the history of commits, please if you want to see it, check it)

# WEB-API 

Web-API with NodeJS And ``MONGODB`` using the following Dependencies :

- ExpressJS (Framework for create the server)
- Cors  (Middleware to enable CORS with various options)
- Body-Parser (Middleware to parse incoming request bodies)
- Json Web Tokens (To Generate and verify auth tokens )

# How To Start The Server And DB

**1. Downloading the code**

- Clone the repo : https://github.com/FerPC92/Web-Api-NodeJS-MongoDB.git .

**2. Install dependencies**

- NPM install

**3. Make your Tokens Secure**

- Create a secrets.json file with a key for your JWT Signature (and the later verification)

   Example object in the file
<br>
<br>
<img src="./assets/secrets.png">

**4. Run MongoDB Compass**
- Start the Compass and create a DB named ``webApiTest``, With the Following Collections:
    * users
    * policies

- If you create the DB with another name , you have to change the app.js file to run the DB with the name that you choose and connect it with compass.

Snippet Example:

``mongodb://localhost/YOUR-DATA-BASE-NAME``

<img src="./assets/conexion.png">


**5. Import the Collections Data (users and policies) from the folder ``MongoCollections``**
- Enter in a collection, for Example users collections (it's going to be empty at the moment because is new), go to the nav bar at the top and select ``Import Data``

<img src="./assets/import.png">

Select Input File Type as JSON and Browse from the ``MongoCollections`` Folder, the ``usersschema`` file and import it.

This is going to be to collection ones you import the Json data

<img src="./assets/users.png">


``Repeat the process with the policies collection``

**6. Run the server**

- Execute in the Shell:  node app.js  
  By default the server is runnning in the localhost:3000 port, you can change that in the app.js file
<br>
<br>
<img src="./assets/listen.png">

# Considerations
- To make the documentation examples of the endpoints, we will be using POSTMAN Software, 
    The Following link show's the collection of the example calls to the server 
    <br>
       <a href="https://documenter.getpostman.com/view/8209276/SVtWvmRX?version=latest#57282950-bdd0-400d-9d5b-fce6c7c81f86"  target="_blank"> Link </a>

- There are 2 kind of users who can make the call request , one with the Role  `user` , and other one with the Role `admin`, there are some endpoints which are only available for the users with the Token authentication with Role `admin`.

# API Endpoints

**Login**
----
* **URL**

    /login

* **Method:**

  `POST`

* **Authorization**

    none 

* **Body Example**
 
    E-mail is required for login (you can find all the users available in the Mongo Collection users)
    - Example Body :
    {"email": "britneyblankenship@quotezart.com"}

* **Success Response:**

* **Code:** 200 <br />
    **Content:**  <br /> 
    ```
    {"message": "Login correct",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaXRuZXlibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwiaWQiOiJhMGVjZTVkYi1jZDE0LTRmMjEtODEyZi05NjY2MzNlN2JlODYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzA5MDM5MDB9.A7_Q0NoPB6KiIiPxcq5ZTTDJJOankCIz5KY1p5psacc"}
* **Error Response:**

    **Content:**  <br /> 
    ```
    {"message": "Valid Email Must Be Provided, Please Check It "}

    OR if the body is empty or undenided

    {"message": "Email Field Must Be Complete!"}

**Clients**
----
 * **URL**

    /clients

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

* **Success Response:**

* **Code:** 200 <br />
    **Content Example:**  <br /> 
    ```
    List of all clients (users collection data)
    Snippet:

    {
        "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
        "name": "Britney",
        "email": "britneyblankenship@quotezart.com",
        "role": "admin"
    },
    {
        "id": "a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
        "name": "Barnett",
        "email": "barnettblankenship@quotezart.com",
        "role": "user"
    }

**Clients By ID**
----
* **URL**

    /clients/:id

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

*  **URL Params**

   **Required:**

   `id=[string]`

   Example:
   ``/client/e8fd159b-57c4-4d36-9bd7-a59ca13057bb``

* **Success Response:**

* **Code:** 200 <br />
    **Content Example:**  <br /> 
    ```
    [{
        "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
        "name": "Manning",
        "email": "manningblankenship@quotezart.com",
        "role": "admin"
    }]

* **Error Response:**

    **Content:**  <br /> 
    ```
    {"message": "Client Doesn't Exist, Please check it"}

**Clients By Name**
----
* **URL**

    /clientByName/:name

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

*  **URL Params**

   **Required:**

   `id=[string]`

   Example:
   ``/clientByName/Britney``

* **Success Response:**

* **Code:** 200 <br />
    **Content Example:**  <br /> 
    ```
    [{
        "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
        "name": "Britney",
        "email": "britneyblankenship@quotezart.com",
        "role": "admin"
    }]

* **Error Response:**

    **Content:**  <br /> 
    ```
    {"message": "Client Doesn't Exist, Please check it"}


**Policies**
----
* **URL**

    /policies

* **Method:**

  `GET`

* **Authorization**

    none 

* **Body**

    none

* **Success Response:**

* **Code:** 200 <br />
    **Content Example:**  <br /> 
    ```
    Snippet:
      {
        "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
        "amountInsured": 1825.89,
        "email": "inesblankenship@quotezart.com",
        "inceptionDate": "2016-06-01T03:33:32Z",
        "installmentPayment": true,
        "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
    },
    {
        "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
        "amountInsured": 399.89,
        "email": "inesblankenship@quotezart.com",
        "inceptionDate": "2015-07-06T06:55:49Z",
        "installmentPayment": true,
        "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
    }

**Policies By User/client Name**
----
* **URL**

    /policiesByUser/:name

* **Method:**

  `GET`

* **Authorization**

    The endpoint is only authorized for users logged with role ``admin``

    ``HEADERS``

    ``KEY`` : Authorization
    
    ``VALUE`` :  Bearer + space + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbm5pbmdibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwiaWQiOiJlOGZkMTU5Yi01N2M0LTRkMzYtOWJkNy1hNTljYTEzMDU3YmIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzA4MTI2NzF9.FjUyRgWKvr_cY-rlvqy33N5qpskE2sq7HDMFrAHuScE (your token)

* **Body**

    none

*  **URL Params**

   **Required:**

   `id=[string]`

   Example:
   ``/policiesByUser/Manning``

* **Success Response:**

* **Code:** 200 <br />
    **Content Example:**  <br /> 
    ```
    All the policies asociated to the user searched in the params
    Snippet example
     {
        "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
        "amountInsured": 1825.89,
        "email": "inesblankenship@quotezart.com",
        "inceptionDate": "2016-06-01T03:33:32Z",
        "installmentPayment": true,
        "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
    },
    {
        "id": "56b415d6-53ee-4481-994f-4bffa47b5239",
        "amountInsured": 2301.98,
        "email": "inesblankenship@quotezart.com",
        "inceptionDate": "2014-12-01T05:53:13Z",
        "installmentPayment": false,
        "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
    }

* **Error Response:**

* **Code:** 401 <br />
    **Content Example:**  <br /> 
    ```
    if token is not provided

    {"error": "Authentication token is required"}

    OR token is not valid 

    { error: Invalid Token }

    OR token is not provided by user with role admin

    {"error": "unauthorized user"}

    If client provided in params doesn't exist

    {"message": "user doesn't exist, check data and try again"}

**Client By Policy ID**
----
* **URL**

    /clientByPolicie/:policyId

* **Method:**

  `GET`

* **Authorization**

    The endpoint is only authorized for users logged with role ``admin``

    ``HEADERS``

    ``KEY`` : Authorization
    
    ``VALUE`` :  Bearer + space + eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbm5pbmdibGFua2Vuc2hpcEBxdW90ZXphcnQuY29tIiwiaWQiOiJlOGZkMTU5Yi01N2M0LTRkMzYtOWJkNy1hNTljYTEzMDU3YmIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NzA4MTI2NzF9.FjUyRgWKvr_cY-rlvqy33N5qpskE2sq7HDMFrAHuScE (your token)

* **Body**

    none

*  **URL Params**

   **Required:**

   `id=[string]`

   Example:
   ``/clientByPolicie/6f514ec4-1726-4628-974d-20afe4da130c``

* **Success Response:**

* **Code:** 200 <br />
    **Content Example:**  <br /> 
    ```
    The endpoint returns the Client associated to a policy ID
     {
        "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
        "name": "Britney",
        "email": "britneyblankenship@quotezart.com",
        "role": "admin"
    }

* **Error Response:**

* **Code:** 401 <br />
    **Content Example:**  <br /> 
    ```
    if token is not provided

    {"error": "Authentication token is required"}

    OR token is not valid 

    { error: Invalid Token }

    OR token is not provided by user with role admin

    {"error": "unauthorized user"}

    If client provided in params doesn't exist

    {"message": "Policy Can't Be Found, check data and try again"}

# License

GNU general license.