import FoodModel from '../../models/Food.model';
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload-ts';
import { resolve } from 'path';
import fs from 'fs';
import RestaurantModel from '../../models/Restaurant.model';

export default {
    Query: {
        foods: async () => {
            try {
                const foods = await FoodModel.find()
                return {
                    status: 200,
                    message: "success",
                    data: foods
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }

        },
        singleFood: async (parent: any, { id }) => {
            try {
                const food = await FoodModel.findOne({ _id: id });

                if (!food) {
                    throw new Error("Food is not found!")
                }
                return {
                    status: 200,
                    message: "success",
                    data: food
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        }
    },
    Mutation: {
        createFood: async (parent: any, { food_name, food_price, restaurant_id, file }) => {
            try {
                const { createReadStream, filename } = await file
                const stream = createReadStream();
                const imageName = Date.now().toString() + filename.toString();
                const food_img_link = "http://localhost:4000/uploads/foods/" + imageName;
                const out = createWriteStream(resolve('uploads', 'foods', imageName));
                stream.pipe(out)
                const food = await FoodModel.create({ food_name, food_price, restaurant_id, food_img_link })
                return {
                    status: 200,
                    message: "created successfully",
                    data: food
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        },
        updateFood: async (parent: any, { food_name, food_price, id }) => {
            try {
                const food = await FoodModel.findByIdAndUpdate(id, { food_price, food_name }, { new: true })
                return {
                    status: 200,
                    message: "updated successfully",
                    data: food
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        },
        deleteFood: async (parent: any, { id }) => {
            try {
                const food = await FoodModel.findById({ _id: id });
                if (!food) {
                    throw new Error("Food is not found!")
                }

                fs.unlinkSync(resolve('uploads', 'foods', food.food_img_link.split('/').at(- 1)))
                const deletedFood = await FoodModel.findByIdAndDelete(id)
                return {
                    status: 200,
                    message: "deleted successfully",
                    data: deletedFood
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
    Food: {
        restaurant: async (parent: any) => {
            const restaurants = await RestaurantModel.find();
            const [res] = restaurants.filter(r => {
                return r._id == parent.restaurant_id
            })
            return res.restaurant_name
        }
    }
}