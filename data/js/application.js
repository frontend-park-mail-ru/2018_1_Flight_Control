'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
const paginatorComponent = new window.PaginatorComponent('.js-scoreboard_paginator');

const application = document.getElementById('application');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const scoreboardSection = document.getElementById('scoreboard');
const menuSection = document.getElementById('menu');
const aboutSection = document.getElementById('about');
const profileSection = document.getElementById('profile');

const subheader = document.getElementsByClassName('js-subheader')[0];
const signupForm = document.getElementsByClassName('js-signup-form')[0];
const signinForm = document.getElementsByClassName('js-signin-form')[0];
const profileForm = document.getElementsByClassName('js-profile-form')[0];

const linksLogout = ['signin-link', 'signup-link'];
const linksAuth = ['logout-link', 'profile-link'];

function hiddenLinks(hide) {
	hide.forEach(function(el) {
		document.getElementById(el).hidden = true;
	});
}

function showLinks(show) {
	show.forEach(function(el) {
		document.getElementById(el).hidden = false;
	});
}

const baseUrl = 'https://flightcontrol.herokuapp.com/api/user';
//const baseUrl = 'http://localhost:3000';
//const baseUrl = 'https://flight-control-test.herokuapp.com';

const sections = {
	signup: signupSection,
	signin: signinSection,
	scoreboard: scoreboardSection,
	menu: menuSection,
	about: aboutSection,
	profile: profileSection
};

//SCOREBOARD
function openScoreboard(page = 1, countOnPage = 1, step = 2) {
    scoreboardComponent.clear();
    loadAllUsers(page, countOnPage)
        .then(users => {
	    	console.log(users);
            console.dir(users);
            scoreboardComponent.data = users.scorelist;
            //scoreboardComponent.renderString();
			scoreboardComponent.renderTmpl();
			paginatorComponent.data = users.length;
			paginatorComponent.renderTmpl(countOnPage, step, page, openScoreboard);
        })
        .catch(err => console.error(err));
    //scoreboardComponent.renderDOM();
    //
}

function onLogout() {
	logoutUser()
		.then(() => {
			hiddenLinks(linksAuth);
			showLinks(linksLogout);
		})
		.catch(err => console.error(err));
}


function logoutUser() {
	return httpModule.fetchGet({
		url: baseUrl + '/logout'
	});
}

function loadAllUsers(page = 1, countOnPage = 1) {
    return httpModule.fetchGet({
        url: baseUrl + '/users?countUsers=' + countOnPage + '&page=' + page
    });
}

//LOGIN
function onSubmitSigninForm(evt) {
	evt.preventDefault();
	const fields = ['email', 'pass'];
	const form = evt.currentTarget;
	const formElements = form.elements;
	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	if (!isEmail(formdata['email']) || !isPassword(formdata['pass'])) {
        document.getElementById("validation_signin").innerHTML = "Email or Password incorrect!";
        return;
	}

    console.info('Authorithation user', formdata);
	loginUser(formdata)
		.then(() => {
			hiddenLinks(linksLogout);
			showLinks(linksAuth);

			//checkAuth();
			//hiddenLinks(hiddenLinks());
			openSection('menu');
		})
		.catch(() => {
			signinForm.reset();
            document.getElementById("validation_signin").innerHTML = "wrong email or password";
        });
}

function loginUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + '/authenticate',
        formData: user
    });
}

//---------------------------------

//REGISTRATION
function onSubmitSignupForm(evt) {
    evt.preventDefault();
    //const fields = ['email', 'password', 'password_repeat', 'username', 'img'];
    //const fields = ['email', 'password', 'password_repeat', 'username']
    const form = evt.currentTarget;
    const formElements = form.elements;
    /*const formdata = fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});*/
	let formdata = new FormData();
	formdata.append('email', formElements['email']);
	formdata.append('password', formElements['password']);
	formdata.append('username', formElements['username']);
	formdata.append('img', formElements['img'].files[0]);

    /*if (!isPassword(formdata['password']) || !isEmail(formdata['email'])
		|| !isUsername(formdata['username'])){
        	document.getElementById("validation_signup").innerHTML = "Email or Password incorrect!";
        	return;
	}

	if (formdata['password'] !== formdata['password_repeat']) {
        document.getElementById("validation_signup").innerHTML = "passwords not equal!";
        return;
	}

	console.info('Registration user', formdata);*/
	signupUser(formdata)
		.then(() => checkAuth())
		.then(() => openSection('menu'))
		.catch(() => {
			signupForm.reset();
			document.getElementById("validation_signup").innerHTML = "data incorrect!";
		});

}

function signupUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + '/register',
        formData: user
    });
}
//-------------------------------------------------
//PROFILE
function onSubmitProfileForm(evt) {
	evt.preventDefault();
	let formdata = new FormData();
    //const fields = ['email', 'password', 'password_repeat', 'username']
    const form = evt.currentTarget;
    const formElements = form.elements;
    /*const formdata = fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});*/
	formdata.append('email', formElements['email']);
	formdata.append('password', formElements['password']);
	formdata.append('username', formElements['username']);
	formadata.append('img', formElements['img'].files[0]);

    if (!isPassword(formdata['password']) || !isEmail(formdata['email'])
        || !isUsername(formdata['username'])){
        document.getElementById("validation_profile").innerHTML = "Email or Password incorrect!";
        return;
    }

    if (formdata['password'] !== formdata['password_repeat']) {
        document.getElementById("validation_profile").innerHTML = "passwords not equal!";
        return;
    }

    console.info('change data user', formdata);
    changeProfileUser(formdata)
        .then(() => openSection('menu'))
        .catch(() => {
            profileForm.reset();
            document.getElementById("validation_profile").innerHTML = "data incorrect!";
        });

}

function changeProfileUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + '/change',
        formData: user
    });
}
//-----------------------------------------------------
//check cookie login

function checkAuth() {
    return loadMe()
        .then(me => {
			alert(me.username);
			hiddenLinks(linksLogout);
			showLinks(linksAuth);
			//document.getElementById("user_name").innerHTML = me.username;
		})
        .catch(() => {
			hiddenLinks(linksAuth);
			showLinks(linksLogout);
			alert("Неавторизован")
		});
}

function loadMe() {
    return httpModule.fetchGet({
        url: baseUrl + '/get'
    });
}

//-------------------------------------------------
//Check valid data
function isPassword(password) {
    if (!password.match(/^[a-zA-Z0-9]+$/)) {
        return false;
    }
    return true;
}

function isEmail(email) {
    //email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)
    if (!email.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/) ) {
        return false;
    }
    return true;
}

function isUsername(username) {
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
        return false;
    }
    return true;
}

//-----------------------------------------------------

function loadUser() {
	return httpModule.fetchGet({
		url: baseUrl + '/get/profile'
	});
}

function loadProfile() {
	loadUser()
		.then((user) => {
			document.getElementById('profile-username').innerText = user.username;
			document.getElementById('profile-email').innerText = user.email;
			document.getElementById('profile-score').innerText = user.score;
		})
		.catch(err => console.log(err));
}

const openFunctions = {
	scoreboard: openScoreboard,
	logout: onLogout,
	signup: function () {
		signupForm.removeEventListener('submit', onSubmitSignupForm);
		signupForm.reset();
		signupForm.addEventListener('submit', onSubmitSignupForm);
	},
	signin: function () {
		signinForm.removeEventListener('submit', onSubmitSigninForm);
		signinForm.reset();
		signinForm.addEventListener('submit', onSubmitSigninForm);
	},
	profile: function () {
        profileForm.removeEventListener('submit', onSubmitProfileForm);
        profileForm.reset();
        loadProfile();
        profileForm.addEventListener('submit', onSubmitProfileForm);
    }
};

function openSection(name) {
	Object.keys(sections).forEach(function (key) {
		sections[key].hidden = key !== name;
	});

	if (typeof openFunctions[name] === 'function') {
		openFunctions[name]();
	}
}

let isClickedChange = false;

function showChangeForm() {
	if (isClickedChange === false) {
		document.getElementById('profile-form').hidden = false;
		document.getElementById('change-profile-form').innerText = 'hide';
		isClickedChange = true;
	} else {
		document.getElementById('profile-form').hidden = true;
		document.getElementById('change-profile-form').innerText = 'change profile';
		isClickedChange = false;
	}
}

application.addEventListener('click', function (evt) {
	const target = evt.target;
	if (target.tagName.toLowerCase() !== 'a' || target.name === 'paginator-link') {
		return;
	}

	evt.preventDefault();

	const section = target.getAttribute('data-section');
	if (section == 'logout') {
		onLogout();
		return;
	}
	if (section == 'hide-profile-form') {
		showChangeForm();
		return;
	}

	console.log(`Открываем секцию`, section);
	openSection(section);
});

checkAuth().then(() => openSection('menu'))
