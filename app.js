
$(function () {
   $('#phone').mask('+7 (999) 999 99 99');
   $('#inn').mask('999999999');
});

const btnVisibilityPassword = document.querySelector(".icon-password");

btnVisibilityPassword.addEventListener("click", () => {
	const passwordInput = document.getElementById("password");
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		btnVisibilityPassword.src = "./img/eye.svg"
	} else {
		passwordInput.type = "password";
		btnVisibilityPassword.src = "./img/eye-slash.svg"
	}
})

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('registration-form');
	const button = document.querySelector('button')

   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      if (error === 0) {
			alert('Спасибо за регистрацию')
			button.disabled = true
      }

      function formValidate(form) {
         let error = 0;
         let formRequired = document.querySelectorAll('._required');

         for (let i = 0; i < formRequired.length; i++) {
            const input = formRequired[i];
            let inn = document.getElementById('inn');
            formRemoveError(input);

            if (input.classList.contains('_email')) {
               if (emailTest(input)) {
                  formAddError(input);
                  error++;
               }
            } else if (
               input.getAttribute('type') === 'checkbox' &&
               input.checked === false
            ) {
               formAddError(input);
               error++;
            } else if (input.classList.contains('_inn') && input.value !== '') {
               if (input.value !== '111111111') {
							input.parentElement.classList.add('_error-inn');
							input.classList.add('_error-inn');
							error++;
               } else {
                  input.parentElement.classList.remove('_error-inn');
						input.classList.remove('_error-inn');
               }
            } else {
               if (input.value === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }

      function formAddError(input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }

      function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }

      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
            input.value
         );
      }
   }
});