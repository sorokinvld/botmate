"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotMateAppProvider = void 0;
const react_1 = require("react");
const botMateApp_1 = require("../../contexts/botMateApp");
function BotMateAppProvider({ children, plugins, menu, apiBaseUrl, platforms, }) {
    return (react_1.default.createElement(botMateApp_1.botMateAppContext.Provider, { value: {
            plugins,
            menu,
            apiBaseUrl,
            platforms,
        } }, children));
}
exports.BotMateAppProvider = BotMateAppProvider;
//# sourceMappingURL=BotMateApp.js.map