const express = require("express");
const { Router } = require("express");
const { userRouter } = require("./user");

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);


module.exports = {
    mainRouter: mainRouter
}