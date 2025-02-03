import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Para generar un código único

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: () => uuidv4().slice(0, 8), // Genera un código único de 8 caracteres
  },
  purchase_datetime: {
    type: Date,
    default: Date.now, // Guarda la fecha y hora exacta
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
