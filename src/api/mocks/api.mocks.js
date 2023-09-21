"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiMocks = void 0;
const node_1 = require("msw/node");
const facade_api_mock_handlers_1 = require("./facade-api.mock-handlers");
exports.apiMocks = (0, node_1.setupServer)(...facade_api_mock_handlers_1.facadeApiMockHandlers);
//# sourceMappingURL=api.mocks.js.map