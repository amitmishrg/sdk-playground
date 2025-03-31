"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localModel = exports.lmstudio = void 0;
var openai_compatible_1 = require("@ai-sdk/openai-compatible");
exports.lmstudio = (0, openai_compatible_1.createOpenAICompatible)({
    name: 'lmstudio',
    baseURL: "http://127.0.0.1:1234/v1/",
});
exports.localModel = (0, exports.lmstudio)('mathstral-7b-v0.1');
