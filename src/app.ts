import express from 'express';
import accountRoutes from './routes/account-routes';
import transactionRoutes from "./routes/transaction-routes";
import personRoutes from "./routes/person-routes";
import { setupSwaggerDocs } from './config/swagger';

const app = express();

app.use(express.json());

app.use((req, res, next) => {console.log(`Request received: ${req.method} ${req.url}`); next();});
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/people', personRoutes);

setupSwaggerDocs(app);


export default app;
