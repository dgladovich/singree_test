const express = require('express');
const router = express.Router();
const db = require('../models');
const { blog } = db;

router
    .get('/count', (req, res)=>{
        blog
            .count()
            .then((count)=>{
                let cnt = {
                    count: count
                }
                res.json(cnt)
            })
            .catch((e)=>{
                res.status(500).send({error: 'Error while counting blogs'})
            })
     })
    .get('/', (req, res) => {
        blog
            .findAll({})
            .then((blogs)=>{
                res.json(blogs)
            })
            .catch((e)=>{})

    })
    .get('/:id', (req, res)=>{
        let id = req.params.id;
        blog
            .findOne({where: {__id: id}})
            .then((blg)=>{
                res.json(blg);
            })
            .catch((e)=>{})
    })
    .post('/', (req, res)=>{
        console.log(req.query);

        //blog.create()
    })
    .put('/:id', (req, res)=>{})
    .delete('/:id', (req, res)=>{})



module.exports = router;
