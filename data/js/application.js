'use strict';

const userApi = new window.UserApi;
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
const paginatorComponent = new window.PaginatorComponent('.js-scoreboard_paginator');

const application = document.getElementById('application');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const scoreboardSection = document.getElementById('scoreboard');
const menuSection = document.getElementById('menu');
const aboutSection = document.getElementById('about');
const profileSection = document.getElementById('profile');
const selectGameSection = document.getElementById('select-game');

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

const sections = {
	signup: signupSection,
	signin: signinSection,
	scoreboard: scoreboardSection,
	menu: menuSection,
	about: aboutSection,
	profile: profileSection,
	selectGame: selectGameSection
};

//SCOREBOARD
function openScoreboard(page = 1, countOnPage = 1, step = 2) {
    scoreboardComponent.clear();
    userApi.getLeaders(page, countOnPage)
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
}

function onLogout() {
	userApi.logoutUser()
		.then(() => {
			hiddenLinks(linksAuth);
			showLinks(linksLogout);
		})
		.catch(err => console.error(err));
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

	if (formdata['email'] === '' || formdata['pass'] === '') {
		document.getElementById("validation_signin").innerHTML = "Empty input!";
		return;
	}
	if (!userApi.isValidEmail(formdata['email'])) {
        document.getElementById("validation_signin").innerHTML = "Email is incorrect!";
        return;
	}
	if (!userApi.isValidPassword(formdata['pass'])) {
		document.getElementById("validation_signin").innerHTML = "Password is incorrect!";
		return;
	}

	userApi.loginUser(formdata)
		.then(() => {
			hiddenLinks(linksLogout);
			showLinks(linksAuth);
			//checkAuth();
			openSection('menu');
		})
		.catch((err) => {
			signinForm.reset();
            document.getElementById("validation_signin").innerHTML = err.error;
        });
}
//---------------------------------

//REGISTRATION
function onSubmitSignupForm(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formElements = form.elements;

	if (formElements['email'].value === '' || formElements['password'].value === '' ||
		formElements['username'].value === '' || formElements['password_repeat'] === '')
	{
		document.getElementById("validation_signup").innerHTML = "Empty input!";
		return;
	}
    if (!userApi.isValidEmail(formElements['email'].value)) {
		document.getElementById("validation_signup").innerHTML = "Email incorrect!";
		return;
	}
	if (!userApi.isValidPassword(formElements['password'].value)) {
		document.getElementById("validation_signup").innerHTML = 'Password incorrect!';
		return;
	}
	if (formElements['password'].value !== formElements['password_repeat'].value) {
		document.getElementById("validation_signup").innerHTML = 'Password not equal!';
		return;
	}
	if (!userApi.isValidUsername(formElements['username'].value)) {
		document.getElementById("validation_signup").innerHTML = 'Username incorrect!';
		return;
	}

	userApi.registationUser(new FormData(form))
		.then(() => checkAuth())
		.then(() => openSection('menu'))
		.catch((err) => {
			signupForm.reset();
			document.getElementById("validation_signup").innerHTML = err.error;
		});

}
//-------------------------------------------------
//PROFILE
function onSubmitProfileForm(evt) {
	evt.preventDefault();
    const fields = ['email', 'password', 'password_repeat', 'username', 'img']
    const form = evt.currentTarget;
    const formElements = form.elements;
    const formdata = fields.reduce(function (allfields, fieldname) {
    	if (formElements[fieldname].value !== '') {
			allfields[fieldname] = formElements[fieldname].value;
			return allfields;
		}
    }, {});

	if (!formdata) {
		document.getElementById("validation_profile").innerHTML = "Empty input!";
		return;
	}

	if (formdata['email'] !== undefined && !userApi.isValidEmail(formdata['email'])) {
		document.getElementById("validation_signup").innerHTML = "Email incorrect!";
		return;
	}
	if (formdata['password'] !== undefined && !userApi.isValidPassword(formdata['password'])) {
		document.getElementById("validation_signup").innerHTML = 'Password incorrect!';
		return;
	}
	if (formdata['password'] !== formdata['password_repeat']) {
		document.getElementById("validation_signup").innerHTML = 'Password not equal!';
		return;
	}
	if (formdata['username'] !== undefined && !userApi.isValidUsername(formdata['username'])) {
		document.getElementById("validation_signup").innerHTML = 'Username incorrect!';
		return;
	}

    userApi.changeProfileUser(formdata)
        .then(() => openSection('menu'))
        .catch((err) => {
            profileForm.reset();
            document.getElementById("validation_profile").innerHTML = err.error;
        });

}

//-----------------------------------------------------
//check cookie login

function checkAuth() {
    return userApi.checkAuth()
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

//-----------------------------------------------------

function loadProfile() {
	userApi.loadUser()
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
