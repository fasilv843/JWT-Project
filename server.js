const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(express.json())

const posts = [
    {
        name: 'Fasil',
        title: 'Post 1'
    },
    {
        name: 'Mashhoor',
        title: 'Post 2'
    }
]

app.get('/posts',authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.name === req.user.name))
})



function authenticateToken( req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// app.get('/users', (req, res) => {
//     res.json(users)
// })

// app.post('/users', async(req, res) => {
//     try {
//         const hashedPass = await bcrypt.hash(req.body.password, 10)
//         const user = {
//             name: req.body.name,
//             password : hashedPass
//         }
//         users.push(user)
//         res.status(201).send()
//     } catch (error) {
//         console.log(error);
//         res.status(500).send();
//     }
// })

// app.post('/users/login', async(req, res) => {
//     try {
//         const user = users.find(user => user.name == req.body.name)
//         if(user == null){
//             return res.status(400).send('Cannot find user')
//         }

//         if(await bcrypt.compare(req.body.password, user.password)){
//             res.send('success')
//         }else{
//             res.send('not allowed')
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send();
//     }
// })

app.listen(3000);