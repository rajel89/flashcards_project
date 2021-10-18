const express = require("express");
const router = express.Router();
const { cardModel } = require("../models/flashcard.js");
const cardController = require("../controllers/card");

    /**
   * add flash card api - create card by card object.
   * @returns {Promise<void>}
   */

router.post("/card", async (req, res) => {
  try {
    // const { error } = validateCard(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     status: 400,
    //     data: null,
    //     error: error.details[0].message,
    //   });
    // }

    let { word, definition, collectionName } = req.body;

    let card = await cardController.getCardByCardName(collectionName)
    if(card){
    let cardObject = { word, definition,collection: collectionName};
    card = await cardController.updateCard(cardObject)
    return res.status(200).json({
      status: 200,
      data: card,
      error: null,
    });
    }
    else{
    let cardObject = { collectionName:collectionName,collections:[{word:word,definition:definition}]};
       let cardData = await cardController.createCard(cardObject);
      return res.status(200).json({
        status: 200,
        data: cardData,
        error: null,
      });
    }

  } catch (error) {
    console.log("err",error)
    return res.status(400).json({
      status: 400,
      data: null,
      error: error,
    });
  }
});

    /**
   * get all cards api - get all cards.
   * @returns {Promise<void>}
   */
router.get("/card", async (req, res) => {
  try {
    let cardData = await cardController.getAllCards()
    return res.status(200).json({
      status: 200,
      data: cardData,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      data: null,
      error: error,
    });
  }
});



module.exports = router;
