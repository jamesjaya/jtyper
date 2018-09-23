import React from 'react';
import { Button } from 'reactstrap';

class AppSetting extends React.Component {
	state = {
		charset: this.props.charset,
	}

	_onUpdateCharset = (e) => {
		this.setState({
			charset: e.target.value
		});
	}

	render() {
		return (
			<div className="jtyper-container d-flex flex-column justify-content-center align-items-center">
				<h1>jtyper</h1>
				<span>make your hands type faster</span>
				<div className="input-group jtyper-input">
					<input
						type="text"
						className="form-control"
						placeholder="Input all chars you would like to type with"
						value={this.state.charset}
						onChange={this._onUpdateCharset}
					/>
					<div className="input-group-append">
						<Button
							className="primary"
							onClick={() => { this.props.onStartClick(this.state.charset) }}>
							Start training
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default AppSetting;