export default class StorageService {

    save(book) {
        const starredBookString = localStorage.getItem('starred');

        if (starredBookString) {
            let starredBooks = JSON.parse(starredBookString);
            if (starredBooks.some(b => b.id === book.id)) {
                starredBooks = starredBooks.filter(b => b.id !== book.id);
            } else {
                starredBooks.push(book);
            }
            localStorage.setItem('starred', JSON.stringify(starredBooks));

        } else {
            const starredBooks = [];
            starredBooks.push(book);
            localStorage.setItem('starred', JSON.stringify(starredBooks));
        }

        // location.reload();
    }

    getStarredBookData() {

        const starredBookString = localStorage.getItem('starred');

        if (starredBookString) {
            const starredBooks = JSON.parse(starredBookString);
            return starredBooks;

        } else {
            const starredBooks = [];
            return starredBooks;
        }
    }

    isStarred(book){
        const starredBookString = localStorage.getItem('starred');

        if (starredBookString) {
            const starredBooks = JSON.parse(starredBookString);
            return starredBooks.some(b => b.id === book.id);

        } else {
            return false;
        }
    }
}