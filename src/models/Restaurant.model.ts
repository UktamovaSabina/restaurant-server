import { Schema, model } from "mongoose";

const RestaurantSchema = new Schema(
  {
    restaurant_name: {
      type: String,
      required: true,
    },
    restaurant_img_link: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false
  },
);

export default model('Restaurant', RestaurantSchema)