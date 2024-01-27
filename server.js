// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mongobase:kIEIIgosYwegoLB2@cluster2d.t3rpimy.mongodb.net/MongoBaseChat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err.message);
  });

const UtilisaSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Utilisateur = mongoose.model('Utilisateur', UtilisaSchema);

// const AutreSchema = new mongoose.Schema({
//   name: String,
//   age : Number,
// });

// const Autres = mongoose.model('autre', AutreSchema);

// app.get('/api/donnees-combinees', async (req, res) => {
//   try {

//     const [utilisateurs, autres] = await Promise.all([
//       Utilisateur.find().sort({ _id: 1 }).lean(),
//       Autres.find().sort({ _id: 1 }).lean()
//     ]);

//     const reponseCombinee = {
//       utilisateurs,
//       autres,
//     };

//     res.json(reponseCombinee);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des données combinées :', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


app.get('/api/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
