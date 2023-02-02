const router = require('express').Router();
const pic = require('../models/pic');

router.get('/pics', (req, res) => {
    pic.find({}, (err, pics) => {
        if (err) {
            res.status(500).send({
                message: 'Error getting pics'
            });
        } else {
            res.status(200).send(pics);
        }
    });
});

router.get('/pic/:id', (req, res) => {
    pic.findById(req.params.id, (err, pic) => {
        if (err) {
            res.status(500).send({
                message: 'Error getting pic'
            });
        } else {
            res.status(200).send(pic);
        }
    });
});

module.exports = router;
