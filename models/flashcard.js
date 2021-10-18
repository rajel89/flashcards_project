const Joi = require("joi");
const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    collectionName: { type: String, required: true },
    collections: [{ word: { type: String }, definition: { type: String } }],
  },
  { usePushEach: true }
);

const cardModel = mongoose.model("cards", cardSchema);

// validateCard = (card) => {
//   const schema = Joi.object({
//     word: Joi.string().required(),
//     definition: Joi.string().required(),
//     collection: Joi.string().required(),
//   });
//   return schema.validate(card);
// };

exports.cardModel = cardModel;
// exports.validateCard = validateCard;
