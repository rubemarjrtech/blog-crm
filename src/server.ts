import express, { json } from 'express';
import { router } from './routes';

const app = express();
const PORT = 4000;

app.use(json());
app.use(router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
