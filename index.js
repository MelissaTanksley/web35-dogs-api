const express = require('express')

const server = express()

server.use(express.json())

server.use('/', (req,res) => {
    res.status(200).json({ message: 'Hello Lambda Students'})
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`)
})