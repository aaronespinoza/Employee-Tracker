const mysql = require("mysql2")
const inquirer = require("inquirer");
require("console.table");
require("dotenv").config()
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function viewDeparment() {
  db.query("select * from department", (err, data) => {
      if (err) throw (err)
      console.table(data);
      startMenu();
  });
}

function viewRoles() {
  db.query("select * from role", (err, data) => {
      if (err) throw (err)
      console.table(data);
      startMenu();
  });
}

function startMenu() {
  inquirer
      .prompt([{
          type: "list",
          name: "menu",
          message: "What would you like to do?",
          choices: [
              "View all departments",
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee role",
          ],
      }, ])
      .then((answers) => {
          if (answers.menu === "View all departments") {
              console.log("departments")
              viewDeparment();
          } else if (answers.menu === "View all roles") {
              console.log("roles")
              viewRoles();
          } else if (answers.menu === "View all employees") {
              viewEmployees();
          } else if (answers.menu === "Add a department") {
              addDepartment();
          } else if (answers.menu === "Add a role") {
              addRole();
          } else if (answers.menu === "Add an employee") {
              addEmployee();
          } else {
              updateEmployee();
          }
      });
}

function viewRoles() {
  db.query("select * from role", (err, data) => {
      if (err) throw (err)
      console.table(data);
      startMenu();
  });
}

function viewEmployees() {
  db.query("select * from employee", (err, data) => {
      if (err) throw (err)
      console.table(data);
      startMenu();
  });
}

function addDepartment() {
  inquirer
      .prompt([{
          type: "input",
          name: "departmentName",
          message: "Select new department?",
      }, ])
      .then((answer) => {
          db.query(
              "insert into department (name) values (?)", [answer.departmentName],
              (err, data) => {
                  console.log("You succesfully added a new department!");
                  viewDeparment();
              }
          );
      });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the new role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of this role?",
      },
      {
        type: "input",
        name: "roleDepartmentId",
        message: "What is this role's deparment ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "insert into role (title, salary, department_id) values (?, ?, ?)",
        [answer.roleTitle, answer.roleSalary, answer.roleDepartmentId],
        (err, data) => {
          console.log("Your new role has been added!");
          viewRoles();
        }
      );
    });
}

// Read all roles
app.get('/api/role', (req, res) => {
    const sql = `SELECT id, title, salary, department_id AS job FROM role`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// Read all employees
app.get('/api/employee', (req, res) => {
    const sql = `SELECT id, first_name, last_name, role_id, manager_id AS team FROM employee`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  // Delete a movie
  app.delete('/api/movie/:id', (req, res) => {
    const sql = `DELETE FROM movies WHERE id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
        message: 'Movie not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });
  
  // Read list of all reviews and associated movie name using LEFT JOIN
  app.get('/api/movie-reviews', (req, res) => {
    const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
  
  // BONUS: Update review name
  app.put('/api/review/:id', (req, res) => {
    const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
    const params = [req.body.review, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Movie not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  