import BookCardComponent from "./book-card-component.js"

export default class HomePageComponent {

    constructor(bookService, storageService) {
        this.bookService = bookService;
        this.storageService = storageService;
    }

    async start() {
        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', () => this.nextPressed());

        const prevButton = document.getElementById('prev-button');
        prevButton.addEventListener('click', () => this.prevPressed());

        const searchButton = document.getElementById('search-form');
        searchButton.addEventListener('submit', (event) => this.searchSubmitted(event));

        this.books = await this.bookService.getData()
        this.render(this.books);
    }

    render(data) {
        const mainContainer = document.querySelector("#main-container");
        mainContainer.innerHTML = '';

        for (const book of data) {
            const cardComponent = new BookCardComponent(book, this.storageService);
            const card = cardComponent.render();
            mainContainer.appendChild(card);
        }
    }

    async nextPressed() {
        this.bookService.nextPage();
        this.books = await this.bookService.getData()
        this.render(this.books);
    }

    async prevPressed() {
        this.bookService.nextPage();
        this.books = await this.bookService.getData()
        this.render(this.books);
    }

    async searchSubmitted(event){
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        console.log(data);
        
        this.title = data.get('title');
        this.topic = data.get('topic');

        const books = await this.bookService.getDataSearch(this.title, this.topic);
        this.render(books);
    }

}