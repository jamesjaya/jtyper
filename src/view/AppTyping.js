import React from 'react';
import AppActions from '../data/AppActions';
import { Button } from 'reactstrap';
import classnames from 'classnames';

class AppTyping extends React.Component {
	_textBox = React.createRef();

	componentDidMount() {
		this._focusOnTextBox();
	}

	componentDidUpdate(prevProps, prevState) {
		this._focusOnTextBox();
	}

	_focusOnTextBox = () => {
		this._textBox.current.focus();
	}

	_onKeyPressed = (e) => {
		AppActions.keyPress(e.key);
	}

	_onBack = (e) => {
		AppActions.viewSettings();
	}

	_renderTextBox() {
		const text = [];
		for (let i = 0; i < this.props.text.length; i++) {
			const cx = classnames({
				'jtyper-typed': (i < this.props.cursorPosition),
				'jtyper-error': this.props.errorPositions.get(i),
				'jtyper-cursor': (i === this.props.cursorPosition)
			});
			text.push(<span className={cx}>{this.props.text.charAt(i)}</span>)
		}

		return (
			<div
				className="jtyper-text-box"
				tabIndex="0"
				onKeyPress={this._onKeyPressed}
				onBlur={this._focusOnTextBox}
				ref={this._textBox}>
				{text}
			</div>
		);
	}

	render() {
		return (
			<div className="jtyper-container d-flex flex-column justify-content-center align-items-center">
				{this._renderTextBox()}
				<Button
					className="primary"
					onClick={this._onBack}>
					Back
				</Button>
			</div>
		);
	}
}

export default AppTyping;