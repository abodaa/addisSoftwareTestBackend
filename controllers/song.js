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
  try {
    const { title, artist, album, genre } = req.query;
    const songDatasObj = {};

    if (title) {
      songDatasObj.title = { $regex: title, $options: "i" };
    }
    if (artist) {
      songDatasObj.artist = { $regex: artist, $options: "i" };
    }
    if (album) {
      songDatasObj.album = { $regex: album, $options: "i" };
    }
    if (genre) {
      songDatasObj.genre = { $regex: genre, $options: "i" };
    }

    let songsResult = Song.find(songDatasObj).sort({ createdAt: -1 }); // filter depending on the songDataObj object

    const songs = await songsResult;

    return res.status(StatusCodes.OK).json({ success: true, data: songs });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

//  Update Song
const updateSong = async (req, res) => {
  const { id: songId } = req.params;
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
const deleteSong = async (req, res) => {
  const { id: songId } = req.params;
  try {
    const song = await Song.findOneAndDelete({
      _id: songId,
    });

    // Check if song exists
    if (!song) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: `No song found with ID: ${songId}`,
      });
    }
    return res.status(StatusCodes.OK).send(`${songId} Deleted Successfully!`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

// Get all songs statstics
const getSongsSatatstics = async (req, res) => {
  try {
    const totalSongsCount = await Song.countDocuments();
    const totalArtistsCount = await Song.distinct("artist").countDocuments();
    const totalAlbumsCount = await Song.distinct("album").countDocuments();
    const totalGenresCount = await Song.distinct("genre").countDocuments();

    const genreCounts = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistAlbumaAndSongsCounts = await Song.aggregate([
      {
        $group: {
          _id: { artist: "$artist", album: "$album" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.artist",
          albumCount: { $sum: 1 },
          songCount: { $sum: "$count" },
        },
      },
    ]);
    const eachAlbumSongsCounts = await Song.aggregate([
      {
        $group: {
          _id: { album: "$album", songs: "$title" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.album",
          songsInAlbumCount: { $sum: 1 },
        },
      },
    ]);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        totalSongsCount,
        totalArtistsCount,
        totalAlbumsCount,
        totalGenresCount,
        genreCounts,
        artistAlbumaAndSongsCounts,
        eachAlbumSongsCounts,
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
