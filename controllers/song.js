const Song = require("../models/Song");
const { StatusCodes } = require("http-status-codes");

//  Create Song
const createSong = async (req, res) => {
  try {
    const newSong = await Song.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, data: newSong });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

// Get All Songs
const getAllSongs = async (req, res) => {
  const { songFilter } = req.query;

  if (songFilter === "all" || !songFilter) {
    try {
      const songs = await Song.find();
      return res.status(StatusCodes.OK).json({
        success: true,
        data: songs,
        totalSongsCount: songs.length,
      });
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }

  try {
    const songs = await Song.find({
      genre: songFilter,
    }); // Filter with filter param
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: songs, totalSongsCount: songs.length });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};


//  Update Song
const updateSong = async (req, res) => {
  const { id: songId } = req.params; // Destructure watchlist ID from params
  try {
    const song = await Song.findOneAndUpdate({ _id: songId }, req.body, {
      new: true,
      runValidators: true,
    });

    // Check if song exists
    if (!song) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: `No song found with ID: ${songId}`,
      });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: song });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

//  Delete Song
const deleteSong = async (req, res) => {};

// Get all songs statstics
const getSongsSatatstics = async (req, res) => {
  try {
    const totalSongsCount = await Song.find();

    const totalArtistsCount = (await Song.find()).filter(
      (filter) => filter.artist
    );
    const totalAlbumsCount = (await Song.find()).filter(
      (filter) => filter.album
    );
    const totalGenresCount = (await Song.find()).filter(
      (filter) => filter.genre
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        totalSongsCount,
        totalArtistsCount,
        totalAlbumsCount,
        totalGenresCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  getAllSongs,
  createSong,
  updateSong,
  deleteSong,
  getSongsSatatstics,
};
