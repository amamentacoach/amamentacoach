import express  from 'express';
import path from 'path';
import routes from './routes';
import dotenv from 'dotenv';
import * as schedule from "node-schedule";
import sendPushNotification from './utils/sendPushNotification';

const app = express()

const rule = new schedule.RecurrenceRule();
rule.tz = 'America/Sao_Paulo'
rule.dayOfWeek = [0, new schedule.Range(0,6)]
rule.hour = 21;
rule.minute = 0;
schedule.scheduleJob(rule,sendPushNotification)

dotenv.config()
app.set('view engine','ejs');
app.use("/",express.static(path.resolve(__dirname, '..', 'public','apidoc')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 8080)