const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json())

// TESTING USER
const userlist = [
    {
        id: "1",
        username: 'admin',
        password: 'admin',
        isAdmin: true
    },
    {
        id: "2",
        username: 'admin2',
        password: 'admin2',
        isAdmin: true
    }
]

app.listen(5000, () => console.log('Working'));

app.post("/api/login", (req, res) => {
    const {username, password} = req.body;
    const account = userlist.find((user) => {
            return user.username === username && user.password === password;
    });

    if(account) {
        //Generating access token
        const token = jwt.sign({id:account.id, isAdmin: account.isAdmin}, "testingkey", {expiresIn: "300"});
        res.json({
            username: account.username,
            isAdmin: account.isAdmin,
            token
        })
    } else {
        res.status(400).json('This account not exist');
    }

    const verify = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token,"testingkey", (err, user) => {
                if(err) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            })
        } else {
            res.status(401).json("You doesn't have any authorization here")
        }
    }
})
