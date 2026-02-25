import express from 'express'
import cors from 'cors'; 
import logger from 'morgan'
import dotenv from 'dotenv'
import estudiantesRoutes from "./routes/estudiantes.routes.ts";
import docentesRoutes from "./routes/docentes.routes.ts";
import programasRoutes from "./routes/programas.routes.ts";

dotenv.config(); 

const port = process.env.PORT ?? 3000; 

const app = express(); 
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// routes
app.use("/api", estudiantesRoutes);
app.use("/api", docentesRoutes);
app.use("/api", programasRoutes);

app.listen(port, () => {
    console.log('Server running on port', port);
})
