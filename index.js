const Http = require('http');
const PORT = 3000;
const Localhost = "localhost";
const fs = require('fs');
const path = require('path');
const { getAllUsers, createNewUser } = require('./Router/User-routers')
const usersDataDB = path.join(__dirname, 'db', 'Users.json')
const authenticateGetUsers = require('./Router/authenticateUsers')


const requestsHandlers = async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    // Gettig all users
    if (req.method === "GET" && req.url === "/users") {
    authenticateGetUsers(req, res,["Admin"])
    .then(()=>{
        getAllUsers(req, res)
    }).catch((err)=>{
        res.writeHead(400);
        res.end(JSON.stringify({
                message:err
        }))
     })
    }
    //  creating a new user
    if (req.method === "POST" && req.url === "/users") {
    createNewUser(req, res);
    }

}






const server = Http.createServer(requestsHandlers)




server.listen(PORT, Localhost, () => {
     JSON.parse(fs.readFileSync(usersDataDB,"utf8"))

    console.log(`server is listening on http://${Localhost}:${PORT}`);
})