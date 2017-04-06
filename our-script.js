window.addEventListener('load', function () {
	
	document.querySelector('#users').addEventListener('click', function () {
		var xhr = new XMLHttpRequest();
		
		// var xhr=  new ActiveXObject('123123');
		
		xhr.open('GET', 'users.json', true);
		
		xhr.responseType = 'json';
		
		xhr.onreadystatechange = function () {
			var STATUS_OK = 200;
			
			if (this.readyState === this.DONE) {
				if (this.status === STATUS_OK) {
					render(this.response);
				} else {
					console.log('ERROR!!!1');
				}
			}
		};
		
		xhr.send();
	});
	
	function render (arr) {
		var ul = document.querySelector('ul'),
			fragment = document.createDocumentFragment();
		
		arr.forEach(function (elem) {
			var li = document.createElement('li');
			
			li.textContent = elem.name;
			
			fragment.appendChild(li);
		});
		
		ul.appendChild(fragment);
	}
	
	document.querySelector('#add-user').onclick = function () {
		var userName = document.getElementById('name').value,
			xhr = new XMLHttpRequest();
			
		xhr.open('POST', '/123213', true);
		
		xhr.onreadystatechange = function () {
			var STATUS_OK = 200;
			
			if (this.readyState === this.DONE) {
				if (this.status === STATUS_OK) {
					render([{ name: userName }]);
				} else {
					console.log('ERROR!!!1');
				}
			}
		};
		
		xhr.send(JSON.stringify({ name: userName }));
		
	};
	
	
});