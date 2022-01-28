import knex from '../database/connection';
import api from '../config/api';
import { request } from 'express';

interface ConsultaRaw{
    rows:any[]
}

async function sendPushNotification(){
    console.log("Enviando notificacoes...")
    const users:ConsultaRaw = await knex.raw(
        'SELECT user_id ' +
        'FROM mae '+
        'WHERE user_id IS NOT NULL '+
        'AND ((SELECT EXTRACT(DAY FROM current_timestamp - RESPOSTA.data) AS DIF FROM RESPOSTA where RESPOSTA.mae_id=mae.id order by RESPOSTA.DATA DESC LIMIT 1)>=1 '+
        'OR (SELECT COUNT(*) FROM RESPOSTA where RESPOSTA.mae_id=mae.id) = 0)');
    if(users.rows.length>0){
        const include_player_ids:string[] = [];
        users.rows.map((value,i)=>{
            if(value.user_id) include_player_ids.push(value.user_id)
        })
        console.log(include_player_ids.length + " pessoas notificadas...")
        const data = {
            app_id:process.env.OS_APP_ID,
            include_player_ids,
            template_id:'8e387c4a-d553-4f7a-8f1f-b0215558929b'
        };
        const config = {
            headers:{Authorization:'Basic '+process.env.OS_API_KEY}
        };
        
        let response = await api.post('/notifications',data,config)
        if(response.status===200){
            if(response.data.errors?.invalid_player_ids){
                const {invalid_player_ids} = response.data.errors
                data["include_player_ids"] = include_player_ids.filter(value => !invalid_player_ids.includes(value))
                response = await api.post('/notifications',data,config)
                if(response.status===200){
                    console.log("Notificacoes enviadas")
                }else{
                    console.log("Erro!", response.data)
                }
            }else{
                console.log("Notificacoes enviadas")
            }
        }else{
            console.log("Erro!", response.data)
        }
        return response
    }else{
        console.log("Ninguem foi notificado!")
    }
}

export default sendPushNotification;