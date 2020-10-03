const express = require('express')
const app = express()

const crypto = require('crypto')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

//DB
const mongoURI = 'mongodb://localhost/upcubeUploader'

const connect = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//init gfs
let gfs
connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'uploads'
    })
})

//Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (error, buf) => {
                if(error){
                    return reject(error)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileinfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileinfo)
            })
        })
    }
})

const upload = multer({ storage })

app.get('/', (req, res) => {
    if(!gfs){
        console.log("some error occured, check connection to db");
        res.send("some error occured, check connection to db");
        process.exit(0);
    }
    gfs.find().toArray((err, files) => {
        if(!files || files.length === 0){
            return res.render('index', { files: false })
        } else {
            const f = files
            .map(file => {
                if(file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
                    file.isImage = true
                } else {
                    file.isImage = false
                }
                return file
            })
            return res.render('index', { files: f })
        }
    })
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/')
})

app.get('/image/:filename', (req, res) => {
    const file = gfs
    .find({
        filename: req.params.filename
    })
    .toArray((error, files) => {
        if(!files || files.length === 0){
            return res.status(400).json({
                error: 'No files exist'
            })
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res)
    })
})

//Delete

app.post('/files/del/:id', (req, res) =>{
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if(err) return res.status(400).json({ err: err.message})
        res.redirect('/')
    })
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('server started on ' + `http://localhost:${port}`)
});