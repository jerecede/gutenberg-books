export default class BookCardComponent {

    constructor(book, storageService) {
        this.book = book;
        this.storageService = storageService;
    }

    render() {
        const bookContainer = document.createElement('a');
        bookContainer.href = './detail.html?id=' + this.book.id;
        let html = '';
        if (!!this.book.formats["image/jpeg"]) {
            html = `
            <img src="${this.book.formats["image/jpeg"]}">
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

        const saveButton = document.createElement('button');
        // saveButton.innerHTML = '<img src="images\ok.png" />';
        saveButton.addEventListener('click', (event) => this.saveBook(event, saveButton));

        let node = document.createTextNode('<3');

        saveButton.appendChild(node);
        bookContainer.appendChild(saveButton);

        /// per fare un checkbox!
        // const saveButton = document.createElement('input');
        // saveButton.type = "checkbox";
        // bookContainer.appendChild(saveButton);

        return bookContainer;
    }

    saveBook(event, button) {
        event.preventDefault();
        button.id = "" + this.book.id;
        this.storageService.save(this.book);
    }

}