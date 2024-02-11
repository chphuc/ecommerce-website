import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { publicRoutes, privateRoutes } from './routes'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					{
						publicRoutes.map(route => {
							const Page = route.component
							const Layout = route.layout || Fragment
							return (
								<Route
									key={route.path}
									path={route.path}
									element={
										<Layout>
											{Page}
										</Layout>
									}
								/>
							)
						})
					}
					{
						privateRoutes.map(route => {
							const Page = route.component
							const Layout = route.layout || Fragment
							return (
								<Route
									key={route.path}
									path={route.path}
									element={
										<ProtectedRoute>
											<Layout>
												{Page}
											</Layout>
										</ProtectedRoute>
									}
								/>
							)
						})
					}
				</Routes>
				<Toaster
					position="top-center"
				/>
			</div>
		</Router>
	)
}

export default App
