import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { publicRoutes, privateRoutes } from './routes'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<div>
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
			<Router>
				<Routes>
					{
						publicRoutes.map((route, index) => {
							let Layout = route.layout || Fragment

							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout>
											<route.component />
										</Layout>
									}
								/>
							)
						})
					}
					{
						privateRoutes.map((route, index) => {
							let Layout = route.layout || Fragment

							return (
								<Route
									key={index}
									path={route.path}
									element={
										<ProtectedRoute>
											<Layout>
												<route.component />
											</Layout>
										</ProtectedRoute>
									}
								/>
							)
						})
					}
				</Routes>
			</Router>
		</div>
	)
}

export default App
