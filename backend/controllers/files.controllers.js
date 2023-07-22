const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const getFiles = async (req, res) => {
  const startPath = path.join(__dirname, "..", "uploads/images");
  const dirToFiles = async (dir) => {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? dirToFiles(res) : res;
      })
    );
    return Array.prototype.concat(...files);
  };
  const files = await dirToFiles(startPath);
  const relativeFiles = files.map((file) => path.relative(startPath, file));
  res.json(relativeFiles);
};

const uploadFiles = async (req, res) => {
  console.log("uploading files");
  upload.array("files")(req, res, function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ files: req.files });
  });
};

module.exports = {
  getFiles,
  uploadFiles,
};
