import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false
  },
);

export default model('Admin', AdminSchema)