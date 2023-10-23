"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `
  padding-top: 10px;
  height: calc(100% - 80px);
  background-color: #fff;
  color: #fff;
  // font-size: var(--normal-text);
  font-size: 50px
`;
