import OrdersModel from '../../models/Orders.model';

export default {
    Query: {
        orders: async () => {
            try {
                const orders = await OrdersModel.find()
                return {
                    status: 200,
                    message: "success",
                    data: orders
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }

        },
        singleOrder: async (parent: any, { id }) => {
            try {
                const order = await OrdersModel.findOne({ _id: id });

                if (!order) {
                    throw new Error("Order is not found!")
                }
                return {
                    status: 200,
                    message: "success",
                    data: order
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
        orderFood: async (parent: any, { username, email, orders }) => {
            try {
                const order = await OrdersModel.create({ username, email, orders })
                return {
                    status: 200,
                    message: "ordered successfully",
                    data: order
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        },
        updateOrder: async (parent: any, { useername, orders, email, id, status }) => {
            try {
                const food = await OrdersModel.findByIdAndUpdate(id, { useername, orders, email, status }, { new: true })
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
        declineOrder: async (parent: any, { id }) => {
            try {
                const declinedOrder = await OrdersModel.findByIdAndDelete(id)
                return {
                    status: 200,
                    message: "deleted successfully",
                    data: declinedOrder
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message
                }
            }
        }
    }
}