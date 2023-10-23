"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutAndReviewBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const basic_module_css_1 = __importDefault(require("./style/basic.module.css"));
const CheckoutAndReviewBox = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5', children: (0, jsx_runtime_1.jsxs)("div", { className: `${basic_module_css_1.default.font_1_2} card-body container`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mt-3", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("b", { children: "0/5" }), " \u00A0 books checked out"] }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h4", { className: "text-success", children: "Available" }), (0, jsx_runtime_1.jsxs)("div", { className: "row", children: [(0, jsx_runtime_1.jsxs)("p", { className: "col-6 lead", children: [props.bookModel.copies, " copies"] }), (0, jsx_runtime_1.jsxs)("p", { className: "col-6 lead", children: [props.bookModel.copiesAvailable, " available"] })] })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/#', className: 'btn btn-success btn-lg', children: "Check out" }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", { className: "mt-3", children: "This number can change until placing order has been complete." })] }) }));
};
exports.CheckoutAndReviewBox = CheckoutAndReviewBox;
