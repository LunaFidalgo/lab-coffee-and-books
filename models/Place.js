const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  description: String,
  location: { type: { type: String }, coordinates: [Number] }
});
placeSchema.index({ location: '2dsphere' });

const place = mongoose.model("Place", placeSchema);

module.exports = place;