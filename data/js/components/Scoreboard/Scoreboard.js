'use strict';
(function() {
    /**
     * this class creates scoreboard html from scoreboard pug compiled template
     */
    class ScoreboardComponent {
        /**
         * Assigns to param dom element by id
         * @param {String} selector - scoreboard id
         */
        constructor(selector = 'body') {
            this._el = document.querySelector(selector);
        }

        /**
         * Returns scoreboards data
         * @return {*|Array}
         */
        get data() {
            return this._data;
        }

        /**
         * Sets data for scoreboard generation
         * @param {Array} data
         */
        set data(data) {
            this._data = data || [];
        }

        /**
         * Clear scoreboards html of dom element
         */
        clear() {
            this._el.innerHTML = '';
        }

        /**
         * Generates html
         * (from scoreboards compiled pug template)
         * for assigned dom element from setted data.
         */
        renderTmpl() {
            if (!this._data) {
                return;
            }
            const data = {'data': this._data};
            this._el.innerHTML = generateScoreboard(data);
        }
    }
    window.ScoreboardComponent = ScoreboardComponent;
})();
