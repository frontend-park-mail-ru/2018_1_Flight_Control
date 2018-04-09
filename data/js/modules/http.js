(function () {
	const noop = () => null;

	function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function json(response) {
		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
			return response.json();
		} else {
			return response.text();
		}
    }

  	class HttpModule {
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
            .catch(error => { throw error; });
	    }

	    fetchPost({url = '/', formData = {}}) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
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
