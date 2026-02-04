import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'

dotenv.config(); 

const port = process.env.PORT ?? 3000; 
const app = express(); 
app.use(logger('dev'))

console.log(process.env.DB_DATABASE)

app.get('/', (req, res) => {
    res.send('<h1>Hola nodejs</h1>')
})

app.listen(port, () => {
    console.log('Server running on port', port);
})

/* Asistente universitario
    - Estudiantes
    - Docentes
    - Materias
*/ 