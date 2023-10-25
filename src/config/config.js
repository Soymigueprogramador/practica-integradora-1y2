import dotenv from 'dotenv'; 
import __dirname from '../utils.js';
console.log(__dirname);

dotenv.config({ override: true, path: __dirname + '/.env' });

export const  config = {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME
};
export default config; 