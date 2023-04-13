import { Link } from 'react-router-dom'
 
function Header() {
    return (
        <nav>
            <Link to="/">Home </Link>
			<Link to="/userparams">Settings </Link> {/* Change user in login (amontautparams) + cannot acces page if not logged in*/}
			<Link to="/Friends">Friends </Link>
			<Link to="/StatsAndMatch">Stats </Link>
            <Link to="/Chat">Chat </Link>
            <Link to="/WatchGame">Watch a live game </Link>
        </nav>
    )
}

export default Header