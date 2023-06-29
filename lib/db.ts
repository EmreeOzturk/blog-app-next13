import mongoose from 'mongoose';

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

const connectDB = async () => {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = mongoose.connections[0].readyState;
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  if (!connection.isConnected) {
    console.log('No active database connection to disconnect');
    return;
  }

  try {
    await mongoose.disconnect();
    connection.isConnected = 0;
    console.log('Successfully disconnected from the database');
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    process.exit(1);
  }
};

export default { connectDB, disconnectDB };
