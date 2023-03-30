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
exports.useHttp = void 0;
const react_1 = require("react");
function useHttp() {
    const [response, setResponse] = (0, react_1.useState)({
        data: null,
        error: null,
        loading: false,
    });
    const sendRequest = (url, options) => __awaiter(this, void 0, void 0, function* () {
        const URL = process.env.BACKEND + url;
        console.log('URL', URL);
        setResponse({ data: null, error: null, loading: true });
        try {
            const response = yield fetch(URL, {
                method: options.method,
                body: options.data ? JSON.stringify(options.data) : undefined,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = yield response.json();
            if (!response.ok) {
                setResponse({ data: null, error: data.message, loading: false });
            }
            else {
                setResponse({ data: data, error: null, loading: false });
            }
        }
        catch (error) {
            setResponse({ data: null, error: error.message, loading: false });
        }
    });
    const get = (url) => {
        sendRequest(url, { method: 'GET' });
    };
    const post = (url, data) => {
        sendRequest(url, { method: 'POST', data: data });
    };
    return { response, get, post };
}
exports.useHttp = useHttp;
//# sourceMappingURL=index.js.map