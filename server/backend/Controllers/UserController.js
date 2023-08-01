const { User } = require("../schema/userSchema");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  
  const emailExist = await User.find({ user_email: req.body.email });

  if (emailExist.length !== 0) {
    return res
      .status(200)
      .json({ statu: 400, message: "Email Already Exsists." });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    user_fullname: req.body.fullname,
    user_email: req.body.email,
    user_password: hashedPassword,
  });

  user = await user.save();

  if (!user)
    return res
      .status(200)
      .json({ status: 400, message: "User Cannot Be Saved" });

  res.status(200).json({ status: 200, message: "User Created" });
};

const userlogin = async (req, res) => {
  const user = await User.findOne({ user_email: req.body.email });
  if (!user) return res.json({ status: 400, message: "Email Not Registered" });
  if (user && bcrypt.compareSync(req.body.password, user.user_password)) {
    res.status(200).json({ status: 200, user: user.user_email});
  } else {
    res.status(200).json({ status: 401, message: "Password is Wrong" });
  }
};

module.exports = {
  createUser,
  userlogin,
};
