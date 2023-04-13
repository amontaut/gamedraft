import React from "react"
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

//pages and components
import Header from "./components/Header"
import Home from './pages/Home'
import Settings from "./pages/Settings"
import Footer from "./components/Footer"
import Chat from "./pages/Chat"
import Error404 from "./pages/Error404"
import Friends from "./pages/Friends"
import StatsAndMatch from "./pages/StatsAndMatch"
import WatchLive from "./pages/WatchLive";

// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/userparams" element={<Settings />} /> {/* Change user in login (amontautparams) + cannot acces page if not logged in*/}
				<Route path="/Friends" element={<Friends />} />
				<Route path="/StatsAndMatch" element={<StatsAndMatch />} />
				<Route path="/Chat" element={<Chat />} />
				<Route path="/WatchGame" element={<WatchLive />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
			<Footer />
		</Router>
	</React.StrictMode>,
	// document.getElementById("root")
)
