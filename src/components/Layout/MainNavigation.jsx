import classes from './MainNavigation.module.css'
import { NavLink } from 'react-router-dom'

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>Create Quotes</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink to='/quotes' activeClassName='active'>
							All Quotes
						</NavLink>
					</li>
					<li>
						<NavLink to='/new-quote' activeClassName='active'>
							Add Quotes
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default MainNavigation
