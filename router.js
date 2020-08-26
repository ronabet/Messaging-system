const userRouter = require("./routers/userRouter");
const messageRouter = require("./routers/messageRouter");
const express = require("express");
const { route } = require("./routers/messageRouter");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "Welcome for messaging service server! " + '\n' + "Documentation: https://documenter.getpostman.com/view/8307699/TVCZaBN3");
});
router.use("/api/users", userRouter);
router.use("/api/messages", messageRouter);
router.use("*", (req, res) => {
  res.status(404).send("Invalid Route");
});

module.exports = router;
