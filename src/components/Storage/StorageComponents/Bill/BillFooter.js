"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillFooter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const bill_footer_style_module_css_1 = __importDefault(require("../../style/bill-footer-style.module.css"));
const BillFooter = () => {
    return ((0, jsx_runtime_1.jsx)("div", { className: bill_footer_style_module_css_1.default.sticky, children: (0, jsx_runtime_1.jsx)("button", { children: "Check out" }) }));
};
exports.BillFooter = BillFooter;
