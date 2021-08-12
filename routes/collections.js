const { Collection, validate } = require("../models/collections");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const collection = new Collection({
      question: req.body.question,
      answer: req.body.answer,
      // category: req.body.category,
      // price: req.body.price,
    });

    await collection.save();

    return res.send(collection);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    return res.send(collections);

  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection)
      return res.status(400).send(`The card with id "${req.params.id}" dos not exist in the deck.`);

    return res.send(collection);
    
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findByIdAndUpdate(
req.params.id,
      {
        question: req.body.question,
        answer: req.body.answer,
        // category: req.body.category,
        // price: price.body.price,
      },
      { new: true }
    );
    if (!collection)
      return res
        .status(400)
        .send(`The card with id "${req.params.id}" dos not exist in the deck.`);
    await collection.save();
    return res.send(collection);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const collection = await Collection.findByIdAndRemove(req.params.id);
    if (!collection)
      return res
        .status(400)
        .send(`The card with id "${req.params.id}" dos not exist in the deck.`);
        return res.send(collection);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
