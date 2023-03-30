"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotsProvider = void 0;
const react_1 = require("react");
const bots_1 = require("../../contexts/bots");
const useService_1 = require("../../hooks/useService");
const BotsProvider = (props) => {
    const [bots, setBots] = (0, react_1.useState)([]);
    const botsService = (0, useService_1.useService)('bots');
    const [activeBot, setActiveBot] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        botsService.runService('bot.find').then((data) => {
            const activeBotId = localStorage.getItem('active-bot-id');
            if (!activeBot) {
                localStorage.setItem('active-bot-id', data[0].id);
            }
            setActiveBot(data.find((bot) => bot.id === activeBotId));
            setBots(data);
        });
    }, []);
    return (react_1.default.createElement(bots_1.botsContext.Provider, { value: {
            bots,
            isLoading: botsService.loading,
            activeBot,
            setActiveBot(bot) {
                localStorage.setItem('active-bot-id', bot.id);
                window.location.reload();
            },
        } }, props.children));
};
exports.BotsProvider = BotsProvider;
//# sourceMappingURL=bots.js.map