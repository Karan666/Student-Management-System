const express = require("express"); //imports Express framework.
const app = express(); //creates instance for Express application. we use this app object to define routes, middleware, and start the server.
const storage = require("node-persist"); //imports the node-persist module, which provides a simple and persistent key-value storage solution.
const bodyParser = require("body-parser"); //imports the body-parser module, which is a middleware that parses the request body and makes it available in req.body for easier handling of POST requests.

storage.init(); //initializes the storage module

const jsonParser = bodyParser.json(); //creates a middleware function that will parse the JSON payload of incoming requests

//Express route handler for a POST request to the /student endpoint
app.post("/student", jsonParser, async (req, res) => {
    const studentsData = req.body;
    await storage.setItem("studentsData", studentsData);
    res.send("Added students!");
});

//Express route handler for a GET request to the /allStudents endpoint
app.get("/allStudents", async(req,res) => {
    const studentsData = await storage.getItem("studentsData");

    if(studentsData){
        let responseHTML = `
        <!DOCTYPE html>
        <html lang="en" data-bs-theme="dark">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
            <title>All Students Data</title>
        </head>
        <body class="bg-dark">
            <div class="container mt-5">
                <h1 class="mb-5 text-center">All Students Data</h1>
        `;

        Object.values(studentsData).forEach((student) => {
            const { student_id, student_name, student_gpa } = student;
            responseHTML += `
            <div class="card mb-3 shadow">
                <div class="card-body">
                    <h5 class="card-title">Student ID: ${student_id}</h5>
                    <p class="card-text">Name: ${student_name}</p>
                    <p class="card-text">GPA: ${student_gpa}</p>
                </div>
            </div>
          `;
        });

        responseHTML += `</div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
        </body>
        </html>
        `;
        res.send(responseHTML);
    }
    else{
        res.send("No students found");
    }
});

// Express route handler for a GET request to the /student/:id endpoint
app.get("/student/:id", async (req, res) => {
    const studentsData = await storage.getItem("studentsData");
    const studentId = req.params.id;
  
    let studentIdMatch = null;
  
    Object.keys(studentsData).forEach((key) => {
      if (studentsData[key].student_id === studentId) {
        studentIdMatch = key;
        return;
      }
    });
  
    if (studentIdMatch) {
      const student = studentsData[studentIdMatch];
      const { student_id, student_name, student_gpa } = student;
  
      res.send(`
      <!DOCTYPE html>
        <html lang="en" data-bs-theme="dark">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
            <title>Specific student ID</title>
        </head>
      <body class="bg-dark">
      <div class="container mt-5">
      <div class="card mb-3 shadow mt-3">
      <div class="card-body">
          <h5 class="card-title">Student ID: ${student_id}</h5>
          <p class="card-text">Name: ${student_name}</p>
          <p class="card-text">GPA: ${student_gpa}</p>
      </div>
      </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
        </body>
        </html>
      `);
    } 
    else {
      res.send("Student not found");
    }
});

//Express route handler for a GET request to the /topper endpoint
app.get("/topper", async (req, res) => {
    const studentsData = await storage.getItem("studentsData");
  
    if (studentsData) {
      let topper = null;
      let maxGPA = null;
  
      studentsData.forEach((student) => {
        const studentGPA = parseFloat(student.student_gpa);
        if (studentGPA >= maxGPA) {
          maxGPA = studentGPA;
          topper = student;
        }
      });
  
      if (topper) {
        const { student_id, student_name, student_gpa } = topper;
        res.send(`
        <!DOCTYPE html>
        <html lang="en" data-bs-theme="dark">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
            <title>Topper</title>
        </head>
      <body class="bg-dark">
        <div class="container mt-5">
        <div class="card shadow">
        <div class="card-body">
            <h5 class="card-title">Student ID: ${student_id}</h5>
            <p class="card-text">Name: ${student_name}</p>
            <p class="card-text">GPA: ${student_gpa}</p>
        </div>
        </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
        </body>
        </html>
        `);
      } 
      else {
        res.send("No topper found");
      }
    }
});
  
//To start the Express application and make it listen for incoming HTTP requests on a specific port
app.listen(5000, function(){
    console.log("server has started on port 5000");
});

