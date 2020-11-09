const randomize = require("randomatic");
const User = require("../models/user");

const key = randomize("0", 4);

const saveOTP = async (email) => {
  await User.findOneAndUpdate({ email }, { otp: key });
};

module.exports = saveOTP;
