const fs = require('fs');
const path = require('path');
const usersDataDB = path.join("C:/Users/Admin/OneDrive/Desktop/assignmentG", 'db', 'Users.json')

// getting all users from database
const getAllUsers = (req,res) => {
        return new Promise((resolve,reject) => {
            fs.readFile(usersDataDB, 'utf8', (err, user) => {
                if (err) return reject(err);
                resolve(JSON.parse(user));
            })
        })
}

const authenticateGetUsers = async(req, res,role) => {
    return new Promise ((resolve, reject) => {
        const body = []
        req.on("data",(chunk) => body.push(chunk))
        req.on("end",async() => {
        const paresData = Buffer.concat(body).toString()
        if (!paresData) return reject("No username or password provided");
        const {user:usersDetails,Book} = JSON.parse(paresData)
        const users = await getAllUsers()
        // checking if user exists
        const userExists = users.find(users=>  users.UserName === usersDetails.UserName)
        // conditions
        if(!userExists) return reject("User does not exist in the list of users pls sign up");
        if(!role.includes(userExists.role)) return reject("you are not authorized")
        resolve(Book)
    });
    })
}


module.exports = authenticateGetUsers;