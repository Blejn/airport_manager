const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
router.use(cookieParser());

router.get("/", async (req, res) => {
  try {
    User.find({}).then(function (users) {
      res.status(200).json(users);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//REGISTER
router.post("/register", jsonParser, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstname: req.body.firstname,
      username: req.body.username,
      email: req.body.email,
      lastname: req.body.lastname,
      password: hashedPassword,
      city: req.body.city,
      country: req.body.country,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//LOGIN
router.post("/login", jsonParser, async (req, res) => {
  try {
    const user = await User.findOne({ username: req?.body?.username });

    if (!user) {
      !res.status(404).json("user not found");
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(404).json("Bad password");
    }

    const token = jwt.sign({ _id: user._id }, "secret");
    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send({
      message: "succes",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/all/users", jsonParser, async (req, res) => {
  try {
    var usernames = [];

    await User.find({}).then(users => {
      users.map(user => {
        usernames.push(user.username);
      });
    });
    setTimeout(() => {
      res.status(200).json(usernames);
    }, 2000);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/user", jsonParser, async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");
    if (!claims) {
      return res.status(404).json("Authoritzation failed");
    }
    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/essa", jsonParser, async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout", jsonParser, (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Logout");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id/add", jsonParser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user.tickets.includes(req.body.ticketNumber)) {
      user.tickets.push(req.body.ticketNumber);
      await user.save();

      // user.updateOne({ $push: { tickets: req.body.ticketNumber } });
      res.status(200).json(user);
    } else {
      res.status(403).json("You already got that ticket");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
