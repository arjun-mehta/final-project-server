// schema.js

var mongoose = require('mongoose');
//var findOrCreate = require('mongoose-findorcreate');

var playerSchema = mongoose.Schema({
	name: String,
  position: String,
  nation: String,
  league: String,
  club: String,
  foot: String,
  skill: Number,
  height: String,
  workRates: String,
  weakFootRating: Number,
	stats: {
    overall: Number,
    pace: Number,
    physical: Number,
    shooting: Number,
    passing: Number,
    dribbling: Number,
    defence: Number
  },
	url: String,
	images: {
    club: String,
    nation: String,
    player: String
  },
  type: String
},
{
  timestamps: true
});
playerSchema.index({name: 1, type: 1}, {unique: true}); //index on both name and type so we dont dupe cards but also include all card types for a player

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;
