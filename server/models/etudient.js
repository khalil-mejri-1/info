const mongoose = require('mongoose');

const EtudiantSchema = new mongoose.Schema({
    name: {
    type: String,
     required: true, 
  },

  date: [
    {
      date: { type: String, required: true }, // تاريخ الجلسة
      payment: { type: String }, // حالة الدفع
    },
  ],
 
});

const Etudiant = mongoose.model('Etudiant', EtudiantSchema);

module.exports = Etudiant;
 