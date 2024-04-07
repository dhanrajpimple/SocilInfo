import { CloudinaryStorage } from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
  params:{
    folder:"blog",
    format: async () => ["png", "jpg"],
    public_id:(req, file)=>file.filename,
  },
})

const parser = multer({storage:storage});

module.exports = parser;