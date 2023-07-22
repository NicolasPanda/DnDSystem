const express = require("express");

const { getFiles, uploadFiles } = require("../controllers/files.controllers");

const router = express.Router();

router.get("/", getFiles);
router.post("/", uploadFiles);

module.exports = router;
