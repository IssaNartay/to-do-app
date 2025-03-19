import express from "express"
import mongoose from "mongoose"
import { router } from "./routes/auth.js"
import cors from "cors"

const app = express()
const PORT = 5000

app.use(express.json({ extended: true }))
app.use("/api/auth", router)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function start(req, res) {
	try {
		await mongoose.connect(
			"mongodb+srv://Issa:admin@cluster0.fo5nu.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"
			// {
			// 	useNewUrlParser: true,
			// 	useUnifiedTopology: true,
			// 	useCreateIndex: true,
			// 	useFindAndModify: true,
			// }
		)

		app.listen(PORT, () => {
			console.log("Server started on port 5000")
		})
	} catch (error) {
		console.error(error)
	}
}

start()
