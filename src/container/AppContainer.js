import App from '../App';
import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppStore from '../data/AppStore';

class AppContainer extends Component {
	static getStores(props) {
		return [
			AppStore
		];
	}

	static calculateState() {
		const state = AppStore.getState();
		return {
			mode: state.get('mode'),
			charset: state.get('charset'),
			text: state.get('text'),
			cursorPosition: state.get('cursorPosition'),
			errorPositions: state.get('errorPositions'),
			typingState: state.get('typingState')
		}
	}

	render() {
		return <App {...this.state}/>
	}
}

export default Container.create(AppContainer);