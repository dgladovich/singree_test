const db = require('../models');
const {comment} = db;

module.exports = {
    countComments(req, res) {
        let query = req.query;
        let where = query.where ? query.where : {};

        comment
            .count({where: where})
            .then((count) => {
                let cnt = {
                    count: count
                };
                res.json(cnt)
            })
            .catch((e) => {
                res.status(500).send({error: 'Error while counting comments'})
            })
    },
    getAllComments(req, res) {
        let query = req.query;
        let defaults = {
            limit: 10,
            offset: 0
        };
        let where = query.where ? query.where : {};
        let limit = query.limit ? query.limit : defaults.limit;
        let offset = query.offset ? query.offset : defaults.offset;
        let order = query.order ? JSON.parse(query.order) : [];

        comment
            .findAll({
                where: where,
                limit: limit,
                offset: offset,
                order: order,
                attributes: {
                    exclude: ['updatedAt', 'deletedAt']
                }
            })
            .then((comments) => {
                res.json(comments)
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while reading comments from database.'})
            })
    },
    getCommentById(req, res) {
        let id = req.params.id;
        comment
            .findOne({where: {_id: id}, attributes: {exclude: ['deletedAt']}})
            .then((cmnt) => {
                if (cmnt == null) {
                    res.status(404).send('404 page');
                } else {
                    res.json(cmnt);
                }
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while reading comment by ID.'})
            })
    },
    createComment(req, res) {
        let commentBody = req.body;

        comment
            .create(commentBody, {attributes: {exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt']}})
            .then((cmnt) => {
                res.json(cmnt);
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while writing comment to database.'})
            })
    },
    updateCommentById(req, res) {
        let updateFields = req.body;
        let commentId = req.params.id;


        comment
            .update(updateFields, {where: {_id: commentId}, paranoid: false, returning: true})
            .then((cmnt) => {
                res.json(cmnt[1][0]);
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({error: 'Error while updating comment in database.'})
            })
    },
    deleteCommentById(req, res) {
        let commentId = req.params.id;

        comment
            .destroy({where: {_id: commentId}, individualHooks: true})
            .then((cmnt) => {
                if (!cmnt) {
                    res.status(404)
                } else {
                    comment
                        .findOne({where: {_id: commentId}, paranoid: false})
                        .then((b) => {
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
                res.status(500).send({error: 'Error while deleting comment from database.'})
            })
    },
}