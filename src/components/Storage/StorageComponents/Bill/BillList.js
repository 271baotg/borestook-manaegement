"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const bill_list_style_module_css_1 = __importDefault(require("../../style/bill-list-style.module.css"));
const BillItem_1 = require("./BillItem");
const BillList = (props) => {
    var _a;
    return ((0, jsx_runtime_1.jsxs)("main", { className: bill_list_style_module_css_1.default.tableContainer, children: [(0, jsx_runtime_1.jsx)("section", { className: bill_list_style_module_css_1.default.table__header, children: (0, jsx_runtime_1.jsx)("h1", { children: "Books" }) }), (0, jsx_runtime_1.jsx)("section", { className: bill_list_style_module_css_1.default.table__body, children: (0, jsx_runtime_1.jsxs)("table", { className: bill_list_style_module_css_1.default.table, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "id" }), (0, jsx_runtime_1.jsx)("th", { children: "title" }), (0, jsx_runtime_1.jsx)("th", { children: "price" }), (0, jsx_runtime_1.jsx)("th", { children: "quantity" }), (0, jsx_runtime_1.jsx)("th", { children: "amount" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: (_a = props.billItem) === null || _a === void 0 ? void 0 : _a.map((billItem) => {
                                return ((0, jsx_runtime_1.jsx)(BillItem_1.BillItem, { billItem: billItem, setQuantity: props.setQuantity }));
                            }) })] }) })] }));
};
exports.BillList = BillList;
