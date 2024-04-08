var express = require("express")
var app = express()
const {MongoClient, ServerApiVersion} = require('mongodb');
let collection;


const uri = "mongodb+srv://shreya1:shreya123@carts.ttzrffi.mongodb.net/";

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect((err, db) => {
            collection = client.db("card").collection('cards');

            console.log("sdfg",collection)
            if (!err) {
                console.log('MongoDB connection connected')
            }
            else {
                console.log("MongoDB connection error: ", err);
                process.exit(1);
            }
        });
    } catch (ex) {
        console.error(ex);
    }
}

function insertProjects(card, callback) {
    try {
        collection.insertOne(card, callback);
    } catch (ex) {
        console.error(ex);
    }
}

function getProjects(callback) {
    try {
        collection.find({}).toArray(callback);
    } catch (ex) {
        console.error(ex);
    }
}


app.get('/', (req, res) => {
    res.render(index.html);
});

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            console.log('result', result);
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})


app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Successfully added", data: result})
        }
    })
})

var port = process.env.port || 3000;

app.listen(3000, () => {
    console.log('express server started ' + port);
    runDBConnection();
}); 