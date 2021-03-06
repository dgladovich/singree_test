const db = require('../models');
const {blog, comment} = db;
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

module.exports = {
    countBlogs(req, res) {
        let query = req.query;
        let where = query.where ? query.where : {};

        blog
            .count({where: where})
            .then((count) => {
                let cnt = {
                    count: count
                };
                res.json(cnt)
            })
            .catch((e) => {
                res.status(500).send({error: 'Error while counting blogs'})
            })
    },
    getAllBlogs(req, res) {
        let query = req.query;
        let defaults = {
            limit: 10,
            offset: 0
        };
        let where = query.where ? query.where : {};
        let limit = query.limit ? query.limit : defaults.limit;
        let offset = query.offset ? query.offset : defaults.offset;
        let order = query.order ? JSON.parse(query.order) : [];

        blog
            .findAll({
                where: where,
                limit: limit,
                offset: offset,
                order: order,
                attributes: {
                    exclude: ['updatedAt', 'deletedAt']
                }
            })
            .then((blogs) => {
                blogs.forEach((blog)=>{console.log(blog)})
                res.json(blogs)
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while reading blogs from database.'})
            })
    },
    getBlogById(req, res) {
        let id = req.params.id;
        blog
            .findOne({ where: {_id: id}, attributes: {exclude: ['deletedAt']}})
            .then((blg) => {
                if (blg == null) {
                    res.status(404).send('404 page');
                } else {
                    blg.body = entities.encode(blg.body);
                    delete blg.body.id;
                    delete blg.body.createdAt;

                    res.json(blg);
                }
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while reading blog by ID.'})
            })
    },
    createBlog(req, res) {
        let blogBody = req.body;

        blog
            .create(blogBody, {attributes: {exclude: ['updatedAt', 'deletedAt']}})
            .then((blg) => {
                blg.body = entities.encode(blg.body);
                delete blg.body.id;
                delete blg.body.createdAt;

                res.json(blg);
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while writing blog to database.'})
            })
    },
    updateBlogById(req, res) {
        let updateFields = req.body;
        let blogId = req.params.id;


        blog
            .update(updateFields, {where: {_id: blogId}, paranoid: false, returning: true})
            .then((blg) => {

                res.json(blg[1][0]);
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while updating blog in database.'})
            })
    },
    deleteBlogById(req, res) {
        let blogId = req.params.id;
        comment.destroy({ where: { articleId: blogId} });
        blog
            .destroy({where: {_id: blogId}, individualHooks: true})
            .then((blg) => {
                if (!blg) {
                    res.status(404)
                } else {
                    blog
                        .findOne({where: {_id: blogId}, paranoid: false})
                        .then((b) => {
                            b.body = entities.encode(blg.body);
                            delete b.body.id;
                            delete b.body.createdAt;

                            res.json(b);
                        })
                        .catch((e) => {
                            res
                                .status(500)
                                .json({message: 'Error while returning'})
                        })
                }
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while deleting blog from database.'})
            })
    },
}