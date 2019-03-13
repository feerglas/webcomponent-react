import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class TimetableSearch extends Component {

	constructor(props) {
		super(props);

		this.didSelectFromAutocomplete = {};

		// bind methods
		this.handleBlur = this.handleBlur.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSelection = this.handleSelection.bind(this);

		// refs
		this.searchOriginRef = React.createRef();
		this.searchDestinationRef = React.createRef();

		// axios
		this.CancelToken = axios.CancelToken;

		// autocomplete defaults
		const autocompleteDefaultSations = [
			{
				label: 'Bern',
				id: 8507000
			},
			{
				label: 'Zürich HB',
				id: 8503000
			},
			{
				label: 'Fribourg',
				id: 178
			},
			{
				label: 'Basel',
				id: 22
			},
			{
				label: 'Genève',
				id: 8501008
			}
		];

		// initial state
		this.state = {
			autocomplete: {
				origin: JSON.stringify(autocompleteDefaultSations),
				destination: JSON.stringify(autocompleteDefaultSations)
			},
			origin: {},
			destination: {}
		};

	}

	componentDidMount() {
		this.searchOriginRef.current.addEventListener('sbb-autocomplete_blur', this.handleBlur);
		this.searchOriginRef.current.addEventListener('sbb-autocomplete_input', this.handleInput);
		this.searchOriginRef.current.addEventListener('sbb-autocomplete_selection', this.handleSelection);
		this.searchDestinationRef.current.addEventListener('sbb-autocomplete_blur', this.handleBlur);
		this.searchDestinationRef.current.addEventListener('sbb-autocomplete_input', this.handleInput);
		this.searchDestinationRef.current.addEventListener('sbb-autocomplete_selection', this.handleSelection);
	}

	componentWillUnmount() {
		this.searchOriginRef.current.removeEventListener('sbb-autocomplete_blur', this.handleBlur);
		this.searchOriginRef.current.removeEventListener('sbb-autocomplete_input', this.handleInput);
		this.searchOriginRef.current.removeEventListener('sbb-autocomplete_selection', this.handleSelection);
		this.searchDestinationRef.current.removeEventListener('sbb-autocomplete_blur', this.handleBlur);
		this.searchDestinationRef.current.removeEventListener('sbb-autocomplete_input', this.handleInput);
		this.searchDestinationRef.current.removeEventListener('sbb-autocomplete_selection', this.handleSelection);
	}

	handleBlur(evt) {

		const type = evt.target.name;

		if (this.didSelectFromAutocomplete[type]) {
			return;
		}

		evt.target.value = JSON.parse(this.state.autocomplete[type])[0].label;

	}

	handleInput(evt) {
		const type = evt.target.name;
		const value = evt.detail.input;
		const cancelTokenKey = `${type}CancelToken`;
		const cancelToken = this[cancelTokenKey];

		this.didSelectFromAutocomplete[type] = false;

		if (value.length < 1) {
			return;
		}

		cancelToken && cancelToken();

		axios
			.get(`https://global-warmer.com/sbb/station-search/${value}`, {
				cancelToken: new this.CancelToken((cancelToken) => {
					this[cancelTokenKey] = cancelToken;
				})
			})
			.then((res) => {
				const locations = res.data.locations;

				if (locations && locations.length > 0) {
					const suggestions = locations.map(location => ({
						label: location.name,
						id: location.uic
					}));

					const newState = this.state;

					newState.autocomplete[type] = JSON.stringify(suggestions);
					newState[type] = suggestions[0];

					this.setState(newState);
					this.validateSearch();
				}
			}).catch((err) => {
				console.log('Error requesting Stations: ', err);
			});
	}

	handleSelection(evt) {
		const type = evt.target.name;
		const selection = evt.detail.selection;
		const newState = this.state;

		this.didSelectFromAutocomplete[type] = true;

		newState[type] = selection;

		this.setState(newState);

		this.validateSearch();
	}

	validateSearch() {
		const from = this.state.origin;
		const to = this.state.destination;

		if (!from.id || !to.id) {
			return;
		}

		this.props.searchCallback(from, to);
	}

	render() {
		return (
			<sbb-timetable-search>
				<sbb-autocomplete
					name='origin'
					suggestions={this.state.autocomplete.origin}
					ref={this.searchOriginRef}
					slot='origin'
					label='Von'
					placeholder='Von'
				></sbb-autocomplete>
				<sbb-autocomplete
					name='destination'
					suggestions={this.state.autocomplete.destination}
					ref={this.searchDestinationRef}
					slot='destination'
					label='Nach'
					placeholder='Nach'
				></sbb-autocomplete>
			</sbb-timetable-search>
		);
	}
}

TimetableSearch.propTypes = {
	searchCallback: PropTypes.func
};

export default TimetableSearch;
