const mongoose = require ('mongoose');
const Deck = mongoose.model('Deck', deckSchema);

const deckSchema = new mongoose.Schema({
    question: {type: String, requried: true, minlength: 2, maxlength: 255},
    answer:{type: String, requried: true},
    
    
});

//Page 7 and 8 of the node_express_mongodb_mongoose_tutorial
//following the Mongoose Schema


module.exports = Deck;

