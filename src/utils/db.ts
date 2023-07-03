import mongoose from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Désactive la création automatique des index (sécurité supplémentaire)
    connectTimeoutMS: 10000, // Temps d'attente maximum pour établir une connexion
    socketTimeoutMS: 45000, // Temps d'attente maximum pour les opérations de base de données
};

const MONGO_URI = process.env.MONGO_URI;

console.log('Trying to establish connection to MongoDB')

// Connexion à MongoDB
mongoose.connect(MONGO_URI || '', options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: any) => console.log('Failed to connect to MongBD', err));