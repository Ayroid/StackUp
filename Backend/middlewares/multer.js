import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "bookCover") {
      cb(null, "public/images/books");
    } else {
      cb(null, "public/images/others");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.title}${path.extname(file.originalname)}`);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const upload = multer({ storage });

export { upload as UPLOAD };
