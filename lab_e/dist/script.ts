
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#menu").addEventListener("click", () => {

    });


    // Znajdź element <link> z określonym "rel" i zmień jego "href"
    let linkElement = document.getElementById("theme");

    // const linkElement = document.querySelector('link[rel="stylesheet"]');

    console.log(linkElement);
    if (linkElement) {

        linkElement.setAttribute("href", "styles/style_3.css");
        // Przypisz nową ścieżkę do "href"
        console.log(`Atrybut href został zmieniony na: ${linkElement.getAttribute("href")}`);
    } else {
        console.error("Nie znaleziono elementu <link> z rel='stylesheet'.");
    }

});


