import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({

});

const Client = mongoose.model('Client', ClientSchema);
export default Client;
