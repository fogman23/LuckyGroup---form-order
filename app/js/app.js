document.addEventListener("DOMContentLoaded", function () {

	const select = function () {
		let selectHeader = document.querySelectorAll('.select-form__header');
		let selectItem = document.querySelectorAll('.select-form__item');

		selectHeader.forEach(item => {
			item.addEventListener('click', selectToggle)
		})

		selectItem.forEach(item => {
			item.addEventListener('click', selectChoose)
		})

		function selectToggle() {
			this.parentElement.classList.toggle('is-active');
		}

		function selectChoose() {
			let text = this.innerText,
				icon = this.querySelector('.flag-icon').cloneNode(true),
				select = this.closest('.select-form'),
				currentText = select.querySelector('.select-form__current'),
				currentIconBody = select.querySelector('.select-form__current-icon');

			currentIcon = currentIconBody.firstChild;
			currentText.innerText = text;
			currentIconBody.removeChild(currentIcon);
			currentIconBody.appendChild(icon);

			select.classList.remove('is-active');
		}

	}

	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
		else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select()
		}
	}

	function mask(event) {
		let matrix = "+7 (___) ___ __-__",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		if (def.length >= val.length) val = def;
		this.value = matrix.replace(/./g, function (a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
		if (event.type == "blur") {
			if (this.value.length == 2) this.value = ""
		} else setCursorPosition(this.value.length, this)
	};
	const input = document.querySelector(".order-form__input-phone");
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);

	select();

});