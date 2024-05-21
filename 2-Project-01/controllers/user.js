const User = require("../models/user");

async function handleGetAllUser(req, res) {
  const allDbUsers = await User.find({});
  res.setHeader("X-myName", "Souvik Das"); // custom header

  return res.json(allDbUsers);
}

async function handleGetUserByID (req, res) {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.send(user);
    } else {
      return res.status(404).send({ error: "User not found" });
    }
}

async function handleUpdateUserByID(req, res) {
    await User.findByIdAndUpdate(req.params.id, { last_name: "Change" });
    return res.json({ status: "Successful!" });
}

async function handleDeleteUserByID(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Successful!" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  return res.status(201).json({ status: "Successful!", msg: "Success", id: result.id });
}

module.exports = {
  handleGetAllUser,
  handleGetUserByID,
  handleUpdateUserByID,
  handleDeleteUserByID,
  handleCreateNewUser,
};
