import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        orders: {
            type: [String],
            required: true,
        },
        status: {
            type: Boolean,
            default: false
        },
        ordered_at: {
            type: Date,
            default: Date.now()
        }
    },
    {
        versionKey: false
    },
);

export default model('Order', OrderSchema)