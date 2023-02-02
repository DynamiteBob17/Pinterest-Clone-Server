const mongoose = require('mongoose');

const PicSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    user_avatar_url: { type: String, required: true },
    pic_url: { type: String, required: true },
    pic_description: { type: String, default: '*no description*' },
    pic_likes: { type: [Number], default: [] } // array of user_ids
});

module.exports = mongoose.model('Pic', PicSchema);
