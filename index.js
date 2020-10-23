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
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg'
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

// Get 1 dog

server.get('/dogs/:id', (req, res) => {
    const { id } = req.params
    const findDogById = dog => {
        return dog.id == id
    }
    const foundDog = dogs.find(findDogById)
    if (!foundDog) {
        res.status(400).json({ errorMessage: 'Can not find a dog with that ID'})
    } else {
        res.json(foundDog)
    }
})

// Add new Dogs

server.post('/dogs', (req,res) => {
    const newDog = req.body
    if(!(newDog.breed)) {
        res.status(400).json({ errorMessage: 'Please make sure you have a breed listed'})
    } try {
        const notNew = dogs.find(dog => dog.breed === req.body.breed)
        if(!notNew) {
            newDog.id = uuid.v4()
            dogs.push(newDog)
            res.status(201).json({ errorMessage: 'Added new dog', newDog})
        } else {
            res.status(400).json({ errorMessage: 'Dog is already on server'})
        }
    }
    catch {
        res.status(500).json({ errorMessage: 'Dang it, Somethings broke on the server here'})
    }
})

// Delete a dog :(

server.delete('/dogs/:id', (req, res)=> {
    const { id } = req.params
    const findDogById = dog => {
        return dog.id == id
    }
    const foundDog = dogs.find(findDogById)
    if (!foundDog) {

        res.status(400).json({ errorMessage: 'Can not find a dog with that ID'})
    } else {
        dogs = dogs.filter((dog)=>{
            return dog.id != id
        })
        res.json({deleted: foundDog})
    }
})


// Base URL

server.use('/', (req,res) => {
    res.status(200).json({ message: 'Hello Lambda Students'})
})


// Spins up server

// const PORT = 5000
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`)
})