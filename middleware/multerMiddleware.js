import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";

// WITH DISK STORAGE
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/upload");
//   },
//   filename: (req, file, cb) => {
//     const filename = file.originalname;
//     cb(null, filename);
//   },
// });

// WITH MEMORY STORAGE
const storage = multer.memoryStorage();
const parser = new DataParser();
export const formatImage = (file) => {
  const fileExtention = path.extname(file.originalname).toString();
  return parser.format(fileExtention, file.buffer).content;
};

const upload = multer({ storage });

export default upload;
