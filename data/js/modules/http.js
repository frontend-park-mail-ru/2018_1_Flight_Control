/**
 * HTTP module
 * @module modules/http
 */

(function () {
	const noop = () => null;

	/**
	 * check status response
	 * @param {Response} response
	 * @returns {Response}
	 * @throws {Error} throw err if status not valid
	 */
	function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

	/**
	 * Test response on empty and convert to json
	 * @param {Response} response
	 * @returns {Promise} Return promise if not empty return json otherwise return text promise
	 */
	function json(response) {
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
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
		 * @returns {Promise<Response>}
		 */
	    fetchGet({url = '/'} = {}) {
	        return fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				mode: 'cors',
				credentials: 'include'
            })
            .then(checkStatus)
            .then(json)
            .catch( error => { throw error; });
	    }

		/**
		 * Function HTTP post request
		 * @param {String} url
		 * @param {FormData} formData
		 * @returns {Promise<Response>}
		 */
	    fetchPost({url = '/', formData = {}}) {
            return fetch(url, {
                method: 'POST',
               /* headers: {
					'Content-Type': 'multipart/form-data'
                    //'Content-Type': 'application/json; charset=utf-8'
                },*/
                mode: 'cors',
                credentials: 'include',
                body: formData
            })
			.then(checkStatus)
            .then(json)
            .catch( error => { throw error; });
	    }
	}
	window.HttpModule = HttpModule;
})();
