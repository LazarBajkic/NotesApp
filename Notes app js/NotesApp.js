const noteBodyElem = document.getElementById('noteBody-js')
const noteTitleElem = document.getElementById('noteTitle-js')
const submitNoteElem = document.getElementById('submitNote-js')
const printNotesElem = document.getElementById('printNotes-js')
const errorPElem = document.getElementById('errorP')

let allNotes=JSON.parse(getList() || [])

updateNoteList(allNotes)

submitNoteElem.addEventListener('click',() => {
    addNote()
})

function addNote(){
    const note = {
        noteTitle:noteTitleElem.value,
        noteBody:noteBodyElem.value
    }

    if(!note.noteTitle && !note.noteBody){
        errorPElem.innerText=('Either the title or text must be filled out')
    }else{
        errorPElem.innerText=''
        allNotes.push(note)
    }
    updateNoteList(allNotes)
}

function updateNoteList(allNotes){
    printNotesElem.innerHTML = allNotes.map((note, index) => `
    <div class='individualNote'>
        <button class="delBtn" data-index="${index}">X</button>
        <h3><b>${note.noteTitle}</b></h3>
        <br>
        <p>${note.noteBody}</p>
        <br>
    </div>
`).join('');
}

printNotesElem.addEventListener('click', (event) => {
    if (event.target.classList.contains('delBtn')) {
        const index = event.target.dataset.index;
        deleteNote(index);
    }
});



function deleteNote(index){
    console.log(index)
    allNotes.splice(index,1)
    updateNoteList(allNotes)
    saveList(allNotes)
}

function saveList(allNotes){
    localStorage.setItem('allNotes',JSON.stringify(allNotes))
}

function getList(){
    return localStorage.getItem('allNotes')
}