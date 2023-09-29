import Jimp from "jimp";
import path from "path";

// const changeAvatar = async (req, res) => {
//   const { path: oldPath } = req.file;
//   const file = await Jimp.read(oldPath);
//   file.resize(250, 250).write(oldPath);
// };




const changeAvatar = async (path, width = 250, height = 250, mode = Jimp.RESIZE_BEZIER) => {
     const image = await Jimp.read(path);
     await image.resize(width, height, mode);
     await image.writeAsync(path);
}

// module.exports = {
//     resizeImage
// }
export default changeAvatar;