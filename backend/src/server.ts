import 'dotenv/config';
import express  from 'express';
import path from 'path';
import routes from './routes';
import mongoose from 'mongoose';
import scheduleJobs from './utils/scheduleJobs';
const cors = require('cors');

scheduleJobs()

const app = express()


const mongo_url = process.env.MONGO_URL || ""


mongoose.connect(mongo_url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
});

app.set('view engine','ejs');
app.use(cors())
app.use("/",express.static(path.resolve(__dirname, '..', 'public','apidoc')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`🌈 listening on ${port}`)
})
