const router = require('express').Router();
const Pic = require('../models/pic');

router.post('/pic', (req, res) => {
    const newPic = new Pic({
        user_id: req.user.id,
        user_avatar_url: req.user.avatar_url,
        user_login: req.user.login, // a user's login is their username/handle
        pic_url: req.body.pic_url,
        pic_description: req.body.pic_description
    });

    newPic.save((err) => {
        if (err) {
            res.status(500).send({
                message: 'Error saving pic'
            });
        } else {
            res.status(200).send({
                message: 'Pic saved'
            });
        }
    });
});

router.put('/like_pic/:id', (req, res) => {
    Pic.findById(req.params.id, (err, pic) => {
        if (err) {
            res.status(500).send({
                message: 'Error finding pic'
            });
        } else {
            const pic_likes = pic.pic_likes;

            if (pic_likes.indexOf(req.user.id) === -1) {
                Pic.updateOne(
                    { _id: req.params.id },
                    { $push: { pic_likes: req.user.id } },
                    (err) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error liking pic'
                            });
                        } else {
                            res.status(200).send({
                                message: 'Pic liked'
                            });
                        }
                    }
                );
            } else {
                res.status(200).send({
                    message: 'You already liked this pic'
                });
            }
        }
    });
});

router.put('/unlike_pic/:id', (req, res) => {
    Pic.findById(req.params.id, (err, pic) => {
        if (err) {
            res.status(500).send({
                message: 'Error finding pic'
            });
        } else {
            const pic_likes = pic.pic_likes;

            if (pic_likes.indexOf(req.user.id) !== -1) {
                Pic.updateOne(
                    { _id: req.params.id },
                    { $pull: { pic_likes: req.user.id } },
                    (err) => {
                        if (err) {
                            res.status(500).send({
                                message: 'Error unliking pic'
                            });
                        } else {
                            res.status(200).send({
                                message: 'Pic unliked'
                            });
                        }
                    }
                );
            } else {
                res.status(200).send({
                    message: 'You already unliked this pic'
                });
            }
        }
    });
});

router.delete('/pic/:id', (req, res) => {
    Pic.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Error deleting pic'
            });
        } else {
            res.status(200).send({
                message: 'Pic deleted'
            });
        }
    });
});

module.exports = router;
