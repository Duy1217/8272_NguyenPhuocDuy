var express = require('express');
var router = express.Router();
let Category = require('../schemas/category');

router.get('/', async function(req, res, next) {
    try {
        let categories = await Category.find({});
        res.send(categories);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/', async function(req, res, next) {
    try {
        let newCategory = new Category(req.body);
        await newCategory.save();
        res.send(newCategory);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send(category);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        let updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send(updatedCategory);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        let deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }
        res.send({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
