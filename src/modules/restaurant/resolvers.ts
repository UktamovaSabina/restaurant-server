import RestaurantModel from "../../models/Restaurant.model";
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload-ts';
import { resolve } from 'path';
import fs from 'fs';
import FoodModel from "../../models/Food.model";

export default {
    Query: {
        restaurants: async () => {
            try {
                const restaurants = await RestaurantModel.find()
                return {
                    status: 200,
                    message: "success",
                    data: restaurants
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }

        },
        singleRestaurant: async (parent: any, { id }) => {
            try {
                const restaurant = await RestaurantModel.findOne({ _id: id });

                if (!restaurant) {
                    throw new Error("Restaurant is not found!")
                }
                return {
                    status: 200,
                    message: "success",
                    data: restaurant
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        },
        foods: ()=>{
            return []
        },
    },
    Mutation: {
        createRestaurant: async (parent: any, { restaurant_name, file }) => {
            try {
                const { createReadStream, filename } = await file
                const stream = createReadStream();
                const imageName = Date.now().toString() + filename.toString();
                const restaurant_img_link = "http://localhost:4000/uploads/restaurants/" + imageName;
                const out = createWriteStream(resolve('uploads', 'restaurants', imageName));
                stream.pipe(out)
                const restaurant = await RestaurantModel.create({ restaurant_name, restaurant_img_link })
                return {
                    status: 200,
                    message: "created successfully",
                    data: restaurant
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        },
        updateRestaurant: async (parent: any, {restaurant_name, id})=>{
            try {
                const res = await RestaurantModel.findByIdAndUpdate(id, {restaurant_name}, { new: true })
                return {
                    status: 200,
                    message: "updated successfully",
                    data: res
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        },
        deleteRestaurant: async (parent: any, {id}) => {
            try {
                const res = await RestaurantModel.findById({_id: id});
                if(!res){
                    throw new Error("Restaurant is not found!")
                }
                fs.unlinkSync(resolve('uploads','restaurants', res.restaurant_img_link.split('/').at(- 1)))
                const deletedRes = await RestaurantModel.findByIdAndDelete(id)
                return {
                    status: 200,
                    message: "deleted successfully",
                    data: deletedRes
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        }
    },
    Upload: GraphQLUpload,
    Restaurant: {
        foods: async (parent: any)=>{
            const foods = await FoodModel.find();
            if(foods.length > 0){
                return foods.filter(f => f.restaurant_id == parent._id)
            }
            return []
        }
    }
}