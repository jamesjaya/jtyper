import React, { Component } from 'react';
import './App.css';
import AppSetting from './view/AppSetting';
import AppTyping from './view/AppTyping';
import AppActions from './data/AppActions';
import Mode from './data/ModeEnum';

class App extends Component {
	_startTyping(charset) {
		AppActions.startTraining(charset);
	}

	renderView() {
		if (this.props.mode === Mode.SETTINGS) {
			return <AppSetting
				onStartClick={this._startTyping}
				charset={this.props.charset}
			/>;
		} else if (this.props.mode === Mode.TYPING) {
			return <AppTyping
				text={this.props.text}
				cursorPosition={this.props.cursorPosition}
				errorPositions={this.props.errorPositions}
				typingState={this.props.typingState}
			/>;
		}
	}

  render() {
    return (
      <div className="App container">
		  	{this.renderView()}
      </div>
    );
  }
}

export default App;
