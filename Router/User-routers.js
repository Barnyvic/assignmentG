const fs = require('fs');
const path = require('path');
const usersDataDB = path.join("C:/Users/Admin/OneDrive/Desktop/assignmentG", 'db', 'Users.json')



// Getting all the users from the database
const getAllUsers = function (req, res) {
    fs.readFile(usersDataDB, 'utf8', (err, user)=>{
    if (err) {
        console.log(err);
        res.writeHead(404);
        res.end("error occured while fetching users from the database")
        }
        res.end(user)
    }
)}


// Creating a new user 
const createNewUser = function (req, res) {
    const body = []

    req.on("data", chunk => {body.push(chunk)})

    req.on("end", () =>{
        const paresData = Buffer.concat(body).toString()
        if(!paresData) {
            res.writeHead(404)
            res.end("body cant be empty")
        }
        const newUser = JSON.parse(paresData)
        
        fs.readFile(usersDataDB, "utf8", (err, user) =>{
            if (err) {
                console.log(err);
                res.writeHead(404);
                res.end("error occured while fetching users from the database") 
            }
            const listOfUsers = JSON.parse(user);
            const userExists = listOfUsers.find(users=>users.UserName === newUser.UserName)
            // checking if user exists already
           if (userExists) return res.writeHead(404).end("user already exists");
            const allUsers = [...listOfUsers,newUser]

        fs.writeFile(usersDataDB,JSON.stringify(allUsers),(err)=>{
            if(err){
            res.writeHead(500)
            res.end("an error occured while writing users to the database")
            }
            res.end(JSON.stringify(allUsers));
        })
        })
    })
}





module.exports = {getAllUsers,createNewUser}