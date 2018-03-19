'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
//const scoreboardPaginator = new window.ScoreboardPaginator('.scoreboard_paginator')

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


//const baseUrl = 'https://flightcontrol.herokuapp.com/api/user/';
const baseUrl = 'http://localhost:3000';

const sections = {
	signup: signupSection,
	signin: signinSection,
	scoreboard: scoreboardSection,
	menu: menuSection,
	about: aboutSection,
	profile: profileSection
};

//SCOREBOARD
function openScoreboard() {
    scoreboardComponent.clear();
    loadAllUsers()
        .then(users => {
            console.dir(users);
            scoreboardComponent.data = users;
            //scoreboardComponent.renderString();
            scoreboardComponent.renderTmpl();
        })
        .catch(err => console.error(err));
    //scoreboardComponent.renderDOM();
    //
}


function loadAllUsers() {
    return httpModule.fetchGet({
        url: baseUrl + '/users'
    });
}

//LOGIN
function onSubmitSigninForm(evt) {
	evt.preventDefault();
	const fields = ['email', 'password'];
	const form = evt.currentTarget;
	const formElements = form.elements;
	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	if (!isEmail(formdata['email']) || !isPassword(formdata['password'])) {
        document.getElementById("validation_signin").innerHTML = "Email or Password incorrect!";
        return;
	}

    console.info('Authorithation user', formdata);
	loginUser(formdata)
		.then(() => checkAuth())
		.then(() => openSection('menu'))
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
    const fields = ['email', 'password', 'password_repeat', 'username'];
    const form = evt.currentTarget;
    const formElements = form.elements;
    const formdata = fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});

    if (!isPassword(formdata['password']) || !isEmail(formdata['email'])
		|| !isUsername(formdata['username'])){
        	document.getElementById("validation_signup").innerHTML = "Email or Password incorrect!";
        	return;
	}

	if (formdata['password'] !== formdata['password_repeat']) {
        document.getElementById("validation_signup").innerHTML = "passwords not equal!";
        return;
	}

	console.info('Registration user', formdata);
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
    const fields = ['email', 'password', 'password_repeat', 'username'];
    const form = evt.currentTarget;
    const formElements = form.elements;
    const formdata = fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});

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
    signupUser(formdata)
        .then(() => checkAuth())
        .then(() => openSection('menu'))
        .catch(() => {
            signupForm.reset();
            document.getElementById("validation_profile").innerHTML = "data incorrect!";
        });

}

function profileUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + '/change',
        formData: user
    });
}
//-----------------------------------------------------
//check cookie login

function checkAuth() {
    return loadMe()
        .then(me => {alert('good'); alert(me.email)})
        .catch(() => alert("Неавторизован"));
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

const openFunctions = {
	scoreboard: openScoreboard,
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

application.addEventListener('click', function (evt) {
	const target = evt.target;
	if (target.tagName.toLowerCase() !== 'a') {
		return;
	}

	evt.preventDefault();

	const section = target.getAttribute('data-section');

	console.log(`Открываем секцию`, section);
	openSection(section);
});

checkAuth().then(() => openSection('menu'))
