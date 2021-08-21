const { Router } = require("express");

const router = Router();
// services
const NotesServices = require("../services/notes.services");
const notesServices = new NotesServices();

// list notes
router.get("/", notesServices.getNotes);
// create note
router.get("/new", notesServices.noteForm);
router.post("/new", notesServices.createNote);
// update note
router.get("/edit/:id", notesServices.editForm);
router.put("/edit/:id", notesServices.updateNote);
// delete note
router.delete("/:id", notesServices.deleteNote);

module.exports = router;
