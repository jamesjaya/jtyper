import React from 'react';
import TypingState from '../data/TypingStateEnum';

class Timer extends React.Component {
	state = {
		time: 0,
		startTime: 0
	}

	start() {
		this.reset();
		this.resume();
	}

	stop() {
		clearInterval(this.timer);
	}

	pause() {
		clearInterval(this.timer);
	}

	resume() {
		this.timer = setInterval(() => {
			this.setState({
				time: new Date().getTime()
			})
		}, 1);
	}

	reset() {
		const curTime = new Date().getTime();

		this.setState({
			time: curTime,
			startTime: curTime
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.state === TypingState.PAUSED) {
			this.pause();
		} else if (this.props.state === TypingState.FINISHED) {
			this.stop();
		} else {
			if (prevProps.state === TypingState.READY && this.props.state === TypingState.STARTED) {
				this.start();
			}
		}
	}

	componentWillUnmount() {
		this.stop();
	}

	_getDuration() {
		return this.state.time - this.state.startTime;
	}

	_getSpeed() {
		return Math.floor(this.props.cursorPosition / 5 / (this._getDuration() / 1000 / 60));
	}

	render() {
		let duration = this._getDuration();
		duration = Math.floor(duration);
		const durationMs = duration % 1000; duration /= 1000; duration = Math.floor(duration);
		const durationSeconds = duration % 60; duration /= 60; duration = Math.floor(duration);
		const durationMinutes = duration;

		return (
			<div>
				<span>{durationMinutes.pad(2)}:{durationSeconds.pad(2)}:{durationMs.pad(3)}</span>
				<span>|</span>
				<span>{this.props.errorCount}</span>
				<span>|</span>
				<span>{this._getSpeed()}</span>
			</div>
			
		);
	}
}

export default Timer;