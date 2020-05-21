# Todo List Application - Backend

This is the back-end API of a Todo List Application, built throughout the [Tech Returners](https://techreturners.com) Your Journey Into Tech course. It is consumed by a front end React application, available [here](https://jacanroman.github.io/todo_list_frontend) and connects to an RDS Database.

The hosted version of the application is available here: [https://jacanroman.github.io/todo_list_frontend/](https://jacanroman.github.io/todo_list_frontend/).

### Technology Used

This project uses the following technology:

- Serverless Framework
- JavaScript (ES2015+)
- Express
- SQL
- Mysql library
- AWS Lambda and API Gateway
- AWS RDS
- ESLint

### Endpoints

The API exposes the following endpoints:

---

### Endpoints

The API exposes the following endpoints:

---

##### GET /products

[https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks](https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks)

Responds with JSON containing all tasks in the Database.

---

##### POST /products

[https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks](https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks)

Will create a new product when sent a JSON payload in the format:

```json
{
  	"Description": "Wash the dog",
	"DueDate": "2020-05-05",
	"Completed": false,
	"User_Id": 3
}
```

---

##### DELETE /products/:item_id

[https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks/](https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks/)

Deletes the task of the given ID.

---

##### PUT /products/:item_id

[https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks/](https://b60xl2jgd9.execute-api.eu-west-1.amazonaws.com/dev/tasks/)

Will update a product when sent a JSON payload in the format:

```json
{
  	"Description": "Wash the dog",
	"DueDate": "2020-05-05",
	"Completed": true,
	"User_Id": 3
}
```
