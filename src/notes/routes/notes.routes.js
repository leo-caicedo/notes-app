const { Router } = require("express");

const router = Router();
// middleware
const auth = require("../../utils/auth")
// services
const NotesServices = require("../services/notes.services");
const notesServices = new NotesServices();

// list notes
router.get("/", auth, notesServices.getNotes);
// create note
router.get("/new", auth, notesServices.noteForm);
router.post("/new", auth, notesServices.createNote);
// update note
router.get("/edit/:id", auth, notesServices.editForm);
router.put("/edit/:id", auth, notesServices.updateNote);
// delete note
router.delete("/:id", auth, notesServices.deleteNote);

module.exports = router;
