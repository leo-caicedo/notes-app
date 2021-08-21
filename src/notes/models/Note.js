const { Schema, model } = require("mongoose")

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  user: {
    type: String,
    required: true
  }
})

export.module = model("Note", noteSchema)
