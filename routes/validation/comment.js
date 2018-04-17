const Joi = require('joi');

module.exports = {
    countComments: {
        query: {
            where: Joi.object().keys().optional()
        }
    },
    getAllComments: {
        query: {
            where: Joi.object().keys().optional(),
            limit: Joi.number(),
            offset: Joi.number(),
            order: Joi.string()
        }
    },
    createComment: {
        body: {
            author: Joi.string().required(),
            articleId: Joi.string().required(),
            text: Joi.string().required()
        }
    },
    getCommentById: {
        params: {
            id: Joi.string().required()
        }
    },
    updateCommentById: {
        params: {
            id: Joi.string().required()
        }
    },
    deleteCommentById: {
        params: {
            id: Joi.string().required()
        }
    }
};