import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './Button.module.scss'

const Button = ({ onClick, label, isDisabled, variant }) => (
	<button
		disabled={isDisabled}
		className={classnames(styles.button, styles[variant])}
		onClick={onClick}
		type="button"
	>
		{label}
	</button>
)

Button.defaultProps = {
	isDisabled: false,
	variant: 'default',
}

Button.propTypes = {
	isDisabled: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(['default', 'secondary']),
}

export default Button
