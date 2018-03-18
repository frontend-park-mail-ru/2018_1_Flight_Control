'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
//const scoreboardPaginator = new window.ScoreboardPaginator('.scoreboard_paginator')

const application = document.getElementById('application');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const scoreboardSection = document.getElementById('scoreboard');
const menuSection = document.getElementById('menu');

const subheader = document.getElementsByClassName('js-subheader')[0];
const signupForm = document.getElementsByClassName('js-signup-form')[0];
const signinForm = document.getElementsByClassName('js-signin-form')[0];

const baseUrl = 'https://flightcontrol.herokuapp.com/api/user/';
const baseUrl = 'http://localhost:3000';

const sections = {
	signup: signupSection,
	signin: signinSection,
	scoreboard: scoreboardSection,
	menu: menuSection
};

function openScoreboard() {
	scoreboardComponent.clear();

	loadAllUsers(function (err, users) {
		if (err) {
			console.error(err);
			return;
		}

		console.dir(users);
		scoreboardComponent.data = users;

	    //scoreboardComponent.renderDOM();
		scoreboardComponent.renderString();
		//scoreboardComponent.renderTmpl();
	});
}

function onSubmitSigninForm(evt) {
	evt.preventDefault();
	const fields = ['email', 'password'];

	const form = evt.currentTarget;
	const formElements = form.elements;

	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	/*if (!isEmail(formdata['email']) || !isPassword(formdata['password'])) {
        document.getElementById("validation_signin").innerHTML = "Email or Password incorrect!";
        return;
	}*/

    console.info('Authorithation user', formdata);
	loginUser(formdata)
		.then(() => checkAuth())
		.then(() => openSection('menu'))
		.catch(() => {
			signinForm.clear;
            document.getElementById("validation_signin").innerHTML = "wrong email or password";
        });

}

function loginUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + '/authenticate',
        formData: user
    });
}

function checkAuth() {
    return loadMe()
        .then (me => {alert('good'); alert(me.email)})
        .catch(() => alert("Неавторизован"));
}

function loadMe() {
    return httpModule.FetchGet({
        url: baseUrl + '/get'
    });
}

/*function checkAuth() {
    loadMe(function (err, me) {
        if (err) {
            subheader.textContent = 'Вы неавторизованы';
            return;
        }

        console.log('me is', me);
        subheader.textContent = `Привет, ${me.email}!!!`;
    });
}
function loadMe() {
    httpModule.FetchGet({
        url: baseUrl + '/me'
    });
}*/


function isPassword(password) {
    if (!password.match(/^[a-zA-Z0-9]+$/)) {
        return false;
    }
    return true;
}


function isEmail(email) {
    if (!email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)) {
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

function onSubmitSignupForm(evt) {
	evt.preventDefault();
	const fields = ['email', 'password', 'password_repeat', 'username'];
	const form = evt.currentTarget;
	const formElements = form.elements;

	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	if (validationSignup(formdata, (err) => {
		document.getElementById("validation_signup").innerHTML = err;
	})) {
		console.info('Registration user', formdata);
		signupUser(formdata, function (err, response) {
			if (err) {
				signupForm.reset();
				document.getElementById("validation_signup").innerHTML = "data incorrect!"
				return;
			}
			checkAuth();
			openSection('menu');
		});
	}
}

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


function loadAllUsers(callback) {
	httpModule.doGet({
		url: '/users',
		callback
	});
}

function signupUser(user, callback) {
	httpModule.doPost({
		url: '/signup',
		callback,
		data: user
	});
}




openSection('menu');
checkAuth();
