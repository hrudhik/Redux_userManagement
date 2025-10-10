// import multer from "multer";
// import path from "path";

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/")
//     },
//     filename: (req,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname))
//     }
// })

// export const upload=multer({storage})   


import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = process.cwd(); // get current working directory

// ✅ Ensure uploads folder exists inside backend
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // ✅ use absolute path here
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
