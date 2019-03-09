import React, { Component } from 'react';
import DateTime from './Components/DateTime/DateTime';
import '@stauffacher/sbbpoc';

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
				<sbb-footer>test</sbb-footer>
			</div>
		);
	}
}

export default App;
