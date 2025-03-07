import mongoose from 'mongoose';

export class DatabaseConnection{

    mongoURI : string = "mongodb+srv://precios:ORZAzu17y4jWFF12@chequesgen.rhdwy7o.mongodb.net/RegistroDePrecios";

    connect(){
        mongoose.connect(this.mongoURI)
        .then(() => console.log('Conectado a MongoDB Atlas'))
        .catch((err) => console.error('Error al conectar a MongoDB Atlas', err));
    }
}