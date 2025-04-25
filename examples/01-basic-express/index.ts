import express, { json } from "express";
import { v4 } from "uuid";

const app = express();
app.use(json());
app.use((req, res, next) => {
  console.log(
    "Request received at",
    new Date(),
    req.path,
    req.params,
    req.body
  );
  next();
});
type Task = {
  id: string;
  title: string;
  description?: string;
};

const tasks: Task[] = [
  { id: "1", title: "Task 1", description: "" },
  { id: "2", title: "Task 2", description: "" },
  { id: "3", title: "Task Hans", description: "" },
];

app.get("/task/:id", (req, res, next) => {
  const task = tasks.find((record) => record.id === req.params.id);
  if (!task) {
    res.status(500).json(null);
    return;
  }
  res.status(200).json(task);
});

app.get("/task", (req, res, next) => {
  const title = req.query.title;
  let filteredTasks = tasks;
  if (typeof title === "string") {
    filteredTasks = filteredTasks.filter((record) =>
      record.title.includes(title)
    );
  }
  const description = req.query.description;
  if (typeof description === "string") {
    filteredTasks = filteredTasks.filter((record) =>
      record.description?.includes(description)
    );
  }
  res.status(200).json(filteredTasks);
  res.locals.error = "Test Error";
  next();
});

app.post("/task", (req, res, next) => {
  const { title, description } = req.body;
  const newTask: Task = {
    id: v4(),
    title,
    description,
  };
  tasks.push(newTask);
  res.status(200).json(newTask);
});

app.put("/task/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const record = tasks.find((record) => record.id === id);
  if (!record) {
    res.status(500).json({ message: "Task not found" });
    return;
  }
  record.title = title;
  record.description = description;
  res.status(200).json(record);
});

app.delete("/task/:id", (req, res, next) => {
  const { id } = req.params;
  const index = tasks.findIndex((record) => record.id === id);
  if (index === -1) {
    res.status(500).json({ message: "Task not found" });
    return;
  }
  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("App started at port 3000");
});
