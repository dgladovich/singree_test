const Joi = require('joi');

module.exports = {
    countBlogs: {
      query: {
          where: Joi.object().keys().optional()
      }
    },
    getAllBlogs: {
        query: {
            where: Joi.object().keys().optional(),
            limit: Joi.number(),
            offset: Joi.number(),
            order: Joi.string()
        }
    },
    createBlog: {
        body: {
            title: Joi.string().required(),
            status: Joi.string().required(),
            metaTitle: Joi.string().required(),
            metaDescription: Joi.string().required(),
            metaKeywords: Joi.string().required(),
            body: Joi.string().required()
        }
    },
    getBlogById: {
        params: {
            id: Joi.string().required()
        }
    },
    updateBlogById: {
        params: {
            id: Joi.string().required()
        },
        body: {
            title: Joi.string().required(),
            status: Joi.string().required(),
            metaTitle: Joi.string().required(),
            metaDescription: Joi.string().required(),
            metaKeywords: Joi.string().required(),
            body: Joi.string().required()
        }
    },
    deleteBlogById: {
        params: {
            id: Joi.string().required()
        }
    }
};