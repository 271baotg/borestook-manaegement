"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const BookItem_1 = require("./BookItem");
const styled_components_1 = __importDefault(require("styled-components"));
const book_list_style_module_css_1 = __importDefault(require("../../style/book-list-style.module.css"));
const BaseMain = ({ className, children }) => ((0, jsx_runtime_1.jsx)("main", { className: `table list ${className}`, children: children }));
const Main = (0, styled_components_1.default)(BaseMain) `
    grid-area: list;

    width: 70vw;
    height: 90vh;
    background-color: #fff5;
    backdrop-filter: blur(7px);
    box-shadow: 0 .4rem .8rem ;
    border-radius: .8rem;
    overflow: hidden;

    border-collapse: collapse;


`;
const BookList = (props) => {
    return ((0, jsx_runtime_1.jsxs)("main", { className: book_list_style_module_css_1.default.tableContainer, children: [(0, jsx_runtime_1.jsx)("section", { className: book_list_style_module_css_1.default.table__header, children: (0, jsx_runtime_1.jsx)("h1", { children: "Books" }) }), (0, jsx_runtime_1.jsx)("section", { className: book_list_style_module_css_1.default.table__body, children: (0, jsx_runtime_1.jsxs)("table", { className: book_list_style_module_css_1.default.table, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "id" }), (0, jsx_runtime_1.jsx)("th", { children: "Image" }), (0, jsx_runtime_1.jsx)("th", { children: "Title" }), (0, jsx_runtime_1.jsx)("th", { children: "Author" }), (0, jsx_runtime_1.jsx)("th", { children: "Copies" }), (0, jsx_runtime_1.jsx)("th", { children: "Copies Available" }), (0, jsx_runtime_1.jsx)("th", { children: "Description" }), (0, jsx_runtime_1.jsx)("th", { children: "Choose" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: props.bookList.map(book => ((0, jsx_runtime_1.jsx)(BookItem_1.BookItem, { book: book, checkBookHandler: props.checkBookHandler }))) })] }) })] }));
};
exports.BookList = BookList;
