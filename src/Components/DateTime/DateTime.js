import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'time-elements';

class DateTime extends Component {
	render() {
		return (
			<local-time
				datetime={this.props.date}
				weekday='short'
				year='numeric'
				month='short'
				day='numeric'
				hour='numeric'
				minute='2-digit'
				second='2-digit'
			>
				Jan 1 1970
			</local-time>
		);
	}
};

DateTime.propTypes = {
	date: PropTypes.string.isRequired
};

export default DateTime;
