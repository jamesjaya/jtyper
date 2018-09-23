import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppActionTypes from './AppActionTypes';
import Dispatcher from './Dispatcher';
import Mode from './ModeEnum';
import TextUtil from '../utils/TextUtil';

class AppStore extends ReduceStore {
	constructor() {
		super(Dispatcher);
		this.beep = new Audio('./audio/beep.mp3');
		console.log('here');
	}

	getInitialState() {
		return Immutable.Map({
			mode: Mode.SETTINGS,
			charset: '',
			text: '',
			cursorPosition: 0,
			errorPositions: Immutable.Map(),
		});
	}

	reduce(state, action) {
		switch (action.type) {
			case AppActionTypes.START_TRAINING: {
				return state
					.update('mode', value => Mode.TYPING)
					.update('charset', value => action.charset)
					.update('text', value => TextUtil.generateText(action.charset))
					.update('cursorPosition', value => 0);
			}
			case AppActionTypes.OPEN_SETTINGS: {
				return state.update('mode', value => Mode.SETTINGS);
			}
			case AppActionTypes.KEY_PRESS: {
				if (state.get('text').charAt(state.get('cursorPosition')) !== action.char) {
					this.beep.play();
					console.log('here');

					return state
						.update('errorPositions', errors => {
							return errors.set(state.get('cursorPosition'), true);
						});
				}

				return state
					.update('cursorPosition', value => value + 1);
			}
			default: {
				return state;
			}
		}
	}
}

export default new AppStore();