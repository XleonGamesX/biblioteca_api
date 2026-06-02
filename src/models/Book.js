import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  titulo: String,
  isbn: { type: String, unique: true },
  genero: { type: String, enum: ["fiction", "non-fiction", "sci-fi", "history", "other"] },
  anio: Number,
  copiasDisponibles: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }
});

export default mongoose.model("Book", bookSchema);