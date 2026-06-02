import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  fechaPrestamo: Date,
  fechaDevolucionEsperada: Date,
  fechaDevuelto: Date,
  estado: { type: String, enum: ["active", "returned", "overdue"], default: "active" },
  notas: String,
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  reader: { type: mongoose.Schema.Types.ObjectId, ref: "Reader" }
});

export default mongoose.model("Loan", loanSchema);