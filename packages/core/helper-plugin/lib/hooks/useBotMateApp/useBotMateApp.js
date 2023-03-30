"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBotMateApp = void 0;
const react_1 = require("react");
const botMateApp_1 = require("../../contexts/botMateApp");
const useBotMateApp = () => {
    const context = (0, react_1.useContext)(botMateApp_1.botMateAppContext);
    return context;
};
exports.useBotMateApp = useBotMateApp;
//# sourceMappingURL=useBotMateApp.js.map