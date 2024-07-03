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
        model: req.body.model || "lenovo",
        tagId: req.body.tagId || "alsard-it-0000725",
        company: req.body.company || "ALSARD",
        subLocation: req.body.subLocation || "IT-Department",

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
    console.log("entered it ")
    employees.create({
        Name: req.body.name || "nmuna ",
        Email: req.body.email,
        Phone: req.body.phone || "1234567890",
        employeeId: req.body.UserID || "alsard-it-0000725",
        Position: req.body.position || "employee",
        department: req.body.department || "IT"
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
