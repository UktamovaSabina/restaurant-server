import AdminModel from "../../models/Admin.model";
import jwt from "../../utils/jwt";

export default {
    Query: {
        admins: async () => {
            const admins = await AdminModel.find()
            return admins
        },
        admin: async (_, args) => {
            const { username, password } = args;
            try {
                const admin = await AdminModel.findOne({ username });
                
                if (!admin) {
                    throw new Error('Username or password is wrong')
                }
                if (admin?.password !== password) {
                    throw new Error('Username or password is wrong')
                }

                return {
                    status: 200,
                    message: "successfully logged in!",
                    token: jwt.sign({ userId: admin.id })
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