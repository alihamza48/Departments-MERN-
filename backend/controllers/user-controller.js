const User = require("../models/user-schema");

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const createdUser = new User({ email, password });
  try {
    await createdUser.save();
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "LOGGED IN!!",
    users: createdUser.toObject({ getters: true }),
  });
};

exports.signup = signup;
