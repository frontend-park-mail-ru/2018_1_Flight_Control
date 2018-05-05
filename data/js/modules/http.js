'use strict';
/**
 * HTTP module
 * @module modules/http
 */

(function() {
    /**
     * Filters data by adding a csrf token if it exists
     * @param{String} token
     * @param {Object|FormData} formData
     * @return {Object}
     */
    const csrfFilterTmpl = function(token = null, formData = null) {
        if (token !== null) {
            formData['token'] = token;
        }
        return formData;
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
     * Attach token for csrfFilter
     * Detach if there is special key in response
     * Uses in the promise chain
     * @param {Promise|Response} response
     * @throws {Error}
     * @return {Promise|Response}
     */
    function assignToken(response) {
        const isEmpty = Object.keys(response).length === 0;
        if (!isEmpty && 'token' in response) {
            csrfFilter = csrfFilterTmpl;
            csrfFilter = csrfFilter.bind(null, response['token']);
        }
        if (!isEmpty && 'csrf' in response) {
            csrfFilter = csrfFilterTmpl;
            csrfFilter = csrfFilter.bind(null, null);
        }
        return response;
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
         * @return {Promise<Response>}
         */
        fetchPost({url = '/', formData = {}, multipart = false}) {
            formData = csrfFilter(formData);
            const withData = formData !== {};
            const headers = !multipart ? jsonHttpHeaders : noop();
            formData = withData && !multipart ?
                JSON.stringify(formData) :
                formData;
            return this.makeFetchPost(url, headers, formData)
                .then(checkStatus)
                .then(json)
                .then(assignToken)
                .catch( (error) => {
                    throw error;
                });
        }
    }
    window.HttpModule = HttpModule;
})();
