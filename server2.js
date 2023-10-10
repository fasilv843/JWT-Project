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

app.post('/login', (req, res) => {
    const userName = req.body.userName
    console.log(userName);
    const user = { name: userName }
    const accessToken = jwt.sign(user, process.env.JWT_SECRET)
    res.json({accessToken: accessToken})
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

app.listen(4000);