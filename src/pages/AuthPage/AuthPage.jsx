import React, { useContext } from "react"
import { Switch, BrowserRouter, Link, Route } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/auth.context"

export const AuthPage = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	})

	const { login } = useContext(AuthContext)

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })
		console.log(form)
	}

	const registerHandler = async (event) => {
		event.preventDefault()

		try {
			await axios
				.post(
					"/api/auth/register",
					{ ...form },
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then((res) => {
					console.log(res)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const loginHandler = async (event) => {
		event.preventDefault()

		try {
			await axios
				.post(
					"/api/auth/login",
					{ ...form },
					{
						headers: {
							"Content-Type": "applictation/json",
						},
					}
				)
				.then((res) => {
					login(res.data.token, res.data.userId)
				})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<BrowserRouter>
			<Switch>
				<div className="container">
					<div className="auth-page">
						<Route path="/login">
							<h3 className="">Авторизация</h3>
							<form
								className="form form-login"
								onSubmit={(e) => e.preventDefault}
							>
								<div className="row">
									<div className="input-field col s12">
										<input
											type="email"
											name="email"
											className="validate"
											onChange={changeHandler}
										/>
										<label htmlFor="email">Почта</label>
									</div>
									<div className="input-field col s12">
										<input
											type="password"
											name="password"
											className="validate"
											onChange={changeHandler}
										/>
										<label htmlFor="password">Пароль</label>
									</div>
								</div>

								<div className="row">
									<button
										type="button"
										className="wawes-effect wawes-light btn blue"
										onClick={loginHandler}
									>
										Войти
									</button>
									<Link to="/register" className="btn-outline btn-reg">
										Нет акканута?
									</Link>
								</div>
							</form>
						</Route>

						<Route path="/register">
							<h3 className="">Регистрация</h3>
							<form
								className="form form-login"
								onSubmit={(e) => e.preventDefault}
							>
								<div className="row">
									<div className="input-field col s12">
										<input
											type="email"
											name="email"
											className="validate"
											onChange={changeHandler}
										/>
										<label htmlFor="email">Почта</label>
									</div>
									<div className="input-field col s12">
										<input
											type="password"
											name="password"
											className="validate"
											onChange={changeHandler}
										/>
										<label htmlFor="password">Пароль</label>
									</div>
								</div>

								<div className="row">
									<button
										type="button"
										className="wawes-effect wawes-light btn blue"
										onClick={registerHandler}
									>
										Регистрация
									</button>
									<Link to="/login" className="btn-outline btn-reg">
										Уже есть акканута?
									</Link>
								</div>
							</form>
						</Route>
					</div>
				</div>
			</Switch>
		</BrowserRouter>
	)
}
