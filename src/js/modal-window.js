const openCloseButtons = document.querySelectorAll(".modal-button");

openCloseButtons.forEach(element =>
    element.addEventListener('click', () =>
    document.documentElement.classList.toggle("disable-scroll")
    )
);