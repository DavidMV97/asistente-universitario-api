import mysql from "mysql2/promise";
import dotenv from 'dotenv';
import envConfig from "../config/env.ts";

const { mysqlConfig } = envConfig ; 

dotenv.config();

export const pool = mysql.createPool(mysqlConfig);
