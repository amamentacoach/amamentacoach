import express  from 'express';
import path from 'path';
import routes from './routes';

const app = express()

app.use("/",express.static(path.resolve(__dirname, '..', 'public','apidoc')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 8080)