const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database("./todo.db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");

app.get("/", (req, res) => {
  let todolist = [];
  db.each(
    "SELECT name FROM todos",
    (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(row);
        todolist.push(row.name);
      }
    },
    (err) => {
      return res.render("index", {
        title: "Hey",
        message: "Hello there!",
        todolist: todolist,
      });
    }
  );
});

app.post("/", (req, res) => {
  console.log(req.body);
  let todo = req.body.todo;
  db.run("INSERT INTO todos(name) VALUES(?)", todo);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`CS50 app listening on port ${port}`);
});
