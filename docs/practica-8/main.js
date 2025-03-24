const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");

// Crear el loader dinámicamente
const $loader = document.createElement("div");
$loader.id = "loader";
$loader.style.border = "5px solid #f3f3f3"; // Fondo gris claro
$loader.style.borderTop = "5px solid #3498db"; // Azul
$loader.style.borderRadius = "50%";
$loader.style.width = "50px";
$loader.style.height = "50px";
$loader.style.margin = "20px auto";
$loader.style.animation = "spin 1s linear infinite"; // Animación
$loader.style.display = "none"; // Ocultar por defecto
$form.parentElement.appendChild($loader); // Agregar el loader al DOM

// Animación CSS para el loader
const style = document.createElement("style");
style.type = "text/css";
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style); // Agregar animación al head

// Función de Validación del Formulario
function validateForm(e) {
  // Cancela el comportamiento por defecto del evento
  e.preventDefault();

  // Limpiamos los mensajes de error de los inputs
  $errorsMessages.forEach((el) => {
    el.textContent = "";
  });

  let isValid = true;

  // Validar campo Nombre
  let namePattern = /^[A-Za-z\s]+$/; // Solo letras y espacios en blanco
if ($nameInput.value.trim() === "") {
  $nameError.textContent = "El nombre es obligatorio";
  $nameInput.focus();
  isValid = false;
} else if (!namePattern.test($nameInput.value.trim())) {
  $nameError.textContent = "El nombre sólo puede contener letras y espacios";
  $nameInput.focus();
  isValid = false;
}

  // Validar campo Correo
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.textContent = "El correo es obligatorio";
    $emailInput.focus();
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.textContent = "El formato del correo es inválido";
    $emailInput.focus();
    isValid = false;
  }

  // Validar campo Contraseña
  let passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if ($passwordInput.value.trim() === "") {
  $passwordError.textContent = "La Contraseña es obligatoria";
  $passwordInput.focus();
  isValid = false;
} else if (!passwordPattern.test($passwordInput.value.trim())) {
  $passwordError.textContent = 
    "La Contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial";
  $passwordInput.focus();
  isValid = false;
}

  // Validar campo Confirmar Contraseña
  if ($confirmPasswordInput.value.trim() === "") {
    $confirmPasswordError.textContent =
      "La confirmación de la Contraseña es obligatoria";
    $confirmPasswordInput.focus();
    isValid = false;
  } else if (
    $confirmPasswordInput.value.trim() !== $passwordInput.value.trim()
  ) {
    $confirmPasswordError.textContent =
      "La confirmación de la Contraseña no coincide con el valor de la contraseña";
    $confirmPasswordInput.focus();
    isValid = false;
  }

  // Simulación del envío del formulario con loader
  if (isValid) {
    $loader.style.display = "block"; // Mostrar el loader
    $form.style.display = "none"; // Ocultar el formulario mientras se simula el envío
    setTimeout(() => {
      $loader.style.display = "none"; // Ocultar el loader después de 5 segundos
      $successMessage.textContent = "Formulario enviado exitosamente"; // Mostrar mensaje de éxito
      $form.style.display = "block"; // Volver a mostrar el formulario
      $form.reset();
      setTimeout(() => {
        $successMessage.textContent = ""; // Limpiar el mensaje de éxito después de unos segundos
      }, 3000);
    }, 5000); // Tiempo de espera del loader
  }
}

$form.addEventListener("submit", validateForm);
