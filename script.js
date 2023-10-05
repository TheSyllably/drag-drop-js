const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');


const richestPeople = [
    'Elon Reeve Musk (Elon Musk)',
'Jeffrey Preston Bezos (Jeff Bezos)',
'Bernard Jean Etienne (Bernard Arnault)',
'Willian Henry Gates III (Bill Gates)',
'Lawrence Edward Page (Larry Page)',
'Sergey Mikhaylovich Brin (Sergey Brin)',
'Lawrence Joseph Ellison (Larry Ellison)',
'Steve Anthony Ballmer (Steve Ballmer)',
'Mukesh Dhirubhai Ambani (Mukesh Ambani)'
];

const listItems = [];

let dragStartIndex;

createList()

function createList() {
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {

        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>       
        </div>
        `;

        listItems.push(listItem);

        draggableList.appendChild(listItem);


    });

    addEventListeners();
}

function dragStart() {
    // console.log('Event:', 'dragstart')
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex)
}

function dragEnter() {
    // console.log('Event:', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event:', 'dragleave')
    this.classList.remove('over')
}

function dragOver(e) {
    // console.log('Event:', 'dragover')
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event:', 'drop')
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne );
}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}