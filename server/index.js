const express = require('express');
const app = express();
const Etudiant = require('./models/etudient.js'); // Adjust the path if necessary
const mongoose = require('mongoose');
const cors = require("cors");

// Middleware to parse JSON
app.use(express.json());

app.use(cors()); // Allow all origins by default



mongoose.connect('mongodb+srv://etudient123:khalilSlam123@cluster0.r4ug8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });




// Example Route
app.get('/', (req, res) => {
  res.send('Helloaaaaaaaa World!');
});


app.post("/add_etudient", async (req, res) => {
    try {
      const { names, date } = req.body;
  
      if (!names || names.length === 0 || !date) {
        return res.status(400).json({ message: "Names and date are required" });
      }
  
      const results = [];
  
      for (const name of names) {
        const existingEtudiant = await Etudiant.findOne({ name });
  
        if (existingEtudiant) {
          // إذا كان موجودًا، أضف التاريخ الجديد مع حالة الدفع
          existingEtudiant.date.push({ date, payment: "non" });
          await existingEtudiant.save();
          results.push({ name, status: "updated" });
        } else {
          // إذا لم يكن موجودًا، أنشئ طالبًا جديدًا مع التاريخ وحالة الدفع
          const newEtudient = new Etudiant({
            name,
            date: [{ date, payment: "non" }],
          });
          await newEtudient.save();
          results.push({ name, status: "added" });
        }
      }
  
      res.status(200).json({ message: "Processing complete", results });
    } catch (error) {
      console.error("Error adding etudient:", error);
      res.status(500).send("Failed to add etudient");
    }
  });
  
  

// Route to fetch and display all students
app.get('/afficher', async (req, res) => {
    try {
        // Fetch all students from the database
        const etudiants = await Etudiant.find();

        // Calculate the number of "payantes" and "non payantes" for each student
        const etudiantsWithTotals = etudiants.map((etudiant) => {
            let totalPayantes = 0;
            let totalNonPayantes = 0;

            etudiant.date.forEach((session) => {
                if (session.payment === "oui") {
                    totalPayantes++;
                } else if (session.payment === "non") {
                    totalNonPayantes++;
                }
            });

            // Return the student with totals
            return {
                ...etudiant._doc,
                totals: {
                    payantes: totalPayantes,
                    nonPayantes: totalNonPayantes,
                },
            };
        });

        // Send the fetched students with their totals as a JSON response
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: etudiantsWithTotals,
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching students: " + error.message,
        });
    }
});



app.patch('/update-payment/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
      // تحديث جميع حالات الدفع للطالب إلى "non"
      const updatedStudent = await Etudiant.findOneAndUpdate(
        { _id: studentId },
        {
          $set: {
            'date.$[].payment': 'oui', // تحديث حالة الدفع لجميع التواريخ إلى "non"
          },
        },
        { new: true } // إعادة السجل المحدث
      );
      if (updatedStudent) {
        res.status(200).json(updatedStudent);
      } else {
        res.status(404).send('Student not found');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).send('Error updating payment status');
    }
  });
  

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
