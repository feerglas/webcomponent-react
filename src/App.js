import React, { Component } from 'react';
import DateTime from './Components/DateTime/DateTime';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			date: ''
		};
	}

	componentDidMount() {
		this.setState({
			date: '1970-03-10T00:00:00.000Z'
		});
	}

	update = () => {
		this.setState({
			date: new Date()
		});
	}

	render() {
		return (
			<div>
				<DateTime date={this.state.date} />
				<button onClick={this.update.bind(this)}>update</button>
				<sbb-webfonts
					config='[
					{
						"version": "1_6_subset"
					},
					{
						"styles": [
						{
							"name": "Roman",
							"include": true,
							"display": "fallback"
						},
						{
							"name": "Bold",
							"include": true,
							"display": "swap"
						},
						{
							"name": "Light",
							"include": true,
							"display": "swap"
						},
						{
							"name": "Ultralight",
							"include": true,
							"display": "swap"
						},
						{
							"name": "Thin",
							"include": true,
							"display": "swap"
						}
						]
					}
					]'
				></sbb-webfonts>
				<sbb-header items='{"de": [{ "title": "Fahrplan", "link": "#"}, { "title": "Abos & Billete", "link": "#"}, { "title": "Bahnhof & Services", "link": "#"}, { "title": "Geschäftskunden", "link": "#"}, { "title": "Freizeit & Ferien", "link": "#"}], "fr": [{ "title": "Horaire", "link": "#"}, { "title": "Abonnements et billets", "link": "#"}, { "title": "Gare et servicesa", "link": "#"}, { "title": "Clientèle commerciale", "link": "#"}, { "title": "Loisirs et vacances", "link": "#"}], "en": [{ "title": "Timetable", "link": "#"}, { "title": "Travelcards & tickets", "link": "#"}, { "title": "Station & services", "link": "#"}, { "title": "Business customers", "link": "#"}, { "title": "Leisure & holidays", "link": "#"}], "it": [{ "title": "Orario", "link": "#"}, { "title": "Abonamenti e biglietti", "link": "#"}, { "title": "Stazione e servizi", "link": "#"}, { "title": "Clientela aziendale", "link": "#"}, { "title": "Tempo libero e vacanze", "link": "#"}]}'></sbb-header>
				<sbb-timetable-search></sbb-timetable-search>
				<sbb-timetable-results></sbb-timetable-results>
				<sbb-homepage-main-teaser></sbb-homepage-main-teaser>
				<sbb-footer>test</sbb-footer>
			</div>
		);
	}
}

export default App;
