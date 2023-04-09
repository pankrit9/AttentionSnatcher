import express from "express";

const app = express();

/* 
--------- 
DEV ONLY
---------
*/

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "*",
  })
);

/* 
--------- 
DEV END
---------
*/

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Okay running");
});

app.listen(3001, () => {
  console.log(`Server started on port 3001`);
});

export default app;
