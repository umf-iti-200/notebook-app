const divNotes = document.querySelector("#notes");
const formNotes = document.getElementById("form-notes");
const modalNotes = new bootstrap.Modal('#modal-notes');
const toastMessage = document.getElementById('toast-message')
const toastMessageBody = document.getElementById('toast-message-body')

function showMessage(text) {

    toastMessageBody.innerText = text;

    bootstrap.Toast.getOrCreateInstance(toastMessage).show()

}

function createElement(tag, className) {

    const div = document.createElement(tag);

    div.className = className;

    return div;
}

function createCardTitle(id, title) {

    const cardHeader = createElement('div', 'card-header d-flex justify-content-between align-items-center');

    cardHeader.innerHTML = `
        <span>${title}</span>
        <div class="dropdown">
            <button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item text-danger" href="#" onclick="removeNote(${id})"><i class="bi bi-trash me-2"></i>Remove</a></li>
            </ul>
        </div>
    `

    return cardHeader;
}

function createCardBody(content) {

    const cardBody = createElement('div', 'card-body');

    const p = createElement('p', 'card-text');

    p.textContent = content;

    cardBody.appendChild(p);

    return cardBody;
}

function createCard(note) {

    const card = createElement('div', 'card');

    card.appendChild(createCardTitle(note.id, note.title));
    card.appendChild(createCardBody(note.content));

    return card;
}

function createNote(note) {

    const card = createElement('div', 'col');

    card.appendChild(createCard(note));

    return card;
}

async function removeNote(id) {

    const url = "/api/notes/remove";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        }),
    });

    // If the status code is 200 then the request returned a successful result.
    if (response.status === 200) {
        // Reload all the data from the backend
        getData();
    }
}

function updateNotes(notes) {

    divNotes.innerHTML = "";

    for (const note of notes) {
        divNotes.appendChild(createNote(note))
    }
}

async function getData() {

    const url = "/api/notes";

    const request = await fetch(url);

    const notes = await request.json();

    updateNotes(notes);
}

async function saveToDo(event) {
    // Don't submit the form. We are going to submit the data asynchronously
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const url = "/api/notes/save";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content
        }),
    });

    const data = await response.json();

    // If the status code is 200 then the request returned a successful result.
    if (response.status === 200) {
        // // Remove what the user typed
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        modalNotes.hide();
        // // Reload all the data from the backend
        getData();
    } else {
        showMessage("⚠️ " + data.error);
    }
}

formNotes.addEventListener("submit", saveToDo);

// // Every time the app is loaded, bring all the data from the backend
getData();
