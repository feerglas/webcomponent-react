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
			results: [],
			title: {
				from: '',
				to: ''
			},
			showLoader: false
		};

		this.handleLangSwitch = this.handleLangSwitch.bind(this);
		this.footerRef = React.createRef();
		this.timetableResultsRef = React.createRef();
		this.CancelToken = axios.CancelToken;
		this.cancelRequest = false;
	}

	componentDidMount() {
		this.footerRef.current.addEventListener('sbb-language-selector_language-switch', this.handleLangSwitch);
	}

	componentWillUnmount() {
		this.footerRef.current.removeEventListener('sbb-language-selector_language-switch', this.handleLangSwitch);
	}

	handleLangSwitch(evt) {
		this.setState({
			language: evt.detail.language
		});

		window.scrollTo(0, 0);
	}

	handleSearch(from, to) {

		this.setState({
			showLoader: true
		});

		this.cancelRequest && this.cancelRequest();

		axios
			.get(`https://global-warmer.com/sbb/from/${from.id}/to/${to.id}`, {
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
					results: trips,
					title: {
						from: from.label,
						to: to.label
					},
					showLoader: false
				});
			})
			.catch((err) => {
				this.setState({
					showLoader: false
				});
				console.log('Error requesting Trips: ', err);
			});

	}

	render() {
		return (
			<div>
				<sbb-global-styles></sbb-global-styles>

				<sbb-webfonts></sbb-webfonts>

				<sbb-header role='banner' language={this.state.language} items={navItems}></sbb-header>

				<sbb-pagetitle additional-classes='var_centered' visuallyhidden='true' page-title='Startseite sbb.ch'></sbb-pagetitle>

				<TimetableSearch searchCallback={this.handleSearch.bind(this)} />

				<sbb-loader show={this.state.showLoader}></sbb-loader>

				<sbb-timetable-results-title
					from={this.state.title.from}
					to={this.state.title.to}
				></sbb-timetable-results-title>

				<TimetableResults results={this.state.results} />

				<sbb-homepage-main-teaser></sbb-homepage-main-teaser>

				<sbb-heading text='Rund um die SBB.' level='2'></sbb-heading>

				<sbb-deeplink-teasers
					titles-level='3'
					items={deeplinkItems}
				>
				</sbb-deeplink-teasers>

				<sbb-footer role='contentinfo' footertitle='Fusszeile'>

					<sbb-footer-columns>
						<sbb-footer-column>
							<sbb-footer-column-title columntitle='Kontakt'></sbb-footer-column-title>
							<sbb-footer-column-rte>
								<p>Haben Sie Fragen? Wir helfen Ihnen gerne. Bitte lesen Sie auch unsere Erklärung zum <a href='/de/meta/legallines/datenschutz.html'>Datenschutz</a>.</p>
							</sbb-footer-column-rte>
						</sbb-footer-column>
						<sbb-footer-column>
							<sbb-footer-column-title columntitle='Bahnverkehrsinformationen'></sbb-footer-column-title>
							<sbb-footer-column-rte>
								<p>Informationen über die aktuelle Betriebslage und Störungen auf dem Schweizer Schienennetz und über wichtige Behinderungen und Streiks im Ausland.</p>
							</sbb-footer-column-rte>
						</sbb-footer-column>
						<sbb-footer-column>
							<sbb-footer-column-title columntitle='Newsletter & Social Media'></sbb-footer-column-title>
							<sbb-footer-column-rte>
								<p>Jeden Monat über Angebote und Neuigkeiten informiert sein.</p>
							</sbb-footer-column-rte>
							<sbb-footer-column-link-list>
								<sbb-footer-column-link-list-item external='true' label='Facebook' href='https://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item external='true' label='Twitter' href='https://company.sbb.ch/de/immobilien.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item external='true' label='YouTube' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item external='true' label='Instagram' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item label='SBB News' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item label='SBB Community' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
							</sbb-footer-column-link-list>
						</sbb-footer-column>
						<sbb-footer-column>
							<sbb-footer-column-title columntitle='Über die SBB'></sbb-footer-column-title>
							<sbb-footer-column-link-list>
								<sbb-footer-column-link-list-item label='Unternehmen' href='https://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item label='SBB Immobilien' href='https://company.sbb.ch/de/immobilien.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item label='SBB Cargo' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item label='Jobs & Karriere' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
								<sbb-footer-column-link-list-item label='Medien & Dossiers' href='http://company.sbb.ch/de/home.html'></sbb-footer-column-link-list-item>
							</sbb-footer-column-link-list>
						</sbb-footer-column>
					</sbb-footer-columns>

					<sbb-footer-bottom>
						<sbb-language-selector language='de' ref={this.footerRef}></sbb-language-selector>
						<sbb-footer-links-bottom></sbb-footer-links-bottom>
					</sbb-footer-bottom>
				</sbb-footer>

			</div>
		);
	}
}

export default App;
