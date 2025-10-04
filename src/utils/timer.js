/* Timer class used for the metronome component */

class Timer {
  constructor(callback, timeInterval, options) {
    this.timeInterval = timeInterval;

    this.start = () => {
      // start timeout & save id to cancel it later
      this.expected = Date.now() + this.timeInterval;
      this.theTimeout = null;
      if (options.immediate) {
        callback();
      }
      this.timeout = setTimeout(this.round, this.timeInterval);
    };

    this.stop = () => {
      clearTimeout(this.timeout);
    };

    this.round = () => {
      // Runs the callback and adjusts the time
      let drift = Date.now() - this.expected;
      if (drift > this.timeInterval) {
        if (options.errorCallback) {
          options.errorCallback();
        }
      }
      callback();

      // Increment expected time every round after running callback
      this.expected += this.timeInterval;
      this.timeout = setTimeout(this.round, this.timeInterval - drift);
    };
  }
}

export default Timer;