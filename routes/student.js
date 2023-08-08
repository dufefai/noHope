var express = require('express');
const StudentModel = require('../models/StudentModel');
var router = express.Router();

router.get('/', async(req, res) =>{
    var student = await StudentModel.find();
    res.render('student/studentList', {students : student});
});

router.get('/delete/:id', async(req, res) =>{
    var id = req.params.id;
    await StudentModel.findByIdAndDelete(id)
    .then(()=> console.log("ok"))
    .catch((err) => console.log(err));
    res.redirect('/student');
});

router.get('/add', async (req, res) =>{
    res.render('student/studentAdd');
});

router.post('/add', async (req, res) =>{
    var student = req.body;
    await StudentModel.create(student)
    .then(()=> console.log("ok"))
    .catch((err) => console.log(err));
    res.redirect('/student');
});

router.get('/edit/:id', async (req, res) =>{
    var id = req.params.id;
    var student = await StudentModel.findById(id);
    res.render('student/studentEdit', {students : student});
});

router.post('/edit/:id', async (req, res) =>{
    var id = req.params.id;
    var student = req.body;
    await StudentModel.findByIdAndUpdate(id, student)
    .then(()=> console.log("ok"))
    .catch((err) => console.log(err));
    res.redirect('/student');
});
module.exports = router;