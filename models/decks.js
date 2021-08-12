const mongoose = require("mongoose");
const Joi = require('joi');


const deckSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 2, maxlength: 150 },
  answer: { type: String, required: true },
  
  // name: { type: String, required: true, minlength: 2, maxlength: 50 },
  // description: { type: String, required: true },
  // category: { type: String, required: true, minlength: 5, maxlength: 50 },
  // price: { type: Number, required: true },
  // dateAdded: { type: Date, default: Date.now }, 
});
const Deck = mongoose.model('Deck', deckSchema);

function validateDeck (deck){
  const schema = Joi.object({
    question: Joi.string().min(2).max(150).required(),
    answer:Joi.string().required(),

    // name: Joi.string().min(2).max(50).required(),
    // description:Joi.string().required(),
    // category:Joi.string().min(5).max(50).required(),
    // price: Joi.number().required(),
  });
  return schema.validate(deck);
}


exports.Deck = Deck;
exports.validate=validateDeck;
exports.deckSchema=deckSchema;

