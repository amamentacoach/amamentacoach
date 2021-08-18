import { Schema, model } from 'mongoose'

interface ITelemetria {
    mae_id: string;
    acao: string;
    created_at?: Date;
  }

const TelemetriaSchema =  new Schema<ITelemetria>({
    mae_id : String,
    acao : String
}, {timestamps : true});

export default model<ITelemetria>('Telemetria', TelemetriaSchema);