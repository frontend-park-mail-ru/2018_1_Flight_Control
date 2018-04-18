(function () {
	/**
	 * this class create scoreboard
	 */
	class ScoreboardComponent {
		/**
		 * create scoreboard
		 * @param {String} selector - where was created scoreboard
		 */
		constructor(selector = 'body') {
			this._el = document.querySelector(selector);
		}

		/**
		 * return data scoreboard
		 * @returns {*|Array}
		 */
		get data() {
			return this._data;
		}

		/**
		 * set data scoreboard
		 * @param data
		 */
		set data(data) {
			this._data = data || [];
		}

		/**
		 * clear scoreboard
 		 */
		clear() {
			this._el.innerHTML = '';
		}

		/**
		 * render scoreboard data and run template also write on html
		 */
		renderTmpl() {
			if (!this._data) {
				return;
			}

			const data = {'data': this._data};
			const template = generateScoreboard(data);
			this._el.innerHTML = template;
		}
	}

	window.ScoreboardComponent = ScoreboardComponent;
})();
