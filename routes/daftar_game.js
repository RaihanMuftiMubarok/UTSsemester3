const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult } = require('express-validator');
//import database
const connection = require('../config/db');

//fungsi read
router.get('/', function (req, res){
    connection.query('SELECT  a.nama_game as game, b.nama_developer as developer,c.nama_publisher as publisher,d.nama_platform as platform,e.skor_rating as rating,f.nama_admin as upload_by FROM daftar_game k JOIN game a ON a.id_game = k.id_game JOIN developer b ON b.id_developer = k.id_developer JOIN publisher c ON c.id_publisher = k.id_publisher JOIN platform d ON d.id_platform = k.id_platform JOIN rating e ON e.id_rating = k.id_rating JOIN admin f ON f.id_admin = k.id_admin ORDER BY k.id_daftar DESC;', function(err, rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data Daftar Game',
                data: rows
            })
        }
    })
});

//fungsi create
router.post('/insert', [
    body('id_game').notEmpty(),
    body('id_developer').notEmpty(),
    body('id_publisher').notEmpty(),
    body('id_platform').notEmpty(),
    body('id_rating').notEmpty(),
    body('id_admin').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        id_game: req.body.id_game,
        id_developer: req.body.id_developer,
        id_publisher: req.body.id_publisher,
        id_platform: req.body.id_platform,
        id_rating: req.body.id_rating,
        id_admin: req.body.id_admin,
    }
    connection.query('insert into daftar_game set ?', Data, function(err, rows){
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
    connection.query(`SELECT  a.nama_game as game, b.nama_developer as developer,c.nama_publisher as publisher,d.nama_platform as platform,e.skor_rating as rating,f.nama_admin as upload_by FROM daftar_game k JOIN game a ON a.id_game = k.id_game JOIN developer b ON b.id_developer = k.id_developer JOIN publisher c ON c.id_publisher = k.id_publisher JOIN platform d ON d.id_platform = k.id_platform JOIN rating e ON e.id_rating = k.id_rating JOIN admin f ON f.id_admin = k.id_admin where id_daftar = ${id}`, function (err, rows){
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
                message: 'Data Daftar Game',
                data: rows[0]
            })
        }
    })
})

//fungsi update
router.patch('/update/:id', [
    body('id_game').notEmpty(),
    body('id_developer').notEmpty(),
    body('id_publisher').notEmpty(),
    body('id_platform').notEmpty(),
    body('id_rating').notEmpty(),
    body('id_admin').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        id_game: req.body.id_game,
        id_developer: req.body.id_developer,
        id_publisher: req.body.id_publisher,
        id_platform: req.body.id_platform,
        id_rating: req.body.id_rating,
        id_admin: req.body.id_admin,
    }
    connection.query(`update daftar_game set ? where id_daftar = ${id}`, Data, function (err, rows){
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
    connection.query(`delete from daftar_game where id_daftar = ${id}`, function (err, rows){
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