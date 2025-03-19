import Router from "express"
import UserModel from "../models/User.js"
import { check, validationResult } from "express-validator"
export const router = Router()

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
			console.log("REQ BODY", req.body)

			const { email, password } = req.body

			let user = await UserModel.findOne({ email })

			if (user) {
				return res.status(300).json({ message: "Email is already exist" })
			}

			const hashedPassword = await bcrypt.hash(password, 12)

			user = new UserModel({ email, password: hashedPassword })
			await user.save()

			res.status(201).json({
				message: "Register is success",
			})
		} catch (error) {
			console.log(error)
		}
	}
)

router.post(
	"/login",
	[
		check("email", "Incorrect email").isEmail(),
		check("password", "Incorrect password").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			console.log("REQ BODY", req.body)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Incorrect data on login",
				})
			}

			const { email, password } = req.body

			const user = await UserModel.findOne({ email })

			if (!user) {
				return res.status(400).json({
					message: "User not found",
				})
			}

			const isMatched = await bcrypt.compare(password, user.password)

			console.log("isMatch", isMatched)

			if (!isMatched) {
				return res.status(400).json({
					message: "Password is not matches",
				})
			}

			const jwtSecret = "secret123"

			const token = jwt.sign(
				{
					userId: user.id,
				},
				jwtSecret,
				{ expiresIn: "7d" }
			)

			res.json({
				token,
				message: "Login is success",
			})
		} catch (error) {
			console.log(error)
		}
	}
)
