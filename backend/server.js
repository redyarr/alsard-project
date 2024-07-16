const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const db = require("./util/db");
const cors = require("cors");
const employees = require("./models/employee");
const items = require("./models/item");
const EmployeeItem = require("./models/employeeItem");
const users = require("./models/users");
//relation between employee and item
const jwt = require("jsonwebtoken");
const cron = require("node-cron");
const { Op } = require('sequelize');

const { exec } = require('child_process');
const path = require('path');

const fileName = `backup-${new Date().toISOString().split('T')[0]}.sql`;
const filePath = path.join(__dirname, 'backups', fileName);



function backupDatabase() {
  // Define the filename for the backup
  const fileName = `backup-${new Date().toISOString().split('T')[0]}.sql`;
  const filePath = path.join(__dirname, 'backups', fileName);

  // MySQL dump command
  // const command = `mysqldump -u root -p'12123' alsard-ims > ${filePath}`;

  const mysqldumpPath="C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\MySQL\\MySQL Server 8.0\\bin/mysqldump.exe"
  const command = `"${mysqldumpPath}" -u root -p"12123Redyar" alsard-ims > "${filePath}"`; 
  //it was the double quotations of the password that made the errors
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup error: ${error}`);
      return;
    }
    console.log(`Backup created: ${fileName}`);
  });
}


employees.belongsToMany(items, {
  through: EmployeeItem,
  foreignKey: "employeeId",
});
items.belongsToMany(employees, { through: EmployeeItem, foreignKey: "itemId" });

app.use(cors());

app.use(bodyParser.json());

async function ensureAdminUser() {
  users.findOne({ where: { name: "admin", password: "123" } }).then((user) => {
    if (!user) {
      users
        .create({
          name: "admin",
          password: "123",
          role: "admin",
        })
        .then((result) => {
          console.log("admin created");
        })
        .catch((error) => {
          console.log("admin not created");
        });
    }
  });
}

EmployeeItem.belongsTo(employees, { foreignKey: "employeeId" });
EmployeeItem.belongsTo(items, { foreignKey: "itemId" });


// function bo away edit krdnaka bgoret 
async function updateIsEditable(model) {
  const sixHoursAgo = new Date(new Date() - 12 * 60 * 60 * 1000);// 12 sa3at farq inja 
    // const sixHoursAgo = new Date(new Date() - 20 *1000); test krdny , 20 sanya farqy habe itr edit nakre
  await model.update({ isEditable: false }, {
      where: {
          createdAt: {
              [Op.lte]: sixHoursAgo
          },
          isEditable: true 
      }
  });
};




// run krdny updateIsEditable function
cron.schedule('0 * * * *', async () => {
  await updateIsEditable(employees);
  await updateIsEditable(items);
  console.log('Updated isEditable for Employee and Item models');
});


app.get("/backup", (req, res) => {
  backupDatabase();

  res.send("Backup process started");
  // res.status(200).json({ message: 'Backup process started' });

});



// Endpoint to fetch all reserved items with employee and item details
app.get("/employeeItems", (req, res) => {
  EmployeeItem.findAll({
    include: [
      {
        model: employees,
        attributes: ["name", "email", "phone"],
      },
      {
        model: items,
        attributes: ["name", "description"],
      },
    ],
  })
    .then((employeeItems) => {
      res.status(200).json(employeeItems);
    })
    .catch((error) => {
      console.error("Error fetching employee items:", error.message);
      res.status(500).json({
        message: "Failed to retrieve employee items",
        error: error.message,
      });
    });
});

app.post("/additems", (req, res, next) => {
  items.findOne({ where: { tagId: req.body.tagId } }).then((item) => {
    if (item) {
      return res.status(409).json({
        message: "Item already exists",
      });
    }

    return items
      .create({
        Name: req.body.Name,
        Description: req.body.Description,
        Category: req.body.Category,
        model: req.body.model,
        tagId: req.body.tagId,
        company: req.body.company,
        subLocation: req.body.subLocation,
        reserved: req.body.reserved,
      })
      .then((result) => {
        return res.status(200).json({
          message: "Item created successfully",
          item: result,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Failed to create item",
          error: error.message,
        });
      });
  });
});

app.get("/items", (req, res, next) => {
  items
    .findAll()
    .then((items) => {
      return res.status(200).json({
        message: "Items fetched successfully",
        items: items,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Failed to fetch items",
        error: error.message,
      });
    });
});

// to get the items that are  NOT reserved

app.get("/unreservedItems", (req, res, next) => {
  items
    .findAll({ where: { reserved: "no" } })
    .then((items) => {
      return res.status(200).json({
        message: "Items that are not reserved fetched successfully",
        items: items,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Failed to unreserved fetch items",
        error: error.message,
      });
    });
});

app.delete("/deleteItem/:id", (req, res) => {
  const itemId = req.params.id;
  items
    .destroy({
      where: { Id: itemId },
    })
    .then(() => {
      return res.status(200).json({
        message: "Item deleted successfully",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Failed to delete item",
        error: error.message,
      });
    });
});

app.post("/addEmployee", (req, res, next) => {
  employees
    .findOne({ where: { employeeId: req.body.UserID } })
    .then((employee) => {
      if (employee) {
        return res.status(409).json({
          message: "Employee already exists",
        });
      }

      employees
        .create({
          Name: req.body.name,
          Email: req.body.email,
          Phone: req.body.phone,
          employeeId: req.body.UserID,
          Position: req.body.position,
          department: req.body.department,
        })
        .then((result) => {
          return res.status(201).json({
            message: "Employee created successfully",
            employee: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Failed to create employee",
            error: error.message,
          });
        });
    });
});

app.delete("/deleteEmployee/:id", async (req, res, next) => {
  const employeeId = req.params.id;

  try {
    // Find all reserved items for the employee
    const reservedItems = await EmployeeItem.findAll({
      where: { employeeId: employeeId },
    });

    // Get all item IDs from the reserved items
    const itemIds = reservedItems.map((item) => item.itemId);

    // Delete the reserved items
    await EmployeeItem.destroy({ where: { employeeId: employeeId } });

    // Update the items table to set 'reserved' to 'no' for the corresponding item IDs
    await items.update({ reserved: "no" }, { where: { Id: itemIds } });

    // Delete the employee
    await employees.destroy({ where: { Id: employeeId } });

    return res.status(200).json({
      message: "Employee and associated reserved items deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete employee and associated reserved items",
      error: error.message,
    });
  }
});

app.get("/employees", (req, res, next) => {
  employees
    .findAll()
    .then((employees) => {
      console.log(employees);
      return res.status(200).json({
        message: "Employees fetched successfully",
        employees: employees,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Failed to fetch employees",
        error: error.message,
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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic
  const user = users.findOne({ where: { name: username, password: password } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, "your_secret_key", {
    expiresIn: "1h",
  });

  return res.json({ username: user.username, token });
});

// to edit an employee
app.put('/editEmployee/:id', (req, res) => {
  const employeeId = req.params.id;

  employees
    .update(
      {
        Name: req.body.name,
        Email: req.body.email,
        Phone: req.body.phone,
        Position: req.body.position,
        department: req.body.department,
        updatedAt: new Date(),
      },
      { where: { Id: employeeId } }
    )
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return employees.findByPk(employeeId);
    })
    .then((updatedEmployee) => {
      res.status(200).json(updatedEmployee);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to update employee",
        error: error.message,
      });
    });
});




// to edit an item
// Example using Sequelize for database operations
app.put("/editItem/:id", async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const updatedItem = await items.update(
      {
        Name: req.body.name,
        Description: req.body.description,
        Category: req.body.category,
        model: req.body.model,
        tagId: req.body.tagId,
        company: req.body.company,
        subLocation: req.body.subLocation,
        reserved: req.body.reserved,
        updatedAt: new Date(),
      },
      { where: { Id: itemId } }
    );

    if (updatedItem[0] === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updatedRecord = await items.findByPk(itemId);

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ message: "Failed to update item", error: error.message });
  }
});



//run krdny updateIsEditable function




// to delete an item
app.delete("/deleteItem/:id", (req, res, next) => {
  const itemId = req.params.id;

  items
    .destroy({
      where: { Id: itemId },
    })
    .then(() => {
      return res.status(200).json({
        message: "Item deleted successfully",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Failed to delete item",
        error: error.message,
      });
    });
});

// RESERVING AN ITEM FOR AN EMPLOYEE :

app.post("/ReserveItem", (req, res, next) => {
  const employeeId = req.body.employeeId;
  const itemId = req.body.itemId;

  console.log(
    `Received request to reserve item: employeeId=${employeeId}, itemId=${itemId}`
  );

  EmployeeItem.create({
    employeeId: employeeId,
    itemId: itemId,
  })
    .then((result) => {
      return items.update(
        {
          reserved: "yes",
        },
        {
          where: { Id: itemId },
        }
      );
    })
    .then((updateResult) => {
      console.log(`Item with id=${itemId} successfully updated to reserved`);
      return res.status(201).json({
        message: "Employee item created successfully",
      });
    })
    .catch((error) => {
      console.error("Error creating employee item:", error.message);
      return res.status(500).json({
        message: "Failed to create employee item",
        error: error.message,
      });
    });
});

app.delete("/deleteReservedItem/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    // Find the reserved item to get the itemId
    const reservedItem = await EmployeeItem.findOne({ where: { id: id } });
    if (!reservedItem) {
      return res.status(404).json({ message: "Reserved item not found" });
    }

    // Delete the reserved item
    await EmployeeItem.destroy({ where: { id: id } });

    // Update the corresponding item to set 'reserved' to 'no'
    await items.update(
      { reserved: "no" },
      { where: { Id: reservedItem.itemId } }
    );

    res.status(200).json({ message: "Reserved item deleted successfully" });
  } catch (error) {
    console.error("Error deleting reserved item:", error.message);
    res
      .status(500)
      .json({
        message: "Failed to delete reserved item",
        error: error.message,
      });
  }
});

// to show the items that an employee is using

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
db.sync()
  .then(() => {
    ensureAdminUser();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("the server could not start!");
  });

// Authors: Redyar Hawzhin rauf ,  Rekar Jamal Najm.
// Date: 2024-7-7
// Description: This is a simple inventory management system that allows you to add employees, items, and reserve items for employees.
//              It also allows you to view all employees and items, and view the items that an employee is using.
//              It also allows you to delete items and employees, and update items and employees.
//              It also allows you to search for an employee and view all the items that he is using.
