import React, { Component } from 'react';
import image1 from './homepage_crosslinks/1.jpg';
import image2 from './homepage_crosslinks/2.jpg';
import image3 from './homepage_crosslinks/3.jpg';
import image4 from './homepage_crosslinks/4.jpg';
import image5 from './homepage_crosslinks/5.jpg';
import image6 from './homepage_crosslinks/6.jpg';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			language: 'de'
		};

		this.handleLangSwitch = this.handleLangSwitch.bind(this);
		this.footerRef = React.createRef();

		this.deeplinkItems = `[ { "image": "${image1}", "title": "Günstig in der 1. Klasse nach Paris.", "text": "Reisen Sie direkt und bequem mitten ins Herz von Paris und lassen Sie sich an den Ufern der Seine verzaubern. Nicht verpassen: Noch bis zum 7. April sparen Sie dabei 30 Franken in der 1. Klasse!", "link": { "title": "Mehr info", "link": "#"} }, { "image": "${image2}", "title": "SwissPass - Ihr Schlüssel für Mobilität und Freizeit.", "text": "Rauf auf die Piste, rein ins Schneevergnügen. Laden Sie Ihren Skipass ganz einfach auf den SwissPass.", "link": { "title": "Mehr info", "link": "#"} }, { "image": "${image3}", "title": "Per WhatsApp noch schneller informiert.", "text": "Abonnieren Sie jetzt SBB WhatsApp und wir senden Ihnen regelmässig besonders günstige Angebote und Reisetipps für die Schweiz und unsere Nachbarländer.", "link": { "title": "Mehr info", "link": "#"} }, { "image": "${image4}", "title": "Spass im Schnee mit Snow’n’Rail.", "text": "Winterfreunde aufgepasst: Vom 1. März bis Saisonende sparen Sie beim Onlinekauf 20% auf die Reise mit dem ÖV in zahlreiche beliebte Skigebiete.", "link": { "title": "Mehr info", "link": "#"} }, { "image": "${image5}", "title": "Setzen Sie sich an die Spitze des Zuges.", "text": "Sie wollen Verantwortung übernehmen und Grosses bewegen? Informieren Sie sich jetzt über die bezahlte Zweitausbildung zur Lokführerin oder zum Lokführer.", "link": { "title": "Mehr info", "link": "#"} }, { "image": "${image6}", "title": "Gepäcklos unbeschwert in die Winterferien.", "text": "So einfach geht’s: Wir holen Ihr Gepäck bei Ihnen zuhause ab und liefern es direkt in Ihre Ferienunterkunft. Für ausgewählte Wintersportorte jetzt zu attraktiven Pauschalpreisen.", "link": { "title": "Mehr info", "link": "#"} } ]`;
	}

	componentDidMount() {
		this.footerRef.current.addEventListener('sbb-footer.language_switch', this.handleLangSwitch);
	}

	componentWillUnmount() {
		this.footerRef.current.removeEventListener('sbb-footer.language_switch', this.handleLangSwitch);
	}

	handleLangSwitch(evt) {
		this.setState({
			language: evt.detail.language
		});

		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div>
				<sbb-global-styles></sbb-global-styles>
				<sbb-webfonts></sbb-webfonts>
				<sbb-header language={this.state.language} items='{"de": [{ "title": "Fahrplan", "link": "#"}, { "title": "Abos & Billete", "link": "#"}, { "title": "Bahnhof & Services", "link": "#"}, { "title": "Geschäftskunden", "link": "#"}, { "title": "Freizeit & Ferien", "link": "#"}], "fr": [{ "title": "Horaire", "link": "#"}, { "title": "Abonnements et billets", "link": "#"}, { "title": "Gare et servicesa", "link": "#"}, { "title": "Clientèle commerciale", "link": "#"}, { "title": "Loisirs et vacances", "link": "#"}], "en": [{ "title": "Timetable", "link": "#"}, { "title": "Travelcards & tickets", "link": "#"}, { "title": "Station & services", "link": "#"}, { "title": "Business customers", "link": "#"}, { "title": "Leisure & holidays", "link": "#"}], "it": [{ "title": "Orario", "link": "#"}, { "title": "Abonamenti e biglietti", "link": "#"}, { "title": "Stazione e servizi", "link": "#"}, { "title": "Clientela aziendale", "link": "#"}, { "title": "Tempo libero e vacanze", "link": "#"}]}'></sbb-header>
				<sbb-timetable-search></sbb-timetable-search>
				<sbb-timetable-results></sbb-timetable-results>
				<sbb-homepage-main-teaser></sbb-homepage-main-teaser>

				<sbb-heading text='Rund um die SBB.' level='2'></sbb-heading>

				<sbb-deeplink-teasers
					titles-level='3'
					items={this.deeplinkItems}
				>
				</sbb-deeplink-teasers>

				<sbb-footer language='de' uselinks='false' ref={this.footerRef}></sbb-footer>
			</div>
		);
	}
}

export default App;
