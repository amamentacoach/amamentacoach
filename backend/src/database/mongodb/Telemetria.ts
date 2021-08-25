import { Schema, model } from 'mongoose'

export interface ITelemetria {
    mae_id: string;
    acao: string;
    created_at?: Date;
  }

const TelemetriaSchema =  new Schema<ITelemetria>({
    mae_id : String,
    acao : String,
    created_at: Date
});

export default model<ITelemetria>('Telemetria', TelemetriaSchema);