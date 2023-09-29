const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Thought = require("../models/Thoughts");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Route 1 - Fetching all the stored thoughts of logged in users - GET - /fetchthoughts
router.get("/fetchthoughts", fetchuser, async (req, res) => {
  try {
    const thought = await Thought.find({ user: req.user.id });
    res.json(thought);
  } catch (error) {
    console.log(`Something went wrong`);
    res.status(500).send(`Something went wrong ${error.message}`);
  }
});

// Route 2 - Adding a thought using POST - /addthought
router.post(
  "/addthought",
  fetchuser,
  [
    body(
      "thought",
      "Thought of the day must be atleast 2 characters!"
    ).isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const { thought } = req.body;
      // express validator error handling returning bad request if error is present
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let userID = req.user.id;
      let user = await User.findById(userID);

      const addthought = new Thought({
        thought,
        user: userID,
        username: user.name,
      });
      const savedThought = await addthought.save();
      res.json(savedThought);

      console.log(`New thought by ${user.name} added successfully!`);
    } catch (error) {
      console.log(`Something went wrong`);
      res.status(500).send(`Something went wrong ${error.message}`);
    }
  }
);

// Route 3 - Updating a thought using PUT - /updatethought/:noteID
router.put(
  "/updatethought/:id",
  fetchuser,
  [
    body(
      "thought",
      "Thought of the day must be atleast 2 characters!"
    ).isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const { thought } = req.body;
      let user = await User.findById(req.user.id);
      // express validator error handling returning bad request if error is present
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Creating a new object in which the update thought would be saved
      const updateThought = {};
      if (thought) {
        updateThought.thought = thought;
      }

      // Fetch the thought that needs to be updated and then update it
      let savedThought = await Thought.findById(req.params.id);
      if (!savedThought) {
        return res.status(404).send("No such Thought Found");
      }

      // Checking if the thought is of the logged in user or not
      if (savedThought.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      savedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        { $set: updateThought },
        { new: true }
      );
      res.json(savedThought);
      console.log(`${user.name} updated his thought!`);
    } catch (error) {
      console.log(`Something went wrong`);
      res.status(500).send(`Something went wrong ${error.message}`);
    }
  }
);

// Route 4 - Deleting a thought using DELETE - /deletethought/:noteID
router.delete("/deletethought/:id", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    // Fetch the thought that needs to be deleted and then delete it
    let deleteThought = await Thought.findById(req.params.id);
    if (!deleteThought) {
      return res.status(404).send("No such Thought Found");
    }

    // Checking if the thought is of the logged in user or not
    if (deleteThought.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    deleteThought = await Thought.findByIdAndDelete(req.params.id);
    res.json({Success : "Deleted"});
    console.log(`${user.name} deleted his thought!`);
  } catch (error) {
    console.log(`Something went wrong`);
    res.status(500).send(`Something went wrong ${error.message}`);
  }
});

// Route 5 - Fetching all thoughts from all the created user
router.get("/fetchalluserthoughts", async (req, res) => {
  try {
    const thought = await Thought.find();
    res.json(thought);
    console.log(`All user created thoughts have been fetched`)
  } catch (error) {
    console.log(`Something went wrong`);
    res.status(500).send(`Something went wrong ${error.message}`);
  }
});


module.exports = router;
