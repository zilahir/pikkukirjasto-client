import React, { useState } from 'react'
import { useHistory } from 'react-router'
import HomeIcon from '@material-ui/icons/Home'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

import { AnimateSharedLayout } from 'framer-motion'
import Tab from './components/Tab'
import styles from './BottomBar.module.scss'
import { t } from '../../../utils/i18n/i18n'

const BOTTOM_NAV = [
	{
		key: 1,
		label: t('tabs.home'),
		icon: <HomeIcon htmlColor="#ffffff" fontSize="medium" />,
		path: '/',
	},
	{
		key: 2,
		icon: <HowToVoteIcon htmlColor="#ffffff" fontSize="medium" />,
		label: t('tabs.add-new'),
		path: '/add',
	},
	{
		key: 3,
		label: t('tabs.borrow'),
		icon: <MenuBookIcon htmlColor="#ffffff" fontSize="medium" />,
		path: '/borrow',
	},
	{
		key: 4,
		label: t('tabs.return'),
		icon: <KeyboardReturnIcon htmlColor="#ffffff" fontSize="medium" />,
		path: '/return',
	},
]

const BottomBar = () => {
	const history = useHistory()
	const [isActive, setIsActive] = useState(1)

	/**
	 * @param {object} clickedScreen object representation of the clicked screen
	 * @description handlels the navigation
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
