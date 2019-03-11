import React, { Component } from 'react';
import TimetableSearch from './Components/TimetableSearch/TimetableSearch';
import TimetableResults from './Components/TimetableResults/TimetableResults';
import axios from 'axios';

import { navItems, deeplinkItems } from './data/data';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			language: 'de',
			results: []
		};

		this.handleLangSwitch = this.handleLangSwitch.bind(this);
		this.footerRef = React.createRef();
		this.timetableResultsRef = React.createRef();
		this.CancelToken = axios.CancelToken;
		this.cancelRequest = false;
	}

	componentDidMount() {
		this.footerRef.current.addEventListener('sbb-footer_language-switch', this.handleLangSwitch);
	}

	componentWillUnmount() {
		this.footerRef.current.removeEventListener('sbb-footer_language-switch', this.handleLangSwitch);
	}

	handleLangSwitch(evt) {
		this.setState({
			language: evt.detail.language
		});

		window.scrollTo(0, 0);
	}

	handleSearch(search) {

		this.cancelRequest && this.cancelRequest();

		axios
			.get(`http://global-warmer.com/from/${search.origin.uic}/to/${search.destination.uic}`, {
				cancelToken: this.CancelToken(function executor (c) {
					this.cancelRequest = c;
				}.bind(this))
			})
			.then((res) => {

				if (!res.data && !res.data.trips) {
					return;
				}

				const trips = res.data.trips;

				this.setState({
					results: trips
				});
			})
			.catch((err) => {
				console.log('Error requesting Trips: ', err);
			});

	}

	render() {
		return (
			<div>
				<sbb-global-styles></sbb-global-styles>

				<sbb-webfonts></sbb-webfonts>

				<sbb-header language={this.state.language} items={navItems}></sbb-header>

				<TimetableSearch searchCallback={this.handleSearch.bind(this)} />

				<TimetableResults results={this.state.results} />

				<sbb-homepage-main-teaser></sbb-homepage-main-teaser>

				<sbb-heading text='Rund um die SBB.' level='2'></sbb-heading>

				<sbb-deeplink-teasers
					titles-level='3'
					items={deeplinkItems}
				>
				</sbb-deeplink-teasers>

				<sbb-footer language='de' uselinks='false' ref={this.footerRef}></sbb-footer>
			</div>
		);
	}
}

export default App;
