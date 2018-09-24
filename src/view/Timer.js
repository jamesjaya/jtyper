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

	componentDidUnmount() {
		this.stop();
	}

	render() {
		let duration = this.state.time - this.state.startTime;
		duration = Math.floor(duration);
		const durationMs = duration % 1000; duration /= 1000; duration = Math.floor(duration);
		const durationSeconds = duration % 60; duration /= 60; duration = Math.floor(duration);
		const durationMinutes = duration;

		return (
			<span>{durationMinutes.pad(2)}:{durationSeconds.pad(2)}:{durationMs.pad(3)}</span>
		);
	}
}

export default Timer;