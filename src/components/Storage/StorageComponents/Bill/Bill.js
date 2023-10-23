"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const bill_style_module_css_1 = __importDefault(require("../../style/bill-style.module.css"));
const BillFooter_1 = require("./BillFooter");
const BillItemModel_1 = __importDefault(require("../../../../models/BillItemModel"));
const BillList_1 = require("./BillList");
const Bill = (props) => {
    const temp = [];
    const billItems = [];
    props.checkedBookList.map((data) => { billItems.push(new BillItemModel_1.default(data, 1, 0)); });
    const checkOut = () => {
        console.log(billItems);
    };
    const setQuantity = (id, quantity) => {
        for (let i = 0; i < billItems.length; i++) {
            if (billItems[i].book.id === id) {
                billItems[i].quantity = quantity;
                console.log(billItems[i]);
                break;
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: bill_style_module_css_1.default.billContainer, children: [(0, jsx_runtime_1.jsx)(BillList_1.BillList, { billItem: billItems, setQuantity: setQuantity }), (0, jsx_runtime_1.jsx)(BillFooter_1.BillFooter, {})] }));
};
exports.Bill = Bill;
