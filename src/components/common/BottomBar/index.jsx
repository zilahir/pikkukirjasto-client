import React, { useState } from 'react'
import { useHistory } from 'react-router'
import HomeIcon from '@material-ui/icons/Home'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import MenuBookIcon from '@material-ui/icons/MenuBook'

// import UploadFile from '../UploadFile'

import { AnimateSharedLayout } from 'framer-motion'
import Tab from './components/Tab'
import styles from './BottomBar.module.scss'

const BOTTOM_NAV = [
	{
		key: 1,
		label: 'Home',
		icon: <HomeIcon htmlColor="#ffffff" fontSize="large" />,
		path: '/',
	},
	{
		key: 2,
		label: 'Add book',
		icon: <HowToVoteIcon htmlColor="#ffffff" fontSize="large" />,
		path: '/add',
	},
	{
		key: 3,
		label: 'Borrow book',
		icon: <MenuBookIcon htmlColor="#ffffff" fontSize="large" />,
		path: '/borrow',
	},
]

const BottomBar = () => {
	const history = useHistory()
	const [isActive, setIsActive] = useState(1)

	/**
	 * @param clickedScreen
	 */
	function handleNavigation(clickedScreen) {
		setIsActive(clickedScreen.key)
		history.push(clickedScreen.path)
	}
	return (
		<div className={styles.bottomBarContainer}>
			<AnimateSharedLayout>
				<ul className={styles.btnList}>
					{BOTTOM_NAV.map(menuItem => (
						<Tab
							isActive={menuItem.key === isActive}
							icon={menuItem.icon}
							label={menuItem.label}
							onClick={() =>
								handleNavigation({ path: menuItem.path, key: menuItem.key })
							}
						/>
					))}
				</ul>
			</AnimateSharedLayout>
		</div>
	)
}

export default BottomBar