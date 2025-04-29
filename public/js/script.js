
(function () {
  'use strict';


  const forms = document.querySelectorAll('.needs-validation');


  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }


      if (form.getAttribute('action') === '/users/register') {
        const password = document.getElementById('password');
        const password2 = document.getElementById('password2');

        if (password.value !== password2.value) {
          password2.setCustomValidity('Passwords do not match');
          event.preventDefault();
          event.stopPropagation();
        } else {
          password2.setCustomValidity('');
        }
      }

      form.classList.add('was-validated');
    }, false);
  });
})();
