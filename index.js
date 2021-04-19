const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.krq3y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5055;

client.connect(err => {
    const orderCollection = client.db("assignment-11").collection("orders");
    const userCollection = client.db("assignment-11").collection("users");
    const reviewsCollection = client.db("assignment-11").collection("reviews");
    const productsCollection = client.db("assignment-11").collection("products");

    app.post("/addProducts", (req, res) => {
        const order = req.body;
        productsCollection.insertOne(order)
            .then(result => {
                console.log('data added successfully');
                res.send("data added successfully");
            })
    })
    app.post("/addOrders", (req, res) => {
        const order = req.body;
        orderCollection.insertOne(order)
            .then(result => {
                console.log('data added successfully');
                res.send("data added successfully");
            })
    })
    app.post("/review", (req, res) => {
        const order = req.body;
        reviewsCollection.insertOne(order)
            .then(result => {
                console.log('data added successfully');
                res.send("data added successfully");
            })
    })
    app.post("/users", (req, res) => {
        const user = req.body;
        userCollection.insertOne(user)
            .then(result => {
                console.log('data added successfully');
                res.send("data added successfully");
            })
    })
    app.post("/makeAdmin", (req, res) => {
        const user = req.body;
        userCollection.insertOne(user)
            .then(result => {
                console.log('data added successfully');
                res.send("data added successfully");
            })
    })

    app.get('/orders', (req, res) => {
        orderCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.get('/reviews', (req, res) => {
        reviewsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    
    app.get('/admins', (req, res) => {
        userCollection.find({role:"admin"})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.get('/orders/:email', (req, res) => {
        const email = req.params.email
        orderCollection.find({email:email})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.patch('/update/:id', (req, res) => {
        productCollection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: {status: req.body.status}
            })
            .then(result => {
                res.send(result.modifiedCount > 0)
            })
    })

    app.get('/products', (req, res) => {
        productsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
});


app.listen(process.env.PORT || port);