const mongoose = require('mongoose');

const PicSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    user_avatar_url: { type: String, required: true },
    user_login: { type: String, required: true }, // a user's login is their username/handle
    pic_url: { type: String, required: true },
    pic_description: { type: String, required: true },
    pic_likes: { type: [Number], default: [] } // array of user_ids
});

module.exports = mongoose.model('Pic', PicSchema);
