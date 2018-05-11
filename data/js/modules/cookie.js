'use strict';
/**
 * Cookies module
 * @module modules/cookie
 */

(function() {
    /**
     * Cookies manager
     */
    class CookieModule {
        /**
         * Assignes inner var token
         */
        constructor() {
            this.cookieName = 'token';
            const cookies = document.cookie;
            const tokenCookieRepo = cookies.split(';')
                .filter((item)=>{
                    return item.includes(this.cookieName+'=');
                });
            if (tokenCookieRepo.length > 0) {
                this.token = tokenCookieRepo.pop();
                this.token = this.token.substr((this.cookieName+'=').length);
            } else {
                this.token = null;
            }
        }
        /**
         * Gets token value from cookies
         * @return {String|null} token
         */
        retrieveToken() {
            return this.token;
        }
        /**
         * Detaches token from cookies
         * @param {Promise|Error} response
         * @return {Promise|Error} response
         */
        detachToken(response) {
            document.cookie =
                this.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            this.token = null;
            return response;
        }
        /**
         * Sets token to cookies repository
         * @param {String} token
         */
        setToken(token) {
            this.token = token;
            let date = new Date();
            date.setTime(date.getTime() + (30*24*60*60*1000));
            document.cookie =
                this.cookieName + '=' + this.token
                +';expires='+date.toUTCString();
        }
        /**
         * Assign token from cookies
         * @param {Promise|Error} response
         * @return {Promise|Error} response
         */
        assignToken(response) {
            const headers = response.headers;
            if (headers.get('x-csrf-token')) {
                const token = headers.get('x-csrf-token');
                this.setToken(token);
            }
            return response;
        }
    }
    window.CookieModule = CookieModule;
})();
