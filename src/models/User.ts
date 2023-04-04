import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  commits: Array<Schema.Types.ObjectId>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  commits: [{ type: Schema.Types.ObjectId, ref: 'Commit' }],
});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
