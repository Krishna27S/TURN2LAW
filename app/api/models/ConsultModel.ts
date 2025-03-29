import mongoose, { Schema, Document } from "mongoose";

export interface IConsult extends Document {
    name: string;
    expertise: string;
}

const ConsultSchema = new Schema<IConsult>({
    name: { type: String, required: true },
    expertise: { type: String, required: true },
});

const ConsultModel = mongoose.models.Consult || mongoose.model<IConsult>("Consult", ConsultSchema);
export default ConsultModel;
