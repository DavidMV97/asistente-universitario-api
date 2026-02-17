import dotenv from 'dotenv';
dotenv.config();

const envConfig = {
  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};

export default envConfig; 