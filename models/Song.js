const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "Please provide artist name"],
      trim: true,
    },
    album: {
      type: String,
      required: [true, "Please provide Album"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Please provide Genre"],
      enum: [
        "all",
        "bati",
        "anchoye",
        "ambassel",
        "tizita",
        "soul",
        "edm",
        "RnB",
        "rock",
        "pop",
        "classical",
        "country",
        "blues",
        "jazz",
        "rap",
        "hip hop",
        "reggae",
        "gospel",
      ],
    },
  },
  { timestamps: true }
);
const Song = mongoose.model("Songs", SongSchema);

module.exports = Song;
