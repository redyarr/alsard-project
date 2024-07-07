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
const jwt = require('jsonwebtoken');



employees.belongsToMany(items, { through: EmployeeItem, foreignKey: 'employeeId' });
items.belongsToMany(employees, { through: EmployeeItem, foreignKey: 'itemId' });

app.use(cors());

app.use(bodyParser.json());





async function ensureAdminUser() {

    users.findOne({ where: { name: "admin", password: "123" } }).then(user => {
        if (!user) {
            users.create({
                name: "admin",
                password: "123",
                role: "admin"
            }).then(result => {
                console.log("admin created");

            }).catch(error => {
                console.log("admin not created");

            });
        }
    }
    )


};






app.post('/additems', (req, res, next) => {
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


});


app.delete('/deleteItem/:id', (req, res) => {
    const itemId = req.params.id;
    items.destroy({
        where: { Id: itemId }
    }).then(() => {
        res.status(200).json({
            message: "Item deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Failed to delete item",
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



app.delete('/deleteEmployee/:id', (req, res, next) => {
    const employeeId = req.params.id;

    employees.destroy({
        where: { Id: employeeId } 
    }).then(() => {
        res.status(200).json({
            message: "Employee deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    });
});










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


// app.post('/addUser', (req, res, next) => {

//     users.create({
//         name: req.body.name,
//         password: req.body.password,
//         role: req.body.role
//     }).then(result => {
//         res.status(201).json({
//             message: "User created successfully",
//             user: result
//         });
//     }
//     ).catch(error => {
//         res.status(500).json({
//             message: "Failed to create user",
//             error: error.message
//         });
//     });
// });




//am API'y login'a mn updatem krdwa la jpt henawma abe token drwskay lerawa boway mn ba post tokenaka benm
// w lawla la local storage aka bakary benm boway kabra login bmenetawa ka refreshy krd bas am token a bo layani securety'ya 
//dway 1 sa3at basarache 


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("username", username);

    // Dummy authentication logic (replace with database query)
    const user = users.findOne({ where: { name: username, password: password } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ username: user.username, token });

});




// to edit an employee
app.post('editEmployee/:id', (req, res, next) => {

    const employeeId = req.params.id;

    employees.update({

        Name: req.body.name,
        Email: req.body.email,
        Phone: req.body.phone,
        employeeId: req.body.UserID,
        Position: req.body.position,
        department: req.body.department,
        updatedAt: new Date()
    
    }, { where: { Id: employeeId } }).then(result => {
        res.status(200).json({
            message: "Employee updated successfully",
            employee: result
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    });

});

// to edit an item
app.post('/editItem/:id', (req, res, next) => {

    const itemId = req.params.id;

    items.update({

        Name: req.body.Name,
        Description: req.body.Description,
        Category: req.body.Category,
        model: req.body.model,
        tagId: req.body.tagId,
        company: req.body.company,
        subLocation: req.body.subLocation,
        updatedAt: new Date(),
        reserved: req.body.reserved
    }, { where: { Id: itemId } }).then(result => {

        res.status(200).json({
            message: "Item updated successfully",
            item: result
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to update item",
            error: error.message
        });
    }
    );

});


// to delete an item
app.delete('/deleteItem/:id', (req, res, next) => {

    const itemId = req.params.id;

    items.destroy({
        where: { Id: itemId }
    }).then(() => {
        res.status(200).json({
            message: "Item deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Failed to delete item",
            error: error.message
        });
    });

});




app.post('/addEmployeeItem', (req, res, next) => {

    const employeeId = req.body.employeeId;
    const itemId = req.body.itemId;

    EmployeeItem.create({

        employeeId: employeeId,
        itemId: itemId

    }).then(result => {
        res.status(201).json({
            message: "Employee item created successfully",
            employeeItem: result
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Failed to create employee item",
            error: error.message
        });
    }
    );

});


// TO ADD AN ITEM TO AN EMPLOYEE :
//write it here redyar dont forget .


// to show the items that an employee is using 
app.get('/employeeItems', (req, res) => {
    EmployeeItem.findAll({
        include: [
            {
                model: employees,
                attributes: ['name', 'email', 'phone'], // Specify the employee attributes you want
            },
            {
                model: items,
                attributes: ['name', 'description'], // Specify the item attributes you want
            }
        ]
    }).then(employeeItems => {
        res.status(200).json(employeeItems);
    }).catch(error => {
        res.status(500).json({
            message: "Failed to retrieve data",
            error: error.message
        });
    });
});




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
db.sync().then(() => { ensureAdminUser() }).then(() => {

    app.listen(3000);
}).catch((err) => {
    console.log("the server could not start!");
})
