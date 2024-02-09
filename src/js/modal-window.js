const openCloseButtons = document.querySelectorAll(".modal-button");

openCloseButtons.forEach(element =>
    element.addEventListener('click', () =>
    document.body.classList.toggle("disable-scroll")
    )
);