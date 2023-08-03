import { Schema, model } from "mongoose";

const FoodSchema = new Schema(
    {
        food_name: {
            type: String,
            required: true,
        },
        food_img_link: {
            type: String,
            required: true,
        },
        food_price: {
            type: Number,
            required: true
        },
        restaurant_id: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    },
);

export default model('Food', FoodSchema)