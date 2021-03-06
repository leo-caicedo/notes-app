// models
const Note = require("../models/Note");

class NotesServices {
  // list notes
  async getNotes(req, res) {
    const notes = await Note.find({ user: req.user.id }).lean();
    res.render("notes/notes", { notes });
  }

  // create note
  noteForm(req, res) {
    res.render("notes/new-note");
  }
  async createNote(req, res) {
    const { body: note } = req;

    const noteCreated = new Note(note);
    noteCreated.user = req.user.id;
    await noteCreated.save();
    req.flash("success_msg", "Note added successfully");
    res.redirect("/notes");
  }

  // update note
  async editForm(req, res) {
    const { id } = req.params;

    const note = await Note.findById(id).lean();
    if (note.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note });
  }
  async updateNote(req, res) {
    const { id } = req.params;
    const { body: note } = req;

    await Note.findByIdAndUpdate(id, note);
    req.flash("success_msg", "Note updated Succesfully");
    res.redirect("/notes");
  }

  // delete note
  async deleteNote(req, res) {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);
    req.flash("success_msg", "Note removed Succesfully");
    res.redirect("/notes");
  }
}

module.exports = NotesServices;
