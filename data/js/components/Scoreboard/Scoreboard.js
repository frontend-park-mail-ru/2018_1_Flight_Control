(function () {
    const noop = window.noop;
    //const EScoreboardTypes = window.EScoreboardTypes;
    //const ScoreboardTemplate = window.fest['js/components/Scoreboard/Scoreboard.tmpl'];
   // const fest = required('fest'); 

	class ScoreboardComponent {
		constructor(selector = 'body') {
			this._el = document.querySelector(selector);
		}

		get data() {
			return this._data;
		}

		set data(data) {
			this._data = data || [];
		}

		clear() {
			this._el.innerHTML = '';
		}

		/*renderDOM() {
			if (!this._data) {
				return;
			}

			const table = document.createElement('table');
			const tbody = document.createElement('tbody');
			table.appendChild(tbody);

			this._data.forEach(function ({email = 'lol@mail.ru', age = 13, score = 146} = {}) {
				const trow = document.createElement('tr');
				trow.classList.add('scoreboard__row');

				const tdEmail = document.createElement('td');
				tdEmail.textContent = email;

				const tdAge = document.createElement('td');
				tdAge.textContent = age;

				const tdScore = document.createElement('td');
				tdScore.textContent = score;

				trow.appendChild(tdEmail);
				trow.appendChild(tdAge);
				trow.appendChild(tdScore);

				tbody.appendChild(trow);
			});

			this._el.appendChild(table);

			table.style.fontSize = '18px';
		}*/

		renderString() {
			if (!this._data) {
				return;
			}

			this._el.innerHTML = `
				<table class="scoreboard__table">
					<tbody>
						${this._data.map(({email = 'lol@mail.ru', age = 13, score = 146} = {}) => {
				return `
								<tr class="scoreboard__row">
									<td>${email}</td>
									<td>${age}</td>
									<td>${score}</td>
								</tr>
							`;
			}).join('\n')}
					</tbody>
				</table>
			`;
		}

		renderTmpl() {
            /*if (!this._data) {
                return;
            }

            this._el.innerHTML = ScoreboardTemplate(this._data);
            */
			if (!this._data) {
				return;
			}
			//var data = {name: 'Jack "The Ripper"'},
    		var template = 'Scoreboard.tmpl.xml';
    		//console.log(this._data);
			//console.log(fest.render(template, this._data, {beautify: false}));

			//const data = {'data' : this._data};
			//const template = window.scoreboardContainerTmplTemplate(data);
			//fest['js/components/Scoreboard/Scoreboard.tmpl'](data);
			//console.log(fest.render(fest.render('Scoreboard.tmpl.xml'), this._data));
			this._el.innerHTML = fest.render(template, this._data, {beautify: false});
		}

	}

	window.ScoreboardComponent = ScoreboardComponent;

})();
