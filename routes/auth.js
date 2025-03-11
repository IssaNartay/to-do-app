import Router from "express"
import UserModel from "../models/User.js"
import { check, validationResult } from "express-validator"
export const router = Router()

router.post(
	"/register",
	[
		check("email", "Incorrect email").isEmail(),
		check("password", "Incorrect password").isLength({ min: 6 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Incorrect data on register",
				})
			}

			const { email, password } = req.body

			let user = await UserModel.findOne({ email })

			if (user) {
				return res.status(300).json({ message: "Email is already exist" })
			}

			user = new UserModel({ email, password })
			await user.save()

			res.status(201).json({
				message: "Register is success",
			})
		} catch (error) {
			console.log(error)
		}
	}
)
