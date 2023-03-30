"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useService = void 0;
const react_1 = require("react");
const useBotMateApp_1 = require("../useBotMateApp");
const useService = (pluginName) => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { apiBaseUrl } = (0, useBotMateApp_1.useBotMateApp)();
    return {
        loading,
        runService: (service, payload) => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            const data = yield fetch(apiBaseUrl + '/plugins/run-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pluginName,
                    pluginService: service,
                    payload,
                }),
            }).then((res) => res.json());
            setLoading(false);
            return data;
        }),
    };
};
exports.useService = useService;
//# sourceMappingURL=index.js.map