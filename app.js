// Variables

let TextList = document.getElementById("text-list");

// Event Listeners

eventListeners();

function eventListeners() {

    //Eingaben hinzufügen
    document.querySelector("#text-field").addEventListener("submit", insertText);
    //Inhalt (content) aufladen 
    document.addEventListener("DOMContentLoaded", renderListElements);
}
// Functions

//Text zum Dom hinzufügen  
function insertText(e) {
    e.preventDefault();
    //Werte im TextFeld lesen 
    const field = document.getElementById("icon_prefix2");
    const text = field.value;
    field.value = "";
    //Text im LocalStorage hinzufügen
    addTextLocalStorage(text);

    renderListElements();
}
//Text aus DOM löschen
function deleteText(e) {
    e.preventDefault();

    deleteTextLocalStorage(e.target.parentElement.textContent);

    renderListElements();
}
//um Daten von LocalStorage in der Liste anzuzeigen
function renderListElements() {
    TextList.remove();
    const newList = document.createElement('ul');
    newList.id = "text-list";
    document.querySelector('.six.columns').appendChild(newList);
    TextList = newList;

    //Erstellen "Löschen button"    
    let texts;
    texts = getTextsLocalStorage();
    texts.forEach(function(text) {
        const deleteBtn = document.createElement('a');
        deleteBtn.addEventListener('click', deleteText);
        deleteBtn.classList = "delete-text";
        deleteBtn.innerText = "X";
        const li = document.createElement('li');
        li.innerText = text;
        li.appendChild(deleteBtn);
        TextList.appendChild(li);
    });
}
// Text im LocalStorage hinzüfugen 
function addTextLocalStorage(text) {
    let texts;
    texts = getTextsLocalStorage();
    //neuen Text hinzufügen
    texts.push(text);
    texts.sort();

    localStorage.setItem("texts", JSON.stringify(texts));
}
//Überprüfen Elementen in LocalStorage. Arrays züruckgeben 
function getTextsLocalStorage() {
    let texts;
    //Werte von Local Storage
    if (localStorage.getItem("texts") === null) {
        texts = [];
    } else {
        texts = JSON.parse(localStorage.getItem("texts"));
    }
    return texts;
}
//Text von LocalStorage löschen
function deleteTextLocalStorage(text) {
    let texts, textDelete;
    //X löschen
    textDelete = text.substring(0, text.length - 1);
    texts = getTextsLocalStorage();
    texts.forEach(function(text, index) {
        if (textDelete === text) {
            texts.splice(index, 1);
        }
    });
    localStorage.setItem("texts", JSON.stringify(texts));
}