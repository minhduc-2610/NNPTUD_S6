var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category');

/* GET all categories */
router.get('/', async function(req, res, next) {
    try {
        let categories = await categorySchema.find({});
        res.status(200).send({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).send({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = new categorySchema({
            name: body.name,
            description: body.description || ""
        });
        await newCategory.save();
        res.status(201).send({
            success: true,
            data: newCategory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedCategory = await categorySchema.findByIdAndUpdate(
            req.params.id,
            {
                name: body.name,
                description: body.description
            },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).send({
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        let updatedCategory = await categorySchema.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).send({
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;