const express = require("express");
const { Router } = require("express");
const {Account} = require('../schema/db');
const {authMiddleware} = require('../middlewares/middleware');
const accountRouter = Router();
const mongoose = require("mongoose");

accountRouter.use(express.json());

accountRouter.get("/balance", authMiddleware, async function (req, res) {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.json({
        balance: account.balance
    })
})

accountRouter.post("/transfer", authMiddleware, async function (req, res) {  //authMiddleware se userId li hamne
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const {to , amount} = req.body;

    const account = await Account.findOne({
        userId: req.userId
    })
    .session(session);

    if(!account || account.balance < amount){
        res.status(400).json({
            message: "Insufficient balance"
        })
    }
    
    const toAccount = await Account.findOne({
        userId: to
    })
    .session(session);

    if(!toAccount){
        res.status(400).json({
            message: "Invalid Account"
        })
    }

    await Account.updateOne({userId: req.userId} , {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to} , {$inc : {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = {accountRouter:accountRouter};