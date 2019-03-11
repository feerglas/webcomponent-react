import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class TimetableSearch extends Component {

	constructor(props) {
		super(props);

		this.handleTimetableSearch = this.handleTimetableSearch.bind(this);
		this.timetableSearchRef = React.createRef();
		this.search = {
			origin: {},
			destination: {}
		};

		this.CancelToken = axios.CancelToken;
	}

	componentDidMount() {
		this.timetableSearchRef.current.addEventListener('sbb-timetable-search_change', this.handleTimetableSearch);
	}

	componentWillUnmount() {
		this.timetableSearchRef.current.removeEventListener('sbb-timetable-search_change', this.handleTimetableSearch);
	}

	handleTimetableSearch(evt) {
		const type = evt.detail.type;
		const value = evt.detail.value;
		const cancelTokenKey = `${type}CancelToken`;
		const cancelToken = this[cancelTokenKey];

		if (value.length < 1) {
			return;
		}

		cancelToken && cancelToken();

		axios
			.get(`http://global-warmer.com/station-search/${value}`, {
				cancelToken: new this.CancelToken((cancelToken) => {
					this[cancelTokenKey] = cancelToken;
				})
			})
			.then((res) => {
				const locations = res.data.locations;

				if (locations && locations.length > 0) {
					this.validateSearch(type, locations[0]);
				}
			}).catch((err) => {
				console.log('Error requesting Stations: ', err);
			});

	}

	validateSearch(type, location) {
		this.search[type] = location;

		if (this.search['origin'].uic && this.search['destination'].uic) {
			this.props.searchCallback(this.search);
		}
	}

	render() {
		return (
			<sbb-timetable-search ref={this.timetableSearchRef}></sbb-timetable-search>
		);
	}
}

TimetableSearch.propTypes = {
	searchCallback: PropTypes.func
};

export default TimetableSearch;
