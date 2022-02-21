const { User } = require("../../models");

const register = async (req, res) => {
  const { password, email, subscribtion } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const result = await User.create({ password, email, subscribtion });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: { user: { password, email, subscribtion } },
  });
};

module.exports = register;
