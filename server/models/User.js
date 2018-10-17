const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//Model

/*
username
password
favGenres
favMovies -> movieid

*/
const userSchema = new Schema({
  username: String,
  password: String,
  favGenres: {
    action: {type :Number},
    adventure: {type :Number},
    animation: {type :Number},
    comedy: {type :Number},
    crimen: {type :Number},
    documental: {type :Number},
    drama: {type :Number},
    family: {type :Number},
    history: {type :Number},
    fantasy: {type :Number},
    terror: {type :Number},
    music: {type :Number},
    mistery: {type :Number},
    romance: {type :Number},
    scifi: {type :Number},
    tvshow: {type :Number},
    belic: {type :Number},
    western: {type :Number},
    suspense: {type :Number}
  },
  favMovies: [Number],
  friendsList: {
    amigo: {amigo: String, favGenres:Object},
  },
  imgPath: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;