"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bill_item_styled_module_css_1 = __importDefault(require("../../style/bill-item-styled.module.css"));
const BillItem = (props) => {
    var _a, _b, _c;
    const book = props.billItem.book;
    const [quantity, setQuantity] = (0, react_1.useState)(props.billItem.quantity);
    const handleIncreaseQuantity = () => {
        props.setQuantity(book === null || book === void 0 ? void 0 : book.id, props.billItem.quantity + 1);
        setQuantity(props.billItem.quantity + 1);
    };
    const handleDecreaseQuantity = () => {
    };
    return ((0, jsx_runtime_1.jsxs)("tr", { className: bill_item_styled_module_css_1.default.tableRow, children: [(0, jsx_runtime_1.jsx)("td", { className: bill_item_styled_module_css_1.default.tableData, children: (_a = props.billItem.book) === null || _a === void 0 ? void 0 : _a.id }), (0, jsx_runtime_1.jsx)("td", { className: bill_item_styled_module_css_1.default.tableData, children: (_b = props.billItem.book) === null || _b === void 0 ? void 0 : _b.title }), (0, jsx_runtime_1.jsx)("td", { children: `$ ${(_c = props.billItem.book) === null || _c === void 0 ? void 0 : _c.copies}` }), (0, jsx_runtime_1.jsx)("td", { className: `${bill_item_styled_module_css_1.default.tableData}`, children: (0, jsx_runtime_1.jsxs)("div", { className: `${bill_item_styled_module_css_1.default.qtyContainer}`, children: [props.billItem.quantity, (0, jsx_runtime_1.jsxs)("div", { className: bill_item_styled_module_css_1.default.qtyBtnContainer, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => handleIncreaseQuantity(), className: `${bill_item_styled_module_css_1.default.qtyBtn} + ${bill_item_styled_module_css_1.default.qtyBtnLeft}`, children: "+" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDecreaseQuantity(), className: `${bill_item_styled_module_css_1.default.qtyBtn} + ${bill_item_styled_module_css_1.default.qtyBtnRight}`, children: "-" })] })] }) }), (0, jsx_runtime_1.jsx)("td", { children: props.billItem.amount })] }));
};
exports.BillItem = BillItem;
