const client = require("../utils/redisConnect");
const User = require("../model/user.model");

const createUser = async (req, res) => {
  try {
    const { username, email, dob } = req.body;
    const newUser = await User.create({ username, email, dob });
    await newUser.save();
    let userCache = await client.set(
      `user-${newUser._id}`,
      JSON.stringify(newUser.toJSON())
    );
    if (!userCache) {
      throw new Error("Please error in connecting to redis server");
    }
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUser = (req, res) => {};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    let userCache = await client.get(`user-${id}`);
    if (!userCache) {
      throw new Error(`User ${id} not found from the cache Redis memory`);
    } else {
      const foundUser = await User.findOne({ _id: id });
      if (!foundUser) {
        throw new Error(`User ${id} not found from the database`);
      }
      res.status(200).json({
        success: "User found from the MongoDB database disk",
        data: foundUser,
      });
    }
    res.status(200).json({
      success: "User found from the Redis memory",
      data: JSON.parse(userCache),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
`

`;

const updateUser = (req, res) => {};

module.exports = { createUser, getUser, getSingleUser, updateUser };
