const { Deck, validate } = require("../models/decks");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const deck = new Deck({
      question: req.body.question,
      answer: req.body.answer,
      // category: req.body.category,
      // price: req.body.price,
    });

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const deck = await Deck.findByIdAndUpdate(
req.params.id,
      {
        question: req.body.question,
        answer: req.body.answer,
        // category: req.body.category,
        // price: price.body.price,
      },
      { new: true }
    );
    if (!deck)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" does not exist.`);
    await deck.save();
    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck)
      return res
        .status(400)
        .send(`The product with id "${req.paramsid}" dos not exist.`);
    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deck = await Deck.findByIdAndRemove(req.params.id);
    if (!deck)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" doesnot exist.`);
        return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
