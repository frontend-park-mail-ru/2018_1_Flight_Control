'use strict';
/**
 * HTTP module
 * @module modules/http
 */

(function() {
    /**
     * Filters data by adding a csrf token if it exists
     * @param{String} token
     * @param {Object} headers
     */
    const csrfFilterTmpl = function(token = null, headers = null) {
        if (token !== null) {
            headers['X-CSRF-TOKEN'] = token;
        }
    };
    /**
     * Mutable binding filter for formData by passed token
     * @type {function(String=, (Object|FormData)=): (Object|FormData)}
     */
    let csrfFilter = csrfFilterTmpl;
    /**
     * Empty object for headers substitution
     * @type {Object}
     */
    const noop = () => {};
    /**
     * Empty functor for default callback in post requests
     * @type {Function}
     * @param {Promise} param
     * @return {Function} param
     */
    const pass = (param) => param;
    /**
     * String of HTTP header for show json Content Type
     * @type {Object}
     */
    const jsonHttpHeaders = {
        'Content-Type': 'application/json; charset=utf-8',
    };
    /**
     * check status response
     * @param {Response} response
     * @return {Response|Promise}
     * @throws {Error} throw err if status not valid
     */
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error();
            error.code = response.statusText;
            error.body = response.text();
            return Promise.reject(error);
        }
    }
    /**
     * Test response on empty and convert to json
     * if not empty response returns json otherwise return text promise
     * @param {Response} response
     * @return {Promise} Return promise
     */
    function json(response) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json();
        } else {
            return response.text();
        }
    }

    /**
     * Class create http module
     */
    class HttpModule {
        /**
         * binds csrf filter
         * @constructor
         */
        constructor() {
            csrfFilter = csrfFilter.bind(null, null);
        }
        /**
         * Function HTTP get request
         * @param {String} url
         * @return {Promise<Response>}
         */
        fetchGet({url = '/'} = {}) {
            return fetch(url, {
                method: 'GET',
                headers: jsonHttpHeaders,
                mode: 'cors',
                credentials: 'include',
            })
                .then(checkStatus)
                .then(json)
                .catch( (error) => {
                    throw error;
                });
        }
        /**
         * Returns fetched post request with params
         * @param {String} url
         * @param {Object} headers
         * @param {Object} formData
         * @return {Promise<Response>}
         */
        makeFetchPost(url, headers, formData) {
            return fetch(url, {
                method: 'POST',
                headers: headers,
                mode: 'cors',
                credentials: 'include',
                body: formData,
            });
        }
        /**
         * Function HTTP post request for json or multipart request
         * @param {String} url
         * @param {Object|FormData} formData
         * @example FormData case: content-type with boundary generates auto-ly
         * @param {Boolean} multipart
         * @param {Function} callback
         * @return {Promise<Response>}
         */
        fetchPost({
                      url = '/',
                      formData = {},
                      multipart = false,
                      callback = pass,
        }) {
            const withData = formData !== {};
            const headers = !multipart ? jsonHttpHeaders : {};
            csrfFilter(headers);
            formData = withData && !multipart ?
                JSON.stringify(formData) :
                formData;
            return this.makeFetchPost(url, headers, formData)
                .then(checkStatus)
                .then(callback)
                .then(json)
                .catch( (error) => {
                    throw error;
                });
        }
        /**
         * Attach token for csrfFilter
         * Detach if there is special key in response
         * Uses in the promise chain
         * @param {Promise|Response} response
         * @throws {Error}
         * @return {Promise|Response}
         */
        assignToken(response) {
            const headers = response.headers;
            if (headers.get('x-csrf-token')) {
                const token = headers.get('x-csrf-token');
                this.setToken(token);
            }
            return response;
        }
        /**
         * Bind token to csrfFilter
         * @param {String} token
         */
        setToken(token) {
            csrfFilter = csrfFilterTmpl;
            csrfFilter = csrfFilter.bind(null, token);
        }
        /**
         * Detach token
         * @param {Promise|Response} response
         * @throws {Error}
         * @return {Promise|Response}
         */
        detachToken(response) {
            this.setToken(null);
            return response;
        }
    }
    window.HttpModule = HttpModule;
})();
