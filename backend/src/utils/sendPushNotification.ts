import knex from '../database/connection';
import api from '../config/api';

async function sendPushNotification(){
    console.log("Enviando notificacoes...")
    const users:any[] = await knex.raw('SELECT user_id FROM mae WHERE (SELECT EXTRACT(DAY FROM current_timestamp - RESPOSTA.data) AS DIF FROM RESPOSTA where RESPOSTA.mae_id=mae.id order by RESPOSTA.DATA DESC LIMIT 1)>=1');

    if(users.length>0){
        const include_player_ids:string[] = [];
        users.map((value,i)=>include_player_ids.push(value.user_id))

        const data = {
            app_id:process.env.OS_APP_ID,
            include_player_ids,
            template_id:'8e387c4a-d553-4f7a-8f1f-b0215558929b'
        };
        const config = {
            headers:{Authorization:'Basic '+process.env.OS_API_KEY}
        };
        
        await api.post('/notifications',data,config)
    }
}

export default sendPushNotification;