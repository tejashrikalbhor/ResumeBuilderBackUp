const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const sequelize = require('sequelize');
const Op = require('sequelize').Op
const db = require('../../../models/index');

const env = process.env.NODE_ENV || 'development';

const user = db['user'];
const userDetails = db['userDetails'];
const role = db['role'];
const resume = db['resume'];
const position = db['position'];

const routes = express.Router();

//signUp for user
routes.post('/signUp', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.roleId || !req.body.position) {
            return res.status(400).json({ Error: "Please Enter the data in required format." });
        }
        else {
            const userData = await user.create({ "email": req.body.email, "password": req.body.password, "roleId": req.body.roleId, "position": req.body.position, "createdOn": new Date(), "updatedOn": new Date() });
            if (userData) {
                const userDetail = await userDetails.create({ "firstName": req.body.firstName, "lastName": req.body.lastName, "contact": req.body.contact, "userId": userData.id, "createdOn": Date.now(), "updatedOn": Date.now() });
                //    const user = userData.concat(userDetail);
                return res.status(200).json({ Message: "User Details created sucessfully.", userData: userData, userDetail: userDetail });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
//login for user
routes.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({ Error: "Invalid Respones.Please Enter the Email and Password." });
        }
        else {
            const checkUser = await user.findOne({
                where: {
                    [Op.and]: [
                        {
                            where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower', req.body.email))
                        },
                        {
                            password: req.body.password
                        }]
                },
            })
            if (checkUser) {
                return res.status(200).json({ Message: "You have sucessfully login.", DetailsOfUser: checkUser });
            }
            else {
                return res.status(401).json({ Error: "Invalid Email or Password." });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
//CURD operation on Resume 
routes.get('/getDetailsOfResume/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getDetailsOfResume = await resume.findOne({attributes: ['id','resumeDetails','comments','userId'],where:{id:id}});
        if (!getDetailsOfResume) {
            return res.status(404).json({ Error: `Resume with id = ${id} does not exists.` });
        }
        else {
            return res.status(200).json({ ResumeDetails: getDetailsOfResume });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }

});
routes.post('/addDetailsToResume', async (req, res) => {
    try {
        if (!req.body.resumeDetails || !req.body.comments || !req.body.userId) {
            return res.status(400).json({ Error: "Please Enter the data in required format." });
        }
        else {
            const addDetailsToResume = await resume.create({ "resumeDetails": req.body.resumeDetails, "comments": req.body.comments, "userId": req.body.userId, "createdOn": new Date(), "updatedOn": new Date() });
            return res.status(200).json({ Message: "Resume Details created sucessfully.", DetailsOfResume: addDetailsToResume });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
routes.put('/updateDetailsOfResume/:id', async (req, res) => {
    try {
        const updateDetailsToResume = await resume.update(req.body, { where: { id: req.params.id } });
        const updatedResumeDetails = await resume.findOne({ where: { id: req.params.id } });
        if (!updatedResumeDetails) {
            return res.status(404).send({ Error: "Resume with this id does not exists." });
        }
        else {
            return res.status(200).json({ Message: "Resume Details updated sucessfully.", DetailsOfResume: updatedResumeDetails });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
routes.delete('/deleteDetailsOfResume/:id', async (req, res) => {
    try {
        const deleteDetailsOfResume = await resume.destroy({ where: { id: req.params.id } });
        if (!deleteDetailsOfResume) {
            return res.status(404).send({ Error: "Resume with this id does not exists." });
        }
        else {
            return res.status(200).json({ Message: "Resume Details deleted sucessfully." });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
//resumeId Exist or not.
routes.post('/resumeIdExist', async (req, res) => {
    try {
        const id = req.body.id;
        const resumeIdExist = await resume.findOne({ where: { id: id } });
        if (!resumeIdExist) {
            return res.status(200).json({ Message: "New id." });
        }
        else {
            return res.status(302).json({ Message: "Id Exist!", roleDetails: resumeIdExist });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
//CURD operation Position
routes.get('/getPositionDetails/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const getPositionDetails = await position.findOne( {attributes: ['id','name','createdBy','updatedBy'],where:{id:id}});
        if(!id){
            return res.status(404).json({Error:'Position Details with id = ${id} does not exists'});
        }
        else{
            return res.status(200).json({PositionDetails:getPositionDetails});
        }
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
});
routes.post('/addPositionDetails',async(req,res)=>{
    try{
        if(!req.body.name || !req.body.createdBy || !req.body.updatedBy){
            return res.status(404).json({Error:"Please Enter the correct details."});
        }
        else{
            const addPositionDetails = await position.create({"name":req.body.name,"createdBy":req.body.createdBy,"updatedBy":req.body.updatedBy,"createdOn": new Date(), "updatedOn": new Date()});
            return res.status(200).json({Message:"Position Details added sucessfully.",PositionDetails:addPositionDetails});
        }
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
});
routes.put('/updatePositionDetails/:id',async(req,res)=>{
    try{
        const updatePosition = await position.update(req.body, { where: { id: req.params.id } });
        const updatedPositionDetails = await position.findOne({ where: { id: req.params.id } });
        if (!updatedPositionDetails) {
            return res.status(404).send({ Error: "Position Details with this id does not exists." });
        }
        else {
            return res.status(200).json({ Message: "Position Details updated sucessfully.", DetailsOfPosition: updatedPositionDetails });
        }
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
});
routes.delete('/deletePositionDetails/:id',async(req,res)=>{
    try{
        const deletePositionDetails = await position.destroy({where:{id:req.params.id}});
        if(!deletePositionDetails){
            return res.status(404).send({ Error: "Position Details with this id does not exists." });
        }
        else {
            return res.status(200).json({ Message: "Position Details deleted sucessfully." });
        }
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
});
//PositionId Exist or not.
routes.post('/positionIdExist', async (req, res) => {
    try {
        const id = req.body.id;
        const positionIdExist = await resume.findOne({ where: { id: id } });
        if (!positionIdExist) {
            return res.status(200).json({ Message: "New id." });
        }
        else {
            return res.status(302).json({ Message: "Id Exist!", roleDetails: positionIdExist });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});

//get User details
routes.get('/getUserInfo/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const getUserInfo = await user.findOne({attributes:['id','email','password'],where:{id:id}});
        if(!getUserInfo){
            return res.status(404).json({Error:"User with this id does not exist."});
        }
        else{
            return res.status(200).json({UserInformation:getUserInfo});
        }
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
});
//isUserExist
routes.post('/isUserExist', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ Error: "Invalid Response.Please enter the correct details." });
        }
        else {
            const isUserExist = await user.findOne({where:{[Op.and]:[{ where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower', req.body.email))},{password: req.body.password}]},});
            if (!isUserExist) {
                return res.status(200).json({ Message: "New User." });
            }
            else {
                return res.status(302).json({ Message: "User Exists!", userDetails: isUserExist })
            }
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
// get UserDetails 
routes.get('/getUserDetails/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getUserDetails = await userDetails.findOne({ attributes: ['id', 'firstName', 'lastName', 'contact'], where: { id: id } });
        if (!getUserDetails) {
            return res.status(404).json({ Error: "UserDetails with this id does not exist." });
        }
        else {
            return res.status(200).json({ UserInformation: getUserDetails });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
//isUserNameExist
routes.post('/isUserNameExist', async (req, res) => {
    try {
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(400).json({ Error: "Invalid Response.Please enter the correct details." });
        }
        else {
            const isUserNameExist = await userDetails.findOne({where:{[Op.and]:[{ where: sequelize.where(sequelize.fn('lower', sequelize.col('firstName')), sequelize.fn('lower', req.body.firstName))},sequelize.where(sequelize.fn('lower', sequelize.col('lastName')), sequelize.fn('lower', req.body.lastName))]}});
            if (!isUserNameExist) {
                return res.status(200).json({ Message: "New User." });
            }
            else {
                return res.status(302).json({ Message: "User Exists!", userDetails: isUserNameExist })
            }
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
//get Role details
routes.get('/getRoleDetails/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const getRoleDetails = await role.findOne({attributes:['id','roleName'],where:{id:id}});
        if(!getRoleDetails){
            return res.status(404).json({Error:"Role Details with this id does not exist."});
        }
        else{
            return res.status(200).json({UserInformation:getRoleDetails});
        }
    }
    catch(err){
        return res.status(500).json({Error:err.message});
    }
});
//RoleId Exist or not
routes.post('/roleIdExist', async (req, res) => {
    try {
        const id = req.body.id;
        const roleIdExist = await role.findOne({ where: { id: id } });
        if (!roleIdExist) {
            return res.status(200).json({ Message: "New id." });
        }
        else {
            return res.status(302).json({ Message: "Id Exist!", roleDetails: roleIdExist });
        }
    }
    catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});
module.exports = { routes };