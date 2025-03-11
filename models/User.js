import { Types } from "mongoose"
import mongoose from "mongoose"

const UserModel = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	todos: [{ type: Types.ObjectId, ref: "Todo" }],
})

export default mongoose.model("User", UserModel)
