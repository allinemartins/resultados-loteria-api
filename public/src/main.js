const jsonExemple = document.querySelectorAll('.json-example');
if (jsonExemple.length > 0) {
    jsonExemple.forEach(element => {
        element.addEventListener('click', setExemploJson);
    });
}

function setExemploJson() {
    this.classList.toggle('show');
}


function redirectWithBaseUrl(path) {
    var baseUrl = window.location.origin; // Obtém automaticamente o URL base
    var fullUrl = baseUrl + path;
    window.location.href = fullUrl;
}
