const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const db = require('./util/db');
const cors = require('cors');
const employees = require('./models/employee');
const items = require('./models/item');
const EmployeeItem = require('./models/employeeItem');
const users = require('./models/users');
//relation between employee and item


employees.belongsToMany(items, { through: EmployeeItem, foreignKey: 'employeeId' });
items.belongsToMany(employees, { through: EmployeeItem, foreignKey: 'itemId' });

app.use(cors());

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





app.get('/employees', (req, res, next) => {

    employees.findAll().then(employees => {
        console.log(employees);
        res.status(200).json({
            message: "Employees fetched successfully",
            employees: employees
        });
    }).catch(error => {
        res.status(500).json({
            message: "Failed to fetch employees",
            error: error.message
        });
    });

});


app.post('/addUser', (req, res, next) => {

    users.create({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    }).then(result => {
        res.status(201).json({
            message: "User created successfully",
            user: result
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    });
});






app.post('/login', (req, res, next) => {

    users.findOne({

        where: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(user => {

        if (user) {
            res.status(200).json({
                message: "User logged in successfully",
                user: user // the user that logged in 
            });
        }
        else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to login",
            error: error.message
        });
    });



})


app.post('/signUp', (req, res, next) => {

    users.create({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    }).then(result => {
        res.status(201).json({
            message: "User created  successfully",
            user: result
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    });
}
);






// TO ADD AN ITEM TO AN EMPLOYEE :
//write it here redyar dont forget .





// TO SEARCH FOR A EMPLOYEES NAME AND GET ALL THE ITEMS HE IS USING :

// app.get('/employee-items/:employeeName', async (req, res) => {
//     try {
//       const employeeName = req.params.employeeName;
//       const employee = await employees.findOne({ where: { name: employeeName } });
//       if (!employee) {
//         return res.status(404).json({ message: 'Employee not found.' });
//       }
//       const items = await employee.getItems(); // Using the getItems method provided by Sequelize for many-to-many relations
//       res.status(200).json(items);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });



// {force:true}
db.sync().then((result) => {
    app.listen(3000);
}).catch((err) => {
    console.log("the server could not start!");
})
