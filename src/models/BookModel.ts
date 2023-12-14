class BookModel{
    id: number;
    title: string;
    author?: string;
    description?: string;
    price: number;
    available?: number;
    categoryList: Category[];
    img?: string;

    constructor(id: number, title: string, author: string, description: string,
        price: number,available: number, category: Category[], img: string,) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.available = available;
        this.categoryList = category;
        this.img = img;
    }
}

export default BookModel;