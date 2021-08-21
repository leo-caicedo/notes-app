const { Router } = require("express");

const router = Router();
// services
const NotesServices = require("../services/notes.services");
const notesServices = new NotesServices();

router.get("/home", notesServices.getNotes);

module.exports = router;
