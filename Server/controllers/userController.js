const mongoose=require('mongoose');
const userModel = require('../models/UserModel');

module.exports = {
   
    readReservation: async function(req,res){
        await userModel.readReservation(req,res);
    },
    readAllReservations: async function(req,res){
        await userModel.readAllReservations(req,res);
    },
    deleteReservation: async function(req,res){
        await userModel.deleteReservation(req,res);
    },
    updateUserInfo: async function(req,res){
        await userModel.updateUserInfo(req,res);
    },
    updateSensitiveUserInfo: async function(req,res){
        await userModel.updateSensitiveUserInfo(req,res);
    },
    login: async function(req,res){
        await userModel.login(req,res);
    },
    viewSummary: async function(req,res){
        await userModel.viewSummary(req,res);
    },
    createUser: async function(req,res){
        await userModel.createUser(req,res);
    },

   
    
}