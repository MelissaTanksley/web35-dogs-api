require('dotenv').config()
const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const server = express()

server.use(express.json())
server.use(cors())

// Here is some seed data

let dogs = [
    {
        id: uuid.v4(),
        breed: 'German Shepard',
        imageUrl: 'https://en.wikipedia.org/wiki/German_Shepherd#/media/File:German_Shepherd_-_DSC_0346_(10096362833).jpg'
    }
]


// Get all Dogs

server.get('/dogs', (req,res) => {
    try {
        res.status(200).json(dogs)
    }
    catch {
        res.status(500).json({ errorMessage: "Sorry can not get Dogs"})
    }
})


server.use('/', (req,res) => {
    res.status(200).json({ message: 'Hello Lambda Students'})
})

// const PORT = 5000
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`)
})