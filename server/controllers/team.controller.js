const TeamMember = require("../models/TeamMember.model");

exports.addTeamMember = async (req, res) => {
  try {
    const { name, phone, whatsapp, email, skills, gear, tools, notes } = req.body;
    const photo = req.file ? (req.file.cloudinaryUrl || req.file.path) : null;

    const newMember = new TeamMember({
      name, phone, whatsapp, email, photo,
      skills: skills ? JSON.parse(skills) : [],
      gear: gear ? JSON.parse(gear) : [],
      tools: tools ? JSON.parse(tools) : [],
      notes
    });

    const saved = await newMember.save();
    res.status(201).json({ success: true, message: "Team member added", member: saved });
  } catch (error) {
    console.error("Add Team Member Error: ", error);
    res.status(500).json({ success: false, message: "Failed to add team member" });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: team.length, team });
  } catch (error) {
    console.error("Get Team Error: ", error);
    res.status(500).json({ success: false, message: "Failed to fetch team" });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Team member removed" });
  } catch (error) {
    console.error("Delete Team Member Error: ", error);
    res.status(500).json({ success: false, message: "Failed to delete team member" });
  }
};
