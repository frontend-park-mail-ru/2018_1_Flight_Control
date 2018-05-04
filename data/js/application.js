'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent =
    new window.ScoreboardComponent('.js-scoreboard-table');
const paginatorComponent =
    new window.PaginatorComponent('.js-scoreboard_paginator');

const application = document.getElementById('application');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const scoreboardSection = document.getElementById('scoreboard');
const menuSection = document.getElementById('menu');
const aboutSection = document.getElementById('about');
const profileSection = document.getElementById('profile');
const selectGameSection = document.getElementById('start');

const signupForm = document.getElementsByClassName('js-signup-form')[0];
const signinForm = document.getElementsByClassName('js-signin-form')[0];
const profileForm = document.getElementsByClassName('js-profile-form')[0];

const linksLogout = ['signin-link', 'signup-link'];
const linksAuth = ['logout-link', 'profile-link'];

/**
 * hide sections by array of strings (ids)
 * @param {Array} hide
 */
function hiddenLinks(hide) {
    hide.forEach(function (el) {
        document.getElementById(el).hidden = true;
    });
}

/**
 * show sections by array of strings (ids)
 * @param {Array} show
 */
function showLinks(show) {
    show.forEach(function (el) {
        document.getElementById(el).hidden = false;
    });
}

// const baseUrl = 'https://flightcontrol.herokuapp.com/api/user';
const baseUrl = 'http://localhost:8080/api/user';

const sections = {
    signup: signupSection,
    signin: signinSection,
    scoreboard: scoreboardSection,
    menu: menuSection,
    about: aboutSection,
    profile: profileSection,
    selectGame: selectGameSection
};

/**
 * Opens scoreboards table
 * @param {Number} page
 * @param {Number} countOnPage
 * @param {Number} step
 */
function openScoreboard(page = 1, countOnPage = 5, step = 5) {
    scoreboardComponent.clear();
    loadAllUsers(page, countOnPage)
        .then(users => {
            scoreboardComponent.data = users;
            scoreboardComponent.renderTmpl();
            paginatorComponent.data = users.length;
            paginatorComponent.renderTmpl(countOnPage, step, page, openScoreboard);
        })
        .catch(err => console.error(err));
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
    return httpModule.fetchPost({
        url: baseUrl + '/logout',
        isJson: true
    });
}

function loadAllUsers(page = 1, countOnPage = 1) {
    return httpModule.fetchPost({
        url: baseUrl + '/leaders',
        formData: {
            page: page,
            size: countOnPage
        },
        isJson: true
    });
}

//LOGIN
function onSubmitSigninForm(evt) {
    evt.preventDefault();
    const fields = ['email_in', 'pass_in'];
    const form = evt.currentTarget;
    const formElements = form.elements;
    const formdata = fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});

    if (!isEmail(formdata['email_in']) || !isPassword(formdata['pass_in'])) {
        document.getElementById("validation_signin").innerHTML = "Email or Password incorrect!";
        return;
    }
    const postData = {
        'email': formdata['email_in'],
        'pass': formdata['pass_in']
    };
    console.info('Authorithation user', postData);
    loginUser(postData)
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
        formData: user,
        isJson: true
    });
}

//---------------------------------
const fieldsMap = {
    'email': {
        'id': 'email_reg',
        'default': 'Email'
    },
    'name': {
        'id': 'username_reg',
        'default': 'Username'
    },
    'pass': {
        'id': 'pass_reg',
        'default': 'Password'
    },
    'repass': {
        'id': 'repass_reg',
        'default': 'Repeat password'
    }
};

//REGISTRATION
function onSubmitSignupForm(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formElements = form.elements;
    let tmp = document.getElementById('img-signup');
    let formdata = new FormData(form);


    function updateLabels() {
        const labels = document.getElementsByTagName('LABEL');
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor !== '') {
                let elem = document.getElementById(labels[i].htmlFor);
                if (elem)
                    elem.label = labels[i];
            }
        }
    }

    signupUser(formdata)
        .then(() => checkAuth())
        .then(() => openSection('menu'))
        .catch((exception) => {
            updateLabels();
            signupForm.reset();
            for (let field in fieldsMap) {
                let input = document.getElementById(fieldsMap[field]["id"]);
                input.style.borderColor = 'rgba(0, 0, 0)';
                let label = input.label;
                label.innerHTML = fieldsMap[field]["default"];
            }
            return exception.body;
        })
        .then((body) => {
            try {
                body = JSON.parse(body);
                if (body != null) {
                    if ("fieldName" in body && "errorMessage" in body) {
                        if (body["fieldName"] in fieldsMap) {
                            const el = document.getElementById(fieldsMap[body["fieldName"]]["id"]);
                            el.style.borderColor = 'rgba(221, 110, 90)';
                            el.label.innerHTML = body["errorMessage"];
                        }
                    }
                }
            } catch (e) {
                console.log("not json");
            }
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
    //const fields = ['email', 'password', 'password_repeat', 'username']
    const form = evt.currentTarget;
    const formElements = form.elements;
    /*const formdata = fields.reduce(function (allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});*/
    /*formdata.append('email', formElements['email']);
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
    }*/
    let formdata = new FormData(form);

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
            hiddenLinks(linksLogout);
            showLinks(linksAuth);
            //document.getElementById("user_name").innerHTML = me.username;
        })
        .catch(() => {
            hiddenLinks(linksAuth);
            showLinks(linksLogout);
        });
}

function loadMe() {
    return httpModule.fetchGet({
        url: baseUrl + '/logged'
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
    if (!email.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/)) {
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
    // profile: function () {
    // 	profileForm.removeEventListener('submit', onSubmitProfileForm);
    // 	profileForm.reset();
    // 	loadProfile();
    // 	profileForm.addEventListener('submit', onSubmitProfileForm);
    // }
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
    let target = evt.target;
    if (target.tagName.toLowerCase() !== 'a' && target.parentNode.tagName.toLowerCase() === 'a') {
        target = target.parentNode;
    }
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
    openSection(section);
});

checkAuth().then(() => openSection('menu'))
