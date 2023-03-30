"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBots = void 0;
const react_1 = require("react");
const bots_1 = require("../../contexts/bots");
const useBots = () => {
    const context = (0, react_1.useContext)(bots_1.botsContext);
    return context;
};
exports.useBots = useBots;
//# sourceMappingURL=index.js.map