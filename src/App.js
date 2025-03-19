import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter } from "react-router-dom"

// import { LoginPage } from "./pages/LoginPage/LoginPage"
// import { RegisterPage } from "./pages/RegisterPage/RegisterPage"
import { useRoutes } from "./routes"
import { AuthContext } from "./context/auth.context"
import { useAuth } from "./hooks/auth.hook"

function App() {
	const { login, logout, token, userId, isReady } = useAuth()
	const isLogin = !!token
	const routes = useRoutes(isLogin)

	return (
		<AuthContext.Provider
			value={{ login, logout, token, userId, isReady, isLogin }}
		>
			<div className="App">
				<BrowserRouter>
					<Navbar />
					{routes}
				</BrowserRouter>
			</div>
		</AuthContext.Provider>
	)
}

export default App
