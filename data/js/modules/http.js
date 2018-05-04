/**
 * HTTP module
 * @module modules/http
 */

(function() {
    /**
     * check status response
     * @param {Response} response
     * @return {Response}
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
         * Function HTTP get request
         * @param {String} url
         * @return {Promise<Response>}
         */
        static fetchGet({url = '/'} = {}) {
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
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
         * Function HTTP post request
         * @param {String} url
         * @param {Object} formData
         * @param {Boolean} isJson
         * @return {Promise<Response>}
         */
        static fetchPost({url = '/', formData = {}, isJson = false}) {
            let contentType = {};
            if (isJson) {
                contentType['Content-Type'] = 'application/json; charset=utf-8';
            }
            const isJsonWithData = isJson && Object.keys(formData).length > 0;
            formData = (isJsonWithData) ? JSON.stringify(formData) : formData;
            return fetch(url, {
                method: 'POST',
                headers: contentType,
                mode: 'cors',
                credentials: 'include',
                body: formData,
            })
                .then(checkStatus)
                .then(json)
                .catch( (error) => {
                    throw error;
                });
        }
    }
    window.HttpModule = HttpModule;
})();
