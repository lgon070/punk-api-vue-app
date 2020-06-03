const express = require('express');
const router = express.Router();
const punk = require('punkmodule');

router.post('/search', async (req, res) => {
    const {
        query
    } = req.body;
    try {
        const returnedBeverages = await punk.search(query);
        res.json(returnedBeverages);
    } catch (err) {
        res.json({
            err
        });
    }
});

router.post('/fetch', async (req, res) => {
    const {
        selectedId
    } = req.body;
    try {
        const singleBeverage = await punk.fetch(selectedId);
        res.json(singleBeverage);
    } catch (err) {
        res.json({
            err
        });
    }
});

module.exports = router;