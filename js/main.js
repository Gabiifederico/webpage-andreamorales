// Detectar el clic en el menú
// Identificar el elemento que se ha clicado y lo asocia con el destino
// Calcula la distancia entre el destino y la parte superior
// Realizar una animación de desplazamiento (scroll) hacia el destino

// Selecciona todos los elementos del menú que tienen enlace interno (#)
const menuItems = document.querySelectorAll('.menu a[href^="#"]');

// Define una función para obtener la posición de desplazamiento de un elemento según su href
function getScrollTopByHref(element) {
  // Obtiene el valor del atributo href del enlace
  const id = element.getAttribute("href");
  // Utiliza el valor del atributo href como selector para encontrar el elemento correspondiente en el documento
  // Luego, obtén la distancia desde la parte superior del documento hasta el elemento
  return document.querySelector(id).offsetTop;
}


// Define una función para realizar un desplazamiento suave a una posición específica
function scrollToPosition(to) {
  // Puedes usar el enfoque nativo de desplazamiento si lo prefieres
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // });

  // En su lugar, estás usando una función llamada smoothScrollTo (que debe estar definida en otra parte)
  smoothScrollTo(0, to);
}

// Define una función para desplazarse a la sección correspondiente al hacer clic en un enlace
function scrollToIdOnClick(event) {
  // Previene el comportamiento predeterminado del enlace
  event.preventDefault();

  // Obtiene la posición de desplazamiento de la sección correspondiente
  // Resta 80 para ajustar el desplazamiento (puede variar según tus necesidades)
  const to = getScrollTopByHref(event.currentTarget) - 80;

  // Llama a la función scrollToPosition para realizar el desplazamiento suave
  scrollToPosition(to);
}

//  a través de cada elemento del menú y agrega un escuchador de evento
menuItems.forEach((item) => {
  // Cuando se haga clic en un enlace del menú, se ejecutará la función scrollToIdOnClick
  item.addEventListener("click", scrollToIdOnClick);
});


// soporte a navegadores antiguos o que no admiten el desplazamiento suave (scroll smooth) nativo, puedes utilizar la siguiente función en JavaScript
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */

// Definición de la función smoothScrollTo para realizar desplazamiento suave
function smoothScrollTo(endX, endY, duration) {
  // Obtiene las coordenadas de inicio actuales
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;

  // Calcula las distancias a desplazar
  const distanceX = endX - startX;
  const distanceY = endY - startY;

  // Obtiene el tiempo de inicio de la animación
  const startTime = new Date().getTime();

  // Define la duración de la animación (por defecto: 400 ms)
  duration = typeof duration !== "undefined" ? duration : 400;

  // Define una función de easing (interpolación) para suavizar la animación
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  // Inicia un temporizador para realizar la animación
  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    
    // Detiene el temporizador al final de la animación
    if (time >= duration) {
      clearInterval(timer);
    }
    
    // Realiza el desplazamiento suave
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}

// Función jQuery para inicializar el carrusel
$(function () {
  // Configuración estándar del carrusel (slide)
  $("#slider-id").codaSlider();
});
