# Student-Management-System-
This is a simple student management system implemented using the Express.js framework. The application allows you to add, view, and retrieve information about students. The data is stored using the node-persist module, and the front-end interface is built using HTML and Bootstrap.


## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- Express.js
- node-persist module
- Bootstrap (CSS and JavaScript)
- Nodemon (optional)


## Data Storage

The application uses the node-persist module to store student data persistently. The data is stored in key-value pairs.

## Getting Started

- Clone the repository or create a new project folder.
- Navigate to the project folder in your terminal.
- Install the required dependencies using the following command:

```bash  
npm install express node-persist body-parser
```

- Start the application using:

```bash
node index.js
```

OR

```bash
nodemon index.js
```

- Open your web browser and access the application at http://localhost:5000.


## Application Features

### Using Postman to Interact with Endpoints

### **Adding Students**

- Open Postman.
- Set the request method to POST.
- Enter the URL: http://localhost:5000/student.
- In the "Body" tab, select the "raw" option and set the content type to "JSON (application/json)".
- Enter student data in JSON format:

```bash
{
  "student_id": "666",
  "student_name": "Lucifer",
  "student_gpa": "10.0"
}
```

- Click on Send button 


### **Viewing All Students**

- Open Postman.
- Set the request method to GET.
- Enter the URL: http://localhost:5000/allStudents.
- Click the "Send" button.

### **Viewing Specific Student**

- Open Postman.
- Set the request method to GET.
- Enter the URL, replacing :id with the actual student ID: http://localhost:5000/student/:id.
- Click the "Send" button.

### **Finding Topper**

- Open Postman.
- Set the request method to GET.
- Enter the URL: http://localhost:5000/topper.
- Click the "Send" button.

**NOTE** : Make sure your Express.js application is running while you're using Postman to interact with the endpoints. You should see the server logs in the terminal indicating that the server has started on port 5000.


## Author

Karan Keshab Shrees


## License

his project is licensed under the MIT License.



