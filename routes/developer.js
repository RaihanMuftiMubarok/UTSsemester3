const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult } = require('express-validator');
//import database
const connection = require('../config/db');

//fungsi read
router.get('/', function (req, res){
    connection.query('select * from developer order by id_developer desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data Developer',
                data: rows
            })
        }
    })
});

//fungsi create
router.post('/insert', [
    //validation
    body('nama_developer').notEmpty(),
    body('negara').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_developer: req.body.nama_developer,
        negara: req.body.negara,
    }
    connection.query('insert into developer set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success!',
                data: rows[0]
            })
        }
    })
})

//fungsi read by id
router.get('/(:id)', function (req, res){
    let id = req.params.id;
    connection.query(`select * from developer where id_developer = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Developer',
                data: rows[0]
            })
        }
    })
})

//fungsi update
router.patch('/update/:id', [
    body('nama_developer').notEmpty(),
    body('negara').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_developer: req.body.nama_developer,
        negara: req.body.negara,
    }
    connection.query(`update developer set ? where id_developer = ${id}`, Data, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
})

//fungsi delete
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from developer where id_developer = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been delete !',
            })
        }
    })
})

module.exports = router;