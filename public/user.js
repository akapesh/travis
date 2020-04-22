const checkFormValidity = () => {
	const form = document.getElementById("registerForm");

	if (form.checkValidity()) {
		//
	} else {
		const forminputs = document.getElementsByTagName("input");
		const formselects = document.getElementsByTagName("select");

		[...forminputs].forEach((forminput) => {
			if (forminput.checkValidity()) {
				forminput.removeAttribute("style");
			} else {
				forminput.setAttribute("style", "border: 2px solid red");
			}
		});

		[...formselects].forEach((formselect) => {
			if (formselect.value === "Default") {
				formselect.setAttribute("style", "border: 2px solid red");
			} else {
				formselect.removeAttribute("style");
			}
		});
	}
};
