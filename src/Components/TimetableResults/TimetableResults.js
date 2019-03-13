import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimetableResults extends Component {
	render() {
		if (this.props.results.length < 1) {
			return null;
		}

		return (
			<sbb-timetable-results>
				{this.props.results.map((result, index) => {
					return (
						<sbb-timetable-result
							key={index}
							origin-location={result.from.name}
							origin-time={result.from.time}
							origin-track={result.from.track}
							destination-location={result.to.name}
							destination-time={result.to.time}
							destination-track={result.to.track}
						></sbb-timetable-result>
					);
				})}
			</sbb-timetable-results>
		);
	}
}

TimetableResults.propTypes = {
	results: PropTypes.array
};

export default TimetableResults;
