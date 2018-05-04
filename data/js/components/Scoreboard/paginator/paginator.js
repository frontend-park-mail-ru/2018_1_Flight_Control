(function() {
    /**
     * this class create paginator
     */
    class PaginatorComponent {
        /**
         * create scoreboard
         * @param {String} selector - where was created scoreboard
         */
        constructor(selector = 'body') {
            this._el = document.querySelector(selector);
        }

        /**
         * return count elements in scoreboard
         * @return {Number}
         */
        get data() {
            return this._length;
        }

        /**
         * set count elements in scoreboard
         * @param length
         */
        set data(length) {
            this._length = length;
        }

        /**
         * clear data paginator
         */
        clear() {
            this._el.innerHTML = '';
        }

        /**
         * render template and write in html
         * @param {Number} countOnPage - count page on one page
         * @param {Number} step - step visible pages
         * @param {Number} page - current page
         * @param {Function} callback - function callback for paginators links
         */
        renderTmpl(countOnPage, step, page, callback) {
            let count = 1;
            if (count !== 0) {
                count = Math.ceil(this._length / countOnPage);
            }
            const data = {page:page, count:count, step:step};
            let template = generatePaginator(data);
            this._el.innerHTML = template;
            const paginatorLinks = document.getElementsByClassName('scoreboard__paginator-link');
            Array.prototype.forEach.call(paginatorLinks, (paginatorLink) => {
                paginatorLink.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    const target = evt.target;
                    const value = Number(target.innerHTML);
                    callback(value, countOnPage, step);
                });
            });
            const arrowLeft = document.getElementsByClassName('scoreboard__paginator-left');
            if (arrowLeft.length !== 0) {
                arrowLeft[0].addEventListener('click', (evt) => {
                    evt.preventDefault();
                    callback(page - 1, countOnPage, step);
                });
            }
            const arrowRight = document.getElementsByClassName('scoreboard__paginator-right');
            if (arrowRight.length !== 0) {
                arrowRight[0].addEventListener('click', (evt) => {
                    evt.preventDefault();
                    callback(page + 1, countOnPage, step);
                });
            }
        }
    }
    window.PaginatorComponent = PaginatorComponent;
})();
