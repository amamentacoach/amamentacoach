import { Schema, model } from 'mongoose'
import { Action, AppScreen } from '../../../common/Telemetria'

export interface ITelemetry {
  mae_id?: String;
  action: Action;
  context: Context;
  created_at: Date;
}

export interface Context {
  screen: AppScreen;
  target?: string;
}

const TelemetriaSchema =  new Schema<ITelemetry>({
    mae_id : { type : String, required : true },
    action : { type : Action, required : true },
    context : new Schema<Context>({
        screen: { type: AppScreen, required : true },
        target: String
    }),
    created_at : Date
});

export default model<ITelemetry>('Telemetria', TelemetriaSchema);