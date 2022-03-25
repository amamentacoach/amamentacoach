import knex from '../database/connection';
import api from '../config/api';
import moment from 'moment';

interface ConsultaRaw{
    rows:any[]
}

interface OneSignalData{
    app_id: string
    include_player_ids: string[],
    template_id: string
}

async function sendOneSignalNotification(data: OneSignalData, include_player_ids: string[]) {
    const config = {
        headers:{Authorization:'Basic '+process.env.OS_API_KEY}
    };

    try{
        let resp = await api.post('/notifications', data, config)
        if(resp.status===200){
            if(resp.data.errors?.invalid_player_ids){
                const {invalid_player_ids} = resp.data.errors
                data["include_player_ids"] = include_player_ids.filter(value => !invalid_player_ids.includes(value))
                if(data["include_player_ids"].length>0){
                    resp = await api.post('/notifications',data,config)
                    if(resp.status===200){
                        console.log("Notificacoes enviadas")
                    }else{
                        console.log("Erro!", resp.data)
                    }
                }
            }else{
                console.log("Notificacoes enviadas")
            }
        }else{
            console.log("Erro!", resp.data)
        }
        return resp.data
    }catch(error){
        console.log(error)
        return error
    }
}

async function sendPushNotification(){
    console.log("Enviando notificacoes...")

    const maes = await knex('mae').select('id',  'user_id', 'score_15d', 'score_1m').whereNull('score_15d').orWhereNull('score_1m')

    console.log(maes)

    let include_player_ids_escala:string[] = [];

    for(const mae of maes){
        const bebe = await knex('bebe').select('data_parto').where('mae_id', '=', mae.id).first()
        const diff = moment(new Date()).diff(bebe.data_parto);
        const dias_vida = Math.trunc(moment.duration(diff).asDays())
        if(mae.score_15d === null && dias_vida>=13 ? true : mae.score_1m === null && dias_vida >= 27 ? true : false){
            if(mae.user_id) include_player_ids_escala.push(mae.user_id)
        }
    }

    if(include_player_ids_escala.length>0){
        
        console.log(include_player_ids_escala.length + " pessoas notificadas sobre a escala...")
        const data: OneSignalData = {
            app_id:process.env.OS_APP_ID || '',
            include_player_ids: include_player_ids_escala,
            template_id:'ea655058-f005-45c0-8b57-6f00024e567d'
        };

        try {
            await sendOneSignalNotification(data, include_player_ids_escala)
        }catch(error){
            console.log(error)
            return error
        }

    }else{
        console.log("Ninguem foi notificado sobre a escala!")
    }



    const users:ConsultaRaw = await knex.raw(
        'SELECT user_id ' +
        'FROM mae '+
        'WHERE user_id IS NOT NULL '+
        'AND ((SELECT EXTRACT(DAY FROM current_timestamp - RESPOSTA.data) AS DIF FROM RESPOSTA where RESPOSTA.mae_id=mae.id order by RESPOSTA.DATA DESC LIMIT 1)>=1 '+
        'OR (SELECT COUNT(*) FROM RESPOSTA where RESPOSTA.mae_id=mae.id) = 0)');

    const include_player_ids_diario:string[] = [];
    users.rows.map((value,i)=>{
        if(value.user_id && !include_player_ids_escala.includes(value.user_id)) include_player_ids_diario.push(value.user_id)
    })
    if(include_player_ids_diario.length>0){
        console.log(include_player_ids_diario.length + " pessoas notificadas sobre o diário...")
        const data: OneSignalData = {
            app_id:process.env.OS_APP_ID || '',
            include_player_ids: include_player_ids_diario,
            template_id:'8e387c4a-d553-4f7a-8f1f-b0215558929b'
        };

        try {
            await sendOneSignalNotification(data, include_player_ids_diario)
        }catch(error){
            console.log(error)
            return error
        } 
    }else{
        console.log("Ninguem foi notificado sobre o diário!")
    }
}


export async function sendPushNotificationAlta(){
    console.log("Enviando notificacoes de alta...")

    const internados = await knex('bebe').distinct('mae_id').where('local','<>','Casa')

    let include_player_ids_alta:string[] = [];

    for(const bebe of internados){
        const mae = await knex('mae').select('user_id').where('id','=', bebe.mae_id).first()
        if(mae.user_id) include_player_ids_alta.push(mae.user_id)
    }

    if(include_player_ids_alta.length>0){
        
        console.log(include_player_ids_alta.length + " pessoas notificadas sobre a alta...")
        const data: OneSignalData = {
            app_id:process.env.OS_APP_ID || '',
            include_player_ids: include_player_ids_alta,
            template_id:'97d90fb4-31c2-413c-a957-d1d05002cd0f'
        };

        try {
            await sendOneSignalNotification(data, include_player_ids_alta)
        }catch(error){
            console.log(error)
            return error
        }

    }else{
        console.log("Ninguem foi notificado sobre a alta!")
    }
}

export default sendPushNotification;