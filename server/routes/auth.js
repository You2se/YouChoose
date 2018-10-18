const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
require("../configs/cloudinary");
const parser = require("../configs/cloudinary.js");

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};
router.post("/genres", (req, res, next) => {
  const user = req.body.user;
  const genreName = req.body.genreName;
const genero = `favGenres.${genreName}`
const update = {[genero]:1}
  User.findOne({ _id: user._id })
    .then(me => {
      User.findByIdAndUpdate(
        me._id,
        {
          $inc:update
          // favGenres: update
        },
        { new: true }
      )
        .then(user => {
          console.log(user);
          res.json({ user });
        })
        .catch(err => console.log(err));
    })
    .catch(e => console.log(e));
});

router.post("/friends", (req, res, next) => {
  const friendName = req.body.friendName;
  console.log("body:", req.body.friendGenres);
  const user = req.body.user;
  const favGenres = req.body.friendGenres;

  User.findOne({ username: friendName })
    .then(() => {
      User.findOne({ _id: user._id }).then(me => {
        console.log(me._id);
        User.findByIdAndUpdate(me._id, {
          $push: { friendsList: { amigo: { amigo: friendName, favGenres } } }
        })
          .then(user => {
            res.json({ user });
          })
          .catch(err => console.log(err));
      });
    })
    .catch(e => console.log(e));
});

router.get("/friends/:friendName", (req, res, next) => {
  const friendName = req.params.friendName;
  User.findOne({ username: friendName })
    .then(foundFriend => {
      if (foundFriend) {
        res
          .status(200)
          .json({ friend: foundFriend, requestURL: req.originalUrl });
      } else {
        res
          .status(500)
          .json({ status: "user not found", requestURL: req.originalUrl });
      }
    })
    .catch(e => console.log(e));
});

// SIGNUP
router.post("/signup", parser.single("picture"), (req, res, next) => {
  const { username, password, genres } = req.body;
  const genresParsed = JSON.parse(genres);
  const imgPath = req.file.url;
  console.log(genres);
  if (!username || !password) {
    next(new Error("You must provide valid credentials"));
  }

  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        imgPath,
        favGenres: {
          action: genresParsed[0].bool,
          drama: genresParsed[1].bool,
          comedy: genresParsed[2].bool,
          adventure: genresParsed[3].bool,
          animation: genresParsed[4].bool,
          crimen: genresParsed[5].bool,
          documental: genresParsed[6].bool,
          family: genresParsed[7].bool,
          history: genresParsed[8].bool,
          fantasy: genresParsed[9].bool,
          terror: genresParsed[10].bool,
          music: genresParsed[11].bool,
          mistery: genresParsed[12].bool,
          romance: genresParsed[13].bool,
          scifi: genresParsed[14].bool,
          tvshow: genresParsed[15].bool,
          belic: genresParsed[16].bool,
          western: genresParsed[17].bool,
          suspense: genresParsed[18].bool
        }
      }).save();
    })
    .then(savedUser => login(req, savedUser))
    .then(user => res.json({ status: "signup & login successfully", user }))
    .catch(e => console.log(e));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
