import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AnimateSharedLayout, motion } from 'framer-motion'

import styles from './Search.module.scss'

const Button = styled.button`
	color: ${properties => properties.fontColor};
	font-size: ${properties => properties.fontSize};
`

const Search = ({
	activebgColor,
	fontColors,
	fontSize,
	searchLogic,
	setSearchLogic,
}) => (
	<div className={styles.searchLogicContainer}>
		<AnimateSharedLayout>
			<div className={styles.logicBtnContainer}>
				<Button
					fontSize={fontSize}
					className={classnames(
						styles.logicBtn,
						searchLogic === 'title' ? styles.active : '',
					)}
					fontColor={
						searchLogic === 'title' ? fontColors.active : fontColors.inActive
					}
					type="button"
					onClick={() => setSearchLogic('title')}
				>
					Title
					{searchLogic === 'title' && (
						<motion.div
							layoutId="searchLogic"
							initial={false}
							animate={{ backgroundColor: activebgColor }}
							transition={{
								type: 'spring',
								stiffness: 500,
								damping: 30,
							}}
						/>
					)}
				</Button>
			</div>
			<div className={styles.logicBtnContainer}>
				<Button
					fontSize={fontSize}
					fontColor={
						searchLogic === 'author' ? fontColors.active : fontColors.inActive
					}
					className={classnames(
						styles.logicBtn,
						searchLogic === 'author' ? styles.active : '',
					)}
					type="button"
					onClick={() => setSearchLogic('author')}
				>
					Author
					{searchLogic === 'author' && (
						<motion.div
							initial={false}
							animate={{ backgroundColor: activebgColor }}
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
							layoutId="searchLogic"
						/>
					)}
				</Button>
			</div>
		</AnimateSharedLayout>
	</div>
)

Search.defaultProps = {
	activebgColor: '#060930',
	fontColors: {
		active: '#ffffff',
		inActive: '#f4abc4',
	},
	fontSize: 16,
}

Search.propTypes = {
	activebgColor: PropTypes.string,
	fontColors: PropTypes.shape({
		active: PropTypes.string,
		inActive: PropTypes.string,
	}),
	fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	searchLogic: PropTypes.oneOf(['author', 'title']).isRequired,
	setSearchLogic: PropTypes.func.isRequired,
}

export default Search
