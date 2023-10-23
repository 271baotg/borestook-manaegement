"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ErrorMessage = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", { children: props === null || props === void 0 ? void 0 : props.message }));
};
exports.ErrorMessage = ErrorMessage;
