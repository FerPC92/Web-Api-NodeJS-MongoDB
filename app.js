const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());
server.use(cors());

let secrets = JSON.parse(fs.readFileSync('secrets.json'))

let Users = require('./models/users');
let Policy = require('./models/policies');

mongoose.connect('mongodb://localhost/webApiTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw error
    console.log('Succesfull Conexion')

    server.post('/login', (req, res) => {
        console.log("I recived a POST call to the endpoint /login");
        if (req.body["email"] != undefined && req.body["email"] != "") {
    
            Users.find((err, data) => {
                if (err) {
                    throw (err)
                }
                let dataComplete = data;
                let userData;
                for (let i = 0; i < dataComplete.length; i++) {
                    if (req.body["email"] === dataComplete[i]["email"]) {
                        userData = dataComplete[i]
                    }
                }
                if (userData != undefined) {
    
                    jwt.sign({
                        "username": userData["email"],
                        "id": userData["id"],
                        "role": userData["role"]
                    }, secrets["jwtKey"], (err, token) => {
                        if (err) {
                            throw (err);
                        }
                        console.log("Login correct")
                        res.send({
                            "message": "Login correct",
                            "token": token,
                        })
                    });
    
                } else {
                    console.log("user doesnt't exist")
                    res.send({
                        "message": "Valid Email Must Be Provided, Please Check It "
                    })
                }
            });
    
        } else {
            console.log("Login incorrect")
            res.send({
                "message": "Email Field Must Be Complete!"
            })
        }
    
    });
    
    
    server.get('/clients', (request, response) => {
        console.log("I recived a GET call to the endpoint /clients")
        Users.find((err, data) => {
            if (err) {
                throw (err);
            }
            response.send(data);
    
        })
    });
    
    server.get('/client/:id', (request, response) => {
    
        try {
            console.log("I recived a GET call to the endpoint /client/id")
    
            let id = request.params.id;
    
            Users.find((err, data) => {
                if (err) {
                    throw (err)
                }
    
                let clients = data
                let clientExist = false
    
                for (let i = 0; i < clients.length; i++) {
                    if (clients[i]["id"] === id) {
                        clientExist = true
                    }
    
                }
                if (clientExist) {
                    let filteredClients = clients.filter((client) => {
                        return (client["id"] === id)
                    });
    
                    response.send(filteredClients);
    
    
                } else {
                    response.send({
                        "message": "Client Doesn't Exist, Please check it"
                    });
    
                }
    
            });
    
        } catch (e) {
            response.send({
                "message": e
            });
        }
    });
    
    server.get('/clientByName/:name', (request, response) => {
    
        try {
            console.log("I recived a GET call to the endpoint /clientByName/name")
    
            let name = request.params.name;
    
            Users.find((err, data) => {
                if (err) {
                    throw (err)
                }
    
                let clients = data
                let clientExist = false
    
                for (let i = 0; i < clients.length; i++) {
                    if (clients[i]["name"] === name) {
                        clientExist = true
                    }
    
                }
                if (clientExist) {
                    let filteredClients = clients.filter((client) => {
                        return (client["name"] === name)
                    });
    
                    response.send(filteredClients);
    
    
                } else {
                    response.send({
                        "message": "Client Doesn't Exist, Please check it"
                    });
    
                }
    
            });
    
        } catch (e) {
            response.send({
                "message": e
            });
        }
    });
    
    
    server.get('/policies', (request, response) => {
        console.log("I recived a GET call to the endpoint /policies");
        Policy.find((err, data) => {
            if (err) {
                throw (err);
            }
            response.send(data);
    
        })
    });
    
    server.get('/clientByPolicie/:policyId', (request, response) => {
    
        try {
    
            console.log("I recived a GET call to the endpoint /clientByPolicie/:policyId")
            let policyID = request.params.policyId
    
            let token = request.headers['authorization']
            if (!token) {
                response.status(401).send({
                    error: "Authentication token is required"
                })
                return;
            }
    
            token = token.replace('Bearer ', '')
    
            jwt.verify(token, secrets["jwtKey"], (err, user) => {
                if (err) {
    
                    throw ('Invalid Token')
    
                    
    
                } else if (user["role"] !== "admin") {
    
                    throw ('unauthorized user')
                    
                }
            });
    
            Policy.find((err, policies) => {
    
                if (err) {
                    throw (err);
                }
    
                policiesData = policies;
    
                policyUser = "";
    
                policyExist = false
    
    
                for (let i = 0; i < policiesData.length; i++) {
                    if (policiesData[i]["id"] === policyID) {
                        policyExist = true;
                        policyUser = policiesData[i]["clientId"];
    
                    }
    
                }
    
                if (!policyExist) {
                    response.send({"message": "Policy Can't Be Found, check data and try again"});
                } else {
                    Users.find((err, data) => {
                        if(err){
                            throw (err);
                        }
                        usersData = data
                        let clientByPolicyID = usersData.filter((user) => {
                            return (user["id"] === policyUser)
                        });
                        
                        response.send(clientByPolicyID);
    
                    });
                }
    
            });
    
        } catch (e) {
            response.send("{ error: " + e + " }");
        }
    });
    
    server.get('/policiesByUser/:name', (request, response) => {
    
        try {
    
            console.log("I recived a GET call to the endpoint /policiesByUser/name")
            let clientName = request.params.name
    
            let token = request.headers['authorization']
            if (!token) {
                response.status(401).send({
                    error: "Authentication token is required"
                })
                return;
            }
    
            token = token.replace('Bearer ', '')
    
            jwt.verify(token, secrets["jwtKey"], (err, user) => {
                if (err) {
    
                    throw ('Invalid Token');
    
                } else if (user["role"] !== "admin") {
    
                    throw ('unauthorized user');
                }
            });
    
            Users.find((err, users) => {
    
                if (err) {
                    throw (err);
                }
    
                clientData = users;
    
                clientExist = false
                clientNameToId = "";
                for (let i = 0; i < clientData.length; i++) {
                    if (clientData[i]["name"] === clientName) {
                        clientExist = true;
                        clientNameToId = clientData[i]["id"]
                    }
    
                }
                if (!clientExist) {
                    response.send({"message": "user doesn't exist, check data and try again"});
                } else {
                    Policy.find((err, data) => {
                        if(err){
                            throw (err);
                        }
                        policiesData = data
                        let policyByName = policiesData.filter((policy) => {
                            return (policy["clientId"] === clientNameToId)
                        });
    
                        response.send(policyByName);
    
                    });
                }
    
            });
    
        } catch (e) {
            response.send("{ error: " + e + " }");
        }
    });

    
    server.listen(3000, () => {
        console.log('Listening in 3000')
    })
} )