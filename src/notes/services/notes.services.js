// models
const Note = require("../models/Note");

class NotesServices {
  // list notes
  async getNotes(req, res) {
    const notes = await Note.find({}).lean();
    res.render("notes/home");
  }
}

module.exports = NotesServices;
