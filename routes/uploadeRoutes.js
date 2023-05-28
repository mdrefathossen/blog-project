const router = require("express").Router();

const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uplodeMiddleware");
const { uploadProfilePics } = require("../controllers/uploadeController");
router.post(
  "/profilePics",
  isAuthenticated,
  upload.single("profilePics"),
  uploadProfilePics
);

module.exports = router