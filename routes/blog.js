const express = require('express');
const router = express.Router();
const db = require('../models');
const { blog } = db;

router
    .get('/count', (req, res)=>{
        blog
            .count({paranoid: false})
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
            .findAll({paranoid: false, attributes: {exclude: ['deletedAt']}})
            .then((blogs)=>{
                console.log('something go wrong')
                res.json(blogs)
            })
            .catch((e)=>{
                console.error(e);
                res.status(500).send({error: 'Error while reading blogs from database.'})
            })

    })
    .get('/:id', (req, res)=>{
        let id = req.params.id;
        blog
            .findOne({ paranoid: false, where: { id: id }, attributes: {exclude: ['deletedAt']} })
            .then((blg)=>{
                res.json(blg);
            })
            .catch((e)=>{
    console.error(e);
res.status(500).send({error: 'Error while reading blog by ID.'})
})
    })
    .post('/', (req, res)=>{
        console.log(req.body);
        let blogBody = req.body;

        blog
            .create(blogBody)
            .then((blg)=>{
                res.json(blg);
            })
            .catch((e)=>{
                console.error(e);
                res.status(500).send({error: 'Error while writing blog to database.'})
            })
     })
    .put('/:id', (req, res)=>{
        let updateFields = req.body;
        let blogId = req.params.id;


        blog
            .update(updateFields, { where: { id: blogId }, paranoid: false, returning: true })
            .then((blg)=>{
                res.json(blg[1][0]);
            })
            .catch((e)=>{
                console.error(e);
                res.status(500).send({error: 'Error while updating blog in database.'})
                })
    })
    .delete('/:id', (req, res)=>{
        let blogId = req.params.id;

        blog
            .destroy({ where: { id: blogId } })
            .then((blg)=>{
                res.json(blg[1][0]);
            })
            .catch((e)=>{
                console.error(e);
                res.status(500).send({error: 'Error while deleting blog from database.'})
            })
    })



module.exports = router;
