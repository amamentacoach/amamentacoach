import * as schedule from "node-schedule";
import sendPushNotification, { sendPushNotificationAlta, sendPushNotificationGestantes } from "./sendPushNotification";


export default () => {
    let rule = new schedule.RecurrenceRule();
    rule.tz = 'America/Sao_Paulo'
    rule.dayOfWeek = [0, new schedule.Range(0,6)]
    rule.hour = 21;
    rule.minute = 0;

    schedule.scheduleJob(rule, sendPushNotification)

    rule = new schedule.RecurrenceRule();
    rule.tz = 'America/Sao_Paulo'
    rule.dayOfWeek = [0, new schedule.Range(0, 6, 2)]
    rule.hour = 18;
    rule.minute = 0;

    schedule.scheduleJob(rule, sendPushNotificationAlta)

    rule = new schedule.RecurrenceRule();
    rule.tz = 'America/Sao_Paulo'
    rule.dayOfWeek = [0, new schedule.Range(0, 6, 2)]
    rule.hour = 20;
    rule.minute = 0;

    schedule.scheduleJob(rule, sendPushNotificationGestantes)
}