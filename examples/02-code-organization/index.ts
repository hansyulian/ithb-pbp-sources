import express, { json } from "express";
import { v4 } from "uuid";
import { taskRouter } from "./routes/taskRoutes";

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
app.use("/task", taskRouter);
app.listen(3000, () => {
  console.log("App started at port 3000");
});
