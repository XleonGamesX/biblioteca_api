import Loan from "../models/Loan.js";
import Book from "../models/Book.js";

export const createLoan = async (req, res) => {
  try {
    const { fechaPrestamo, fechaDevolucionEsperada, book } = req.body;

    if (new Date(fechaDevolucionEsperada) <= new Date(fechaPrestamo)) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const loan = await Loan.create(req.body);

    await Book.findByIdAndUpdate(book, {
      $inc: { copiasDisponibles: -1 }
    });

    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate("book")
      .populate("reader");

    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};