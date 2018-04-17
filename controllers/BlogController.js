const db = require('../models');
const {blog} = db;

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
            .findOne({paranoid: false, where: {id: id}, attributes: {exclude: ['deletedAt']}})
            .then((blg) => {
                res.json(blg);
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while reading blog by ID.'})
            })
    },
    createBlog(req, res) {
        let blogBody = req.body;

        blog
            .create(blogBody, {attributes: {exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt']}})
            .then((blg) => {
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
            .update(updateFields, {where: {id: blogId}, paranoid: false, returning: true})
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

        blog
            .destroy({where: {id: blogId}, individualHooks: true})
            .then((blg) => {
                if (!blg) {
                    res.status(404)
                } else {
                    blog
                        .findOne({where: {id: blogId}, paranoid: false})
                        .then((b) => {
                            res.json(b);
                        })
                        .catch((e) => {
                            resr
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