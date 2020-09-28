const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const imgModel = require('./models/imgModel')

//Middlewares
const GridFsStorage = require('multer-gridfs-storage')

const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const { log } = require('console')
require('dotenv/config');

const app = express()

const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    imgModel.find({}, (error, items) => {
        if(error) {
            console.log(error)
        } else {
            res.render('index', { items: items})
        }
    })
})

//Storage of the images
const storage = new GridFsStorage({
    db: connection,
    destination: (res, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (res, file, cb) => {
        cb(null, file.fieldname + '-' + new Date())
    }
})

const upload = multer({ storage: storage })

app.post('/', upload.single('image'), (res, req, next) => {
    const imgObj = {
        name: req.body.name,
        desc: req.body.description,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(imgObj, (error, item) => {
        if(error){
            console.log(error)
        } else {
            res.redirect('/')
        }
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server start on port http://localhost:${port}`))