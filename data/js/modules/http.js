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
		 * this contsructor set baseUrl
		 * @param {String} baseUrl
		 */
		constructor(baseUrl) {
			this._baseUrl = baseUrl;
		}

		/**
		 * this function return string baseUrl
		 * @returns {String} baseUrl
		 */
		getUrl() {
			return this._baseUrl;
		}

		/**
		 * this function set new baseUrl
		 * @param {String} newUrl
		 */
		setUrl(newUrl) {
			this._baseUrl = newUrl;
		}

		/**
		 * Function HTTP get request
		 * @param {String} url
		 * @returns {Promise<Response>}
		 */
	    fetchGet({url = '/'} = {}) {
	        return fetch(this._baseUrl + url, {
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
	    fetchPost({url = '/', formData = {}, isJson = false}) {
			let contentType = {};
			if(isJson) {
				contentType["Content-Type"] = "application/json; charset=utf-8";
			}

            return fetch(this._baseUrl + url, {
                method: 'POST',
                headers: contentType,
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(formData)
            })
			.then(checkStatus)
            .then(json)
            .catch( error => { throw error; });
	    }
	}
	window.HttpModule = HttpModule;
})();
