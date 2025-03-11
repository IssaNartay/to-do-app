import Router from "express"
import UserModel from "../models/User"
const router = Router()

module.exports = router

router.post("/register", async (req, res) => {
	try {
		const { email, password } = req.body

		const isUsed = await UserModel.findOne({ email })

		if (!isUsed) {
			return res.status(300).json({
				message: "Email is already exist",
			})
		}

		const user = new UserModel({
			email,
			password,
		})

		await user.save()

    res.status(201).json({
      message: "Register is success"
    })
	} catch (error) {
		console.log(error)
	}
})
