import emptyHeart from '../../assets/emptyheart.svg'
import fullHeart from '../../assets/fullheart.svg'

export default class BookCardComponent {

    constructor(book, storageService) {
        this.book = book;
        this.storageService = storageService;
        this.isFavorite = this.storageService.isStarred(this.book);
    }

    render() {
        const bookContainer = document.createElement('a');
        bookContainer.href = './detail.html?id=' + this.book.id;
        let html = '';
        if (!!this.book.formats["image/jpeg"]) {
            html = `
            <img class="cover-book" src="${this.book.formats["image/jpeg"]}">
            <span>${this.book.title}</span>
            `
        } else {
            html = `
            <img src="https://cdn.bakerpublishinggroup.com/covers/listing/missing.png">
            <span>${this.book.title}</span>
            `
        }
        bookContainer.innerHTML = html;
        bookContainer.className = 'book-card';

        const saveButton = document.createElement('img');
        saveButton.className = 'heart';

        if(this.isFavorite){
            saveButton.src = fullHeart;
        } else {
            saveButton.src = emptyHeart;
        }

        // saveButton.innerHTML = '<img src="images\ok.png" />';
        saveButton.addEventListener('click', (event) => this.saveBook(event, saveButton, bookContainer));

        let node = document.createTextNode('<3');

        saveButton.appendChild(node);
        bookContainer.appendChild(saveButton);

        /// per fare un checkbox!
        // const saveButton = document.createElement('input');
        // saveButton.type = "checkbox";
        // bookContainer.appendChild(saveButton);

        return bookContainer;
    }

    saveBook(event, button, container) {
        event.preventDefault();
        this.storageService.save(this.book);
        this.isFavorite = !this.isFavorite;
        if(this.isFavorite){
            button.src = fullHeart;
        } else {
            button.src = emptyHeart;
            if(window.location.pathname.includes('starred.html')){
                container.remove();
            }
        }
    }
}