import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/load", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file)
      return res.status(400).json({ message: "No file uploaded" });
    // this is return of cloudinary upload
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(file.buffer);
    });
    console.log(uploadRes,"uploadRes");

    res.json({
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
    });
  } catch (err) {
    res.status(500).json({
      message: "File upload failed",
      error: err.message,
    });
  }
});

export default router;
