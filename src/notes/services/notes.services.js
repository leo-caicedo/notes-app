// models
const Note = require("../models/Note");

class NotesServices {
  // list notes
  async getNotes(req, res) {
    const notes = await Note.find({}).lean();
    res.render("notes/notes", { notes });
  }

  // create note
  renderNoteForm(req, res) {
    res.render("notes/new-note");
  }
  async createNote(req, res) {
    const { body: note } = req;

    const noteCreated = new Note(note);
    await noteCreated.save();
    req.flash("success_msg", "Note added successfully");
    res.redirect("/notes");
  }
}

module.exports = NotesServices;
