import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

class Loader extends Component {
	render() {
		if (!this.props.show) {
			return null;
		}

		return(
			<div className='spinner'>
				<div className='double-bounce1'></div>
				<div className='double-bounce2'></div>
			</div>
		);
	}
}

Loader.propTypes = {
	show: PropTypes.bool
};

export default Loader;
