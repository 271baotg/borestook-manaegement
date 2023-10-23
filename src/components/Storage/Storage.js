"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const BookList_1 = require("./StorageComponents/Book/BookList");
const Bill_1 = require("./StorageComponents/Bill/Bill");
// import "./style.css";
const storage_style_module_css_1 = __importDefault(require("./style/storage-style.module.css"));
const Storage = () => {
    const [booklist, setBookList] = (0, react_1.useState)([]);
    const [checkedBookList, setCheckedBookList] = (0, react_1.useState)([]);
    const [httpError, setHttpError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const baseUrl = 'http://localhost:8080/api/books';
        const key = 'books';
        const url = `${baseUrl}?page=0`;
        const getBookList = () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch(url);
            const responseJson = yield response.json();
            const responeData = responseJson._embedded[key];
            let tempBookList = [];
            for (const book of responeData) {
                tempBookList.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    img: book.img,
                    copies: book.copies,
                    copiesAvailable: book.copiesAvailable,
                });
                console.log(book);
            }
            setBookList(tempBookList);
            setIsLoading(false);
        });
        getBookList().catch(error => {
            setIsLoading(true);
        });
    }, []);
    const handleCheckBook = (book, isChecked) => {
        if (isChecked) {
            setCheckedBookList([...checkedBookList, book]);
        }
        else {
            let tempList = checkedBookList.filter(item => book.id !== item.id);
            setCheckedBookList(tempList);
        }
    };
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "Is Loading ..." }) }));
    }
    // if(httpError) {
    //   return (
    //     <div className='container m-5'>
    //         <h1>{httpError}</h1>
    //     </div>
    //   );
    // }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: `${storage_style_module_css_1.default.storageDesktop} d-none d-lg-flex`, children: [(0, jsx_runtime_1.jsx)(BookList_1.BookList, { bookList: booklist, checkBookHandler: handleCheckBook }), (0, jsx_runtime_1.jsx)(Bill_1.Bill, { checkedBookList: checkedBookList })] }), (0, jsx_runtime_1.jsxs)("div", { className: `${storage_style_module_css_1.default.storageDesktop} d-block d-lg-none`, children: [(0, jsx_runtime_1.jsx)(BookList_1.BookList, { bookList: booklist, checkBookHandler: handleCheckBook }), (0, jsx_runtime_1.jsx)(Bill_1.Bill, { checkedBookList: checkedBookList })] })] }));
};
exports.Storage = Storage;
