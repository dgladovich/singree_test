const express = require('express');
const router = express.Router();
const db = require('../models');
const { comment } = db;

router
    .get('/count', (req, res)=>{
        let params = {

        }
        comment
                .count({where: params}).then((count)=>{
                    let cnt = {
                        count: count
                    };
                    res.json(cnt);
                })
                .catch((e)=>{});
    })
    .get('/', (req, res) => {
        comment
                .findAll()
                .then((comments)=>{
                    res.json(comments)
                })
                .catch((e)=>{
                    res
                        .status(500)
                        .end()
                })
    })
    .get('/:id', (req, res)=>{
        let id = req.params.id;
        comment
            .findOne({where: {__id: id}})
            .then((comment)=>{
                res.json(comment);
            })
            .catch((e)=>{})
     })
    .post('/', (req, res)=>{
        comment.update()
    })
    .put('/:id', (req, res)=>{})
    .delete('/:id', (req, res)=>{})

module.exports = router;
