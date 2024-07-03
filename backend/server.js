const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const db = require('./util/db');

const employees = require('./models/employee');

const items = require('./models/item');

app.use(bodyParser.json());



app.post('/items', (req, res, next) => {
    items.create({
        Name: req.body.Name || "lenovo monitor",
        Description: req.body.Description || "has windows 10 installed",
        Category: req.body.Category || "monitor",
        Price: req.body.Price || 250,
        Quantity: req.body.Quantity || 1,
        companyId: req.body.companyId || "ALSARD-IT-0000725"
    })
    .then(item => {
        res.status(201).json({
            message: "Item created successfully",
            item: item
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to create item",
            error: error.message
        });
    });
});


app.post('/addEmployee', (req, res, next) => {
    employees.create({
        Name: req.body.name || "nmuna ",
        Email: req.body.email ,
        Phone: req.body.phone || "1234567890",
        Address: req.body.address || "123, Main Street, City",
        Position: req.body.position || "employee"
    }).then(result => {
        res.status(201).json({
            message: "Employee created successfully",
            employee: result
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
    });



});



app.get('/items', (req, res, next) => {

    items.findAll()
    .then(items => {
        res.status(200).json({
            message: "Items fetched successfully",
            items: items
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to fetch items",
            error: error.message
        });
    });


})





// {force:true}
db.sync().then((result) => {
    app.listen(3000);
}).catch((err) => {
    console.log("the server could not start!");
});
