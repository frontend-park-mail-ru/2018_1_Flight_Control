'use strict';
/**
 * Module for simplifying http requests
 * @type {HttpModule}
 */
const httpModule =
    new window.HttpModule();
/**
 * Module for simplifying http requests
 * @type {CookieModule}
 */
const cookieModule =
    new window.CookieModule();
httpModule.setToken(cookieModule.retrieveToken());
/**
 * Module for handling scoreboard
 * @type {ScoreboardComponent}
 */
const scoreboardComponent =
    new window.ScoreboardComponent('.js-scoreboard-table');
/**
 * Module for handling paginator from scoreboard
 * @type {PaginatorComponent}
 */
const paginatorComponent =
    new window.PaginatorComponent('.js-scoreboard_paginator');

/**
 * Main element
 * @type {HTMLElement | null}
 */
const application = document.getElementById('application');
/**
 * Section for registering new users
 * @type {HTMLElement | null}
 */
const signupSection = document.getElementById('signup');
/**
 * Section for logging in
 * @type {HTMLElement | null}
 */
const signinSection = document.getElementById('signin');
/**
 * Section for scoreboard
 * @type {HTMLElement | null}
 */
const scoreboardSection = document.getElementById('scoreboard');
/**
 * Section for main menu
 * @type {HTMLElement | null}
 */
const menuSection = document.getElementById('menu');
/**
 * Section for about application page
 * @type {HTMLElement | null}
 */
const aboutSection = document.getElementById('about');
/**
 * Section for profile's page
 * @type {HTMLElement | null}
 */
// const profileSectionHidden = document.getElementById('profile');
/**
 * Section for changing users information (like in signup section)
 * @type {HTMLElement | null}
 */
const profileSection = document.getElementById('profile');
/**
 * Game section (now under game branch in development)
 * @type {HTMLElement | null}
 */
const selectGameSection = document.getElementById('start');
/**
 * Form element for registering new users
 * @type {Element}
 */
const signupForm = document.getElementsByClassName('js-signup-form')[0];
/**
 * Form element for signing in
 * @type {Element}
 */
const signinForm = document.getElementsByClassName('js-signin-form')[0];
/**
 * Form element for changing users information
 * @type {Element}
 */
const profileForm = document.getElementsByClassName('js-profile-form')[0];
/**
 * Links that we need to show when we logout user from application
 * @type {Array}
 */
const linksLogout = ['signin-link', 'signup-link'];
/**
 *
 * @type {Array}
 */
const linksAuth = ['logout-link', 'profile-link'];
/**
 * Colors for the text of form fields
 * @type {Object}
 */
const formInputColors = {
    'default': 'rgba(0, 0, 0)',
    'warning': 'rgba(221, 110, 90)',
};
/**
 * Map for finding and error handling fields by server's response
 * @type {Object}
 */
const fieldsMap = {
    'email': {
        'id': 'email_reg',
        'default': 'Email',
    },
    'name': {
        'id': 'username_reg',
        'default': 'Username',
    },
    'pass': {
        'id': 'pass_reg',
        'default': 'Password',
    },
    'repass': {
        'id': 'repass_reg',
        'default': 'Repeat password',
    },
};
/**
 * hide sections by array of ids
 * @param {Array} hide
 */
function hiddenLinks(hide) {
    hide.forEach(function(el) {
        document.getElementById(el).hidden = true;
    });
}

/**
 * show sections by array of ids
 * @param {Array} show
 */
function showLinks(show) {
    show.forEach(function(el) {
        document.getElementById(el).hidden = false;
    });
}

/**
 * Servers addition path to the domain name
 * @type {string}
 */
const linkToIp = '/api';
/**
 * @type {Map} map of prefixes by their type
 */
const linksByType = {
    'private': '/user',
    'public': '/users',
    'entry': '/entry',
};
/**
 * Server that has cors configuration for https://flightcontrolfrontend.herokuapp.com
 * @type {string}
 */
// const baseUrl = 'https://flightcontrol.herokuapp.com' + linkToIp;
const baseUrl = 'http://localhost:8080' + linkToIp;

/**
 * Map of section elements
 * @type {Object}
 */
const sections = {
    signup: signupSection,
    signin: signinSection,
    scoreboard: scoreboardSection,
    menu: menuSection,
    about: aboutSection,
    profile: profileSection,
    selectGame: selectGameSection,
};

/**
 * Renders scoreboards table promise chain
 * @param {Number} page
 * @param {Number} countOnPage
 * @param {Number} step
 */
function openScoreboard(page = 1, countOnPage = 2, step = 1) {
    scoreboardComponent.clear();
    loadAllUsers(page, countOnPage)
        .then( (users) => {
            scoreboardComponent.data = users;
            scoreboardComponent.renderTmpl();
            paginatorComponent.data = users.count;
            paginatorComponent.renderTmpl(
                countOnPage,
                step,
                page,
                openScoreboard
            );
        })
        .catch( (err) => console.error(err));
}

/**
 * Logout promise chain action,
 * Then we need to hide some links available for logged in
 */
function onLogout() {
    logoutUser()
        .then(() => {
            hiddenLinks(linksAuth);
            showLinks(linksLogout);
        })
        .catch( (err) => console.error(err));
}
/**
 * Makes logout for user if he was logged in
 * @return {Promise<Response>}
 */
function logoutUser() {
    return httpModule.fetchPost({
        url: baseUrl + linksByType['private'] + '/logout',
        callback: (response) => {
            response = cookieModule.detachToken(response);
            response = httpModule.detachToken(response);
            return response;
        },
    });
}
/**
 * Loads scoreboards table information
 * @param {Number} page number of page
 * @param {Number} countOnPage count of elements for page
 * @return {Promise<Response>}
 */
function loadAllUsers(page = 1, countOnPage = 1) {
    return httpModule.fetchPost({
        url: baseUrl + linksByType['public'] + '/leaders',
        formData: {
            page: page,
            size: countOnPage,
        },
    });
}
/**
 * Event on submit users logining form
 * @param {Event} evt
 */
function onSubmitSigninForm(evt) {
    evt.preventDefault();
    const fields = ['email_in', 'pass_in'];
    const form = evt.currentTarget;
    const formElements = form.elements;
    const formdata = fields.reduce(function(allfields, fieldname) {
        allfields[fieldname] = formElements[fieldname].value;
        return allfields;
    }, {});

    if (!isEmail(formdata['email_in']) || !isPassword(formdata['pass_in'])) {
        document.getElementById('validation_signin').innerHTML =
            'Email or Password incorrect!';
        return;
    }
    const postData = {
        'email': formdata['email_in'],
        'pass': formdata['pass_in'],
    };
    loginUser(postData)
        .then(() => {
            hiddenLinks(linksLogout);
            showLinks(linksAuth);
            openSection('menu');
        })
        .catch(() => {
            signinForm.reset();
            document.getElementById('validation_signin').innerHTML =
                'wrong email or password';
        });
}

/**
 * Makes request for login the user
 * @param {Object} user - account credentials from users input
 * @return {Promise<Response>}
 */
function loginUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + linksByType['entry'] + '/authenticate',
        formData: user,
        callback: (response)=> {
            response = cookieModule.assignToken(response);
            response = httpModule.assignToken(response);
            return response;
        },
    });
}

/**
 * Attaches label reference to documents elements
 * By for attribute of label elements
 */
function updateLabels() {
    const labels = document.getElementsByTagName('LABEL');
    for (let label of labels) {
        let forId = label.htmlFor;
        let elem = document.getElementById(forId);
        if (elem) {
            elem.label = label;
        }
    }
}

/**
 * Updates labels of form by their id in the map
 * @param {Object} body
 * @param {Error} exception
 */
function resetForm(body) {
    updateLabels();
    signupForm.reset();
    for (let field of Object.keys(fieldsMap)) {
        let input = document.getElementById(fieldsMap[field]['id']);
        input.style.borderColor = formInputColors['default'];
        let label = input.label;
        label.innerHTML = fieldsMap[field]['default'];
    }
    return body;
}
/**
 * Registering submit handler
 * @param {Event} evt - event on signup form submit
 */
function onSubmitSignupForm(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    let formdata = new FormData(form);
    signupUser(formdata)
        .then(() => checkAuth())
        .then(() => openSection('menu'))
        .catch((exception)=>{
            return exception.body;
        })
        .then(resetForm)
        .then((body) => {
            try {
                body = JSON.parse(body);
                if (body != null) {
                    if ('fieldName' in body && 'errorMessage' in body) {
                        if (body['fieldName'] in fieldsMap) {
                            const el = document.getElementById(
                                fieldsMap[body['fieldName']]['id']
                            );
                            el.style.borderColor = formInputColors['warning'];
                            el.label.innerHTML = body['errorMessage'];
                        }
                    }
                }
            } catch (e) {
                (()=>{})();
            }
        });
}
/**
 * Http request for register new user
 * @param {FormData} user - form of account credentials
 * @return {Promise<Response>}
 */
function signupUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + linksByType['entry'] + '/register',
        formData: user,
        multipart: true,
        callback: (response) => {
            response = cookieModule.assignToken(response);
            response = httpModule.assignToken(response);
            return response;
        },
    });
}

/**
 * Handle submiting of information to change
 * @param {Event} evt
 */
function onSubmitProfileForm(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    let formdata = new FormData(form);

    console.info('change data user', formdata);
    changeProfileUser(formdata)
        .then(() => openSection('menu'))
        .catch(() => {
            profileForm.reset();
            document.getElementById('validation_profile').innerHTML =
                'data incorrect!';
        });
}
/**
 * Request for changing user information
 * @param {Object} user
 * @return {Promise<Response>}
 */
function changeProfileUser(user) {
    return httpModule.fetchPost({
        url: baseUrl + linksByType['private'] + '/change',
        formData: user,
        multipart: true,
    });
}

/**
 * Checks that the user was logged in
 * @return {Promise<Response>}
 */
function checkAuth() {
    return loadMe()
        .then( (me) => {
            hiddenLinks(linksLogout);
            showLinks(linksAuth);
        })
        .catch(() => {
            hiddenLinks(linksAuth);
            showLinks(linksLogout);
        });
}

/**
 * Sends request that the user was logged in
 * @return {Promise<Response>}
 */
function loadMe() {
    return httpModule.fetchGet({
        url: baseUrl + linksByType['public'] + '/logged',
    });
}

/**
 * Loads profile information to section
 */
function loadProfile() {
    loadUser()
        .then((user) => {
            if (user.avatar) {
                document.getElementById('profile-avatar').src=
                    user.avatar;
            } else {
                document.getElementById('profile-avatar').src=
                    '/img/avatar.png';
            }
            document.getElementById('profile-username').innerText =
                user.name;
            document.getElementById('profile-email').innerText =
                user.email;
            document.getElementById('profile-score').innerText =
                user.rate;
        })
        .catch( (err) => console.log(err));
}
/**
 * Loads current user information
 * @return {Promise<Response>}
 */
function loadUser() {
    return httpModule.fetchGet({
        url: baseUrl + linksByType['private'] + '/get',
    });
}

/**
 * Map for lambdas by section's name
 * @type {Object}
 */
const openFunctions = {
    scoreboard: openScoreboard,
    logout: onLogout,
    signup: function() {
        signupForm.removeEventListener('submit', onSubmitSignupForm);
        signupForm.reset();
        signupForm.addEventListener('submit', onSubmitSignupForm);
    },
    signin: function() {
        signinForm.removeEventListener('submit', onSubmitSigninForm);
        signinForm.reset();
        signinForm.addEventListener('submit', onSubmitSigninForm);
    },
    profile: function() {
        profileForm.removeEventListener('submit', onSubmitProfileForm);
        profileForm.reset();
        loadProfile();
        profileForm.addEventListener('submit', onSubmitProfileForm);
    },
};

/**
 * Hides all sections not equals to the name param
 * @param {String} name
 */
function openSection(name) {
    Object.keys(sections).forEach(function(key) {
        sections[key].hidden = key !== name;
    });

    if (typeof openFunctions[name] === 'function') {
        openFunctions[name]();
    }
}

/**
 * For first type on button it will shows change form
 * @type {boolean}
 */
let isClickedChange = false;
/**
 * Showing profiles form by outer scope variable
 */
function showChangeForm() {
    if (isClickedChange === false) {
        document.getElementById('profile-form').hidden = false;
        document.getElementById('change-profile-form').innerText = 'hide';
        isClickedChange = true;
    } else {
        document.getElementById('profile-form').hidden = true;
        document.getElementById('change-profile-form').innerText =
            'change profile';
        isClickedChange = false;
    }
}
/**
 * Regex for validating passwords template
 * @param {String} password
 * @return {boolean}
 */
function isPassword(password) {
    if (!password.match(/^[a-zA-Z0-9]+$/)) {
        return false;
    }
    return true;
}

/**
 * Regex for validating email template
 * @param {String} email
 * @return {boolean}
 */
function isEmail(email) {
    return !!email.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/);
}

/**
 * Event for changing active section
 */
application.addEventListener('click', function(evt) {
    let target = evt.target;
    const isParentLink = target.parentNode.tagName.toLowerCase() === 'a';
    let isNotLink = target.tagName.toLowerCase() !== 'a';
    let isPaginatorLink = target.name === 'paginator-link';
    if (isNotLink && isParentLink) {
        target = target.parentNode;
        isNotLink = target.tagName.toLowerCase() !== 'a';
        isPaginatorLink = target.name === 'paginator-link';
    }
    if (isNotLink || isPaginatorLink) {
        return;
    }
    evt.preventDefault();

    const section = target.getAttribute('data-section');
    if (section === 'logout') {
        onLogout();
        return;
    }
    if (section === 'hide-profile-form') {
        showChangeForm();
        return;
    }
    openSection(section);
});
// Loads main section after user loads application
checkAuth().then(() => openSection('menu'));
