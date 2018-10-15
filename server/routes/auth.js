const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');


const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}


router.post('/friends', (req,res,next) => {
  const friendName = req.body.friendName;
  const user = req.body.user;

  console.log(req.body)

  User.findOne({ username:friendName })
  .then(() => {
    User.findOne({ _id: user._id})
    .then((me)=>{
      console.log(me._id)
    User.findByIdAndUpdate(me._id,{ $push: { friends: friendName } },)
    .then((user)=>{
      res.json({user})
    })
    .catch(err=>console.log(err))
  })
})
  .catch(e => console.log(e))
})

router.get('/friends', (req,res,next) => {
  const friendName = req.body.friendName;
  const user = req.body.user;
  console.log(req.body.user)
})
// SIGNUP
router.post('/signup', (req, res, next) => {

  const {username, password, genres} = req.body;

  if (!username || !password){
    next(new Error('You must provide valid credentials'));
  }

  User.findOne({ username })
  .then( foundUser => {
    if (foundUser) throw new Error('Username already exists');

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    console.log(genres)
    return new User({
      username,
      password: hashPass,
      favGenres: { 
        action: genres[0].bool,
        drama: genres[1].bool,
        comedy: genres[2].bool,
        adventure: genres[3].bool,
        animation: genres[4].bool,
        crimen: genres[5].bool,
        documental: genres[6].bool,
        family: genres[7].bool,
        history: genres[8].bool,
        fantasy: genres[9].bool,
        terror: genres[10].bool,
        music: genres[11].bool,
        mistery: genres[12].bool,
        romance: genres[13].bool,
        scifi: genres[14].bool,
        tvshow: genres[15].bool,
        belic: genres[16].bool,
        western: genres[17].bool,
        suspense: genres[18].bool,

      }
     
    }).save();
  })
  .then( savedUser => login(req, savedUser)) 
  .then( user => res.json({status: 'signup & login successfully', user})) 
  .catch(e => next(e));
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)

    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});


router.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
  }
})



router.get('/logout', (req,res) => {
  req.logout();
  res.status(200).json({message:'logged out'})
});


router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = router;
