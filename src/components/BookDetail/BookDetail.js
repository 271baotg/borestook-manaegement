"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Wrapper_1 = require("../Wrapper");
const CheckoutAndReviewBox_1 = require("./CheckoutAndReviewBox");
const basic_module_css_1 = __importDefault(require("./style/basic.module.css"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const BookDetail = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [BookModel, setBookModel] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        axios_1.default.get(`http://localhost:8081/bookdetail/${id}`)
            .then(response => {
            setBookModel(response.data);
        })
            .catch(error => {
            console.error('Lỗi khi lấy dữ liệu sách:', error);
        });
    }, [id]);
    return (0, jsx_runtime_1.jsx)(Wrapper_1.Wrapper, { children: BookModel ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: `${basic_module_css_1.default.color_black} container d-none d-lg-block`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "row mt-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-sm-3 col-md-3", children: (0, jsx_runtime_1.jsx)("img", { src: BookModel.img, width: '300', height: '349', alt: 'book' }) }), (0, jsx_runtime_1.jsx)("div", { className: "col-4 col-md-4 container", children: (0, jsx_runtime_1.jsxs)("div", { className: "ml-2", children: [(0, jsx_runtime_1.jsx)("h2", { children: BookModel.title }), (0, jsx_runtime_1.jsx)("h5", { className: "text-primary", children: BookModel.author }), (0, jsx_runtime_1.jsx)("p", { className: `${basic_module_css_1.default.font_1_0} lead`, children: BookModel.description })] }) }), (0, jsx_runtime_1.jsx)(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { mobile: false, bookModel: BookModel })] }), (0, jsx_runtime_1.jsx)("hr", {})] }), (0, jsx_runtime_1.jsxs)("div", { className: `${basic_module_css_1.default.color_black} container d-lg-none mt-5`, children: [(0, jsx_runtime_1.jsx)("div", { className: "d-flex justify-content-center align-items-center", children: (0, jsx_runtime_1.jsx)("img", { src: BookModel.img, width: '300', height: '349', alt: 'book' }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "ml-2", children: [(0, jsx_runtime_1.jsx)("h2", { children: BookModel.title }), (0, jsx_runtime_1.jsx)("h5", { className: "text-primary", children: BookModel.author }), (0, jsx_runtime_1.jsx)("p", { className: "lead", children: BookModel.description })] }) }), (0, jsx_runtime_1.jsx)(CheckoutAndReviewBox_1.CheckoutAndReviewBox, { mobile: true, bookModel: BookModel }), (0, jsx_runtime_1.jsx)("hr", {})] })] })) : ((0, jsx_runtime_1.jsx)("div", { children: "Loading..." })) });
};
exports.default = BookDetail;
