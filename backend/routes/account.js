const express = require("express");
const { Router } = require("express");
const accountModel = require('../schema/db');
const {authMiddleware} = require('../middlewares/middleware');
const accountRouter = Router();
const mongoose = require("mongoose");

accountRouter.use(express.json());

accountRouter.get("/balance", authMiddleware, async function (req, res) {
    const account = await accountModel.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
})

accountRouter.post("/transfer", authMiddleware, async function (req, res) {
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const {to , amount} = req.body;

    const account = await accountModel.find({
        userId: req.userId
    })
    .session(session);

    if(!account || account.balance < amount){
        res.status(400).json({
            message: "Insufficient balance"
        })
    }
    
    const toAccount = await accountModel.findOne({
        userId: to
    })
    .session(session);

    if(!toAccount){
        res.status(400).json({
            message: "Invalid Account"
        })
    }

    await accountModel.updateOne({userId: req.userId} , {$inc: {balance: -amount}}).session(session);
    await accountModel.updateOne({userId: to} , {$inc : {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})