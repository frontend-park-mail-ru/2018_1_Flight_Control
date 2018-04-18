//const baseUrl = 'https://flightcontrol.herokuapp.com/api/user';
const baseUrl = 'http://localhost:3000';
//const baseUrl = 'https://flight-control-test.herokuapp.com';

const httpModule = new window.HttpModule(baseUrl);

(function () {
	/**
	 * this class get user Api
	 */
	class UserApi {
		/**
		 * this function check valid username
		 * @param {String} username
		 * @return {boolean} is_valid
		 */
		isValidUsername(username) {
			const reg_username = /^[a-zA-Z0-9]+$/;
			return username.match(reg_username) ? true : false;
		}

		/**
		 * this function check valid email
		 * @param {String} email
		 * @return {boolean} is_valid
		 */
		isValidEmail(email) {
			const reg_email = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
			return email.match(reg_email) ? true : false;
		}

		/**
		 * this function check valid password
		 * @param {String} password
		 * @return {boolean} is_valid
		 */
		isValidPassword(password) {
			const reg_password = /^[a-zA-Z0-9]+$/;
			return password.match(reg_password) ? true : false;
		}

		/**
		 * Get request get information about application
		 * @return {Promise<Response>}
		 */
		getAbout() {
			return httpModule.fetchGet({
				url: '/about'
			});
		}

		/**
		 * Get request accept page & size and return top leaders
 		 * @param {Number} page
		 * @param {Number} count_on_page
		 * @return {Promise<Response>}
		 */
		getLeaders(page = 1, count_on_page = 1) {
			return httpModule.fetchGet({
				url: '/leaders?page=' + page + '&size=' + count_on_page
			});
		}

		/**
		 * Post request accept formdata for change profile
		 * @param {FormData} user
		 * @return {Promise<Response>}
		 */
		changeProfileUser(user) {
			return httpModule.fetchPost({
				url: '/change',
				formData: user
			});
		}

		/**
		 * Get request return information about user
		 * @return {Promise<Response>}
		 */
		loadUser() {
			return httpModule.fetchGet({
				url: '/get/profile'
			});
		}

		/**
		 * Get request check login user
		 * @return {Promise<Response>}
		 */
		checkAuth() {
			return httpModule.fetchGet({
				url: '/logged'
			});
		}

		/**
		 * Post request registraion user
		 * @param {FormData} user
		 * @returns {Promise<Response>}
		 */
		registationUser(user) {
			return httpModule.fetchPost({
				url: '/register',
				formData: user
			});
		}

		/**
		 * Post request login user
		 * @param {FormData} user
		 * @return {Promise<Response>}
		 */
		loginUser(user) {
			return httpModule.fetchPost({
				url: '/authenticate',
				formData: user,
				isJson: true
			});
		}

		/**
		 * Post request logout user
		 * @return {Promise<Response>}
		 */
		logoutUser() {
			return httpModule.fetchPost({
				url: '/logout'
			});
		}
	}

	window.UserApi = UserApi;
})();
