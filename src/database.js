import mongoose from 'mongoose';
import {MONGODB_ATLAS_URI} from './config.js'

const connectToDatabase = async () => {
    try {
      await mongoose.connect(MONGODB_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      console.log('Database is connected successfully');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  };
  
  connectToDatabase();