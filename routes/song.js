const express = require("express");
const {
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  getSongsSatatstics,
} = require("../controllers/song"); // Importing controller functions

const router = express.Router();

// Music Route
router.post("/", createSong);
router.get("/", getAllSongs);
router.get("/stat", getSongsSatatstics);
router.patch("/:id", updateSong);
router.delete("/:id", deleteSong);

// Export music Route
module.exports = router;
