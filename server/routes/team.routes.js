const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");
const { protect } = require("../middleware/auth.middleware");
const { upload, processAndUploadImage } = require("../middleware/upload.middleware");

router.use(protect);

router.post("/", upload.single("photo"), processAndUploadImage, teamController.addTeamMember);
router.get("/", teamController.getTeam);
router.delete("/:id", teamController.deleteTeamMember);

module.exports = router;
