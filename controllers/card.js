/**
 * card Collection methods
 */
const { cardModel } = require("../models/flashcard");

const cardController = {
  /**
   * createCard - create card by card object.
   * @param object - object that need to add.
   * @returns {Promise<void>}
   */
  createCard: async (object) => {
    try {
      let card = await new cardModel(object);
      await card.save();
      return card;
    } catch (error) {
      throw error;
    }
  },

  /**
   * getCardByCardName - get card by card name.
   * @returns {Promise<void>}
   */
  getCardByCardName: async (collectionName) => {
    try {
      let card = await cardModel.findOne({ collectionName: collectionName });
      return card;
    } catch (error) {
      throw error;
    }
  },

  updateCard: async (object) => {
    try {
      let card = await cardModel.findOne({ collectionName: object.collection });
      
      if (card) {
        let index = card.collections.findIndex(item => item.word == object.word);
        if(index>=0){
          card.collections[index] = { word: object.word, definition: object.definition }
        }
        else{
          card.collections.push({ word: object.word, definition: object.definition });
        }
        card = await card.save();
      }
      return card;
    } catch (error) {
      throw error;
    }
  },

  /**
   * getAllCards - get all cards of user.
   * @returns {Promise<void>}
   */
  getAllCards: async () => {
    try {
      let card = await cardModel.find();
      return card;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = cardController;
