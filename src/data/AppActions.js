import AppActionTypes from './AppActionTypes';
import Dispatcher from './Dispatcher';

const Actions = {
	startTraining(charset) {
		Dispatcher.dispatch({
			type: AppActionTypes.START_TRAINING,
			charset
		});
	},
	viewSettings() {
		Dispatcher.dispatch({
			type: AppActionTypes.OPEN_SETTINGS
		});
	},
	keyPress(char) {
		Dispatcher.dispatch({
			type: AppActionTypes.KEY_PRESS,
			char
		});
	}
}

export default Actions;