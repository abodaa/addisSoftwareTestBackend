// const { songFilter } = req.query;

// if (songFilter === "all" || !songFilter) {
//   try {
//     const songs = await Song.find();
//     return res.status(StatusCodes.OK).json({
//       success: true,
//       data: songs,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.send(error);
//   }
// }

// try {
//   const songs = await Song.find({
//     genre: songFilter,
//   }); // Filter with filter param
//   return res
//     .status(StatusCodes.OK)
//     .json({ success: true, data: songs, totalSongsCount: songs.length });
// } catch (error) {
//   console.log(error);
//   return res.status(StatusCodes.BAD_REQUEST).send(error);
// }
