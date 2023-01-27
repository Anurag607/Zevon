"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/images";
exports.ids = ["pages/api/images"];
exports.modules = {

/***/ "(api)/./src/data/images.json":
/*!******************************!*\
  !*** ./src/data/images.json ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "static/media/images.d37dfabb.json";

/***/ }),

/***/ "next-connect":
/*!*******************************!*\
  !*** external "next-connect" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "(api)/./pages/api/images/index.ts":
/*!***********************************!*\
  !*** ./pages/api/images/index.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-connect */ \"next-connect\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);\nnext_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst handler = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nhandler.get(\"/api/images\", async (req, res)=>{\n    let imgData = \"\";\n    try {\n        imgData = await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.readFile)(new URL(/* asset import */ __webpack_require__(/*! ../../../../../../../src/data/images.json */ \"(api)/./src/data/images.json\"), __webpack_require__.b), \"utf-8\");\n    } catch (err) {\n        console.error(err.message);\n        res.status(201);\n    }\n    let images = JSON.parse(imgData);\n    let data = [];\n    if (req.headers.type === \"shopping\") {\n        if (images.hasOwnProperty(\"shopping1\")) data.push(images.shopping1);\n        if (images.hasOwnProperty(\"shopping2\")) data.push(images.shopping2);\n    } else if (req.headers.type === \"blog\") {\n        if (images.hasOwnProperty(\"blog\")) data.push(images.blog);\n    } else if (req.headers.type === \"category\") {\n        if (images.hasOwnProperty(\"category\")) data.push(images.category);\n    }\n    res.status(200).send(data);\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvaW1hZ2VzL2luZGV4LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDNkI7QUFDUztBQUV0QyxNQUFNRSxPQUFPLEdBQUdGLHdEQUFFLEVBQW1DO0FBRXJERSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTUMsR0FBRyxFQUFDQyxHQUFHLEdBQUs7SUFDekMsSUFBSUMsT0FBTyxHQUFVLEVBQUU7SUFFdkIsSUFBSTtRQUNBQSxPQUFPLEdBQUcsTUFBTUwscURBQVEsQ0FBQyxJQUFJTSxHQUFHLENBQUMsOElBQXdDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDeEYsRUFBRSxPQUFNRSxHQUFHLEVBQUU7UUFDVEMsT0FBTyxDQUFDQyxLQUFLLENBQUNGLEdBQUcsQ0FBQ0csT0FBTyxDQUFDO1FBQzFCUCxHQUFHLENBQUNRLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUlDLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNWLE9BQU8sQ0FBQztJQUNoQyxJQUFJVyxJQUFJLEdBQUcsRUFBRTtJQUNiLElBQUdiLEdBQUcsQ0FBQ2MsT0FBTyxDQUFDQyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ2hDLElBQUdMLE1BQU0sQ0FBQ00sY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFSCxJQUFJLENBQUNJLElBQUksQ0FBQ1AsTUFBTSxDQUFDUSxTQUFTLENBQUM7UUFDbEUsSUFBR1IsTUFBTSxDQUFDTSxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUVILElBQUksQ0FBQ0ksSUFBSSxDQUFDUCxNQUFNLENBQUNTLFNBQVMsQ0FBQztJQUN0RSxPQUFPLElBQUduQixHQUFHLENBQUNjLE9BQU8sQ0FBQ0MsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNuQyxJQUFHTCxNQUFNLENBQUNNLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRUgsSUFBSSxDQUFDSSxJQUFJLENBQUNQLE1BQU0sQ0FBQ1UsSUFBSSxDQUFDO0lBQzVELE9BQU8sSUFBR3BCLEdBQUcsQ0FBQ2MsT0FBTyxDQUFDQyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ3ZDLElBQUdMLE1BQU0sQ0FBQ00sY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFSCxJQUFJLENBQUNJLElBQUksQ0FBQ1AsTUFBTSxDQUFDVyxRQUFRLENBQUM7SUFDcEUsQ0FBQztJQUNEcEIsR0FBRyxDQUFDUSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNhLElBQUksQ0FBQ1QsSUFBSSxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGLGlFQUFlZixPQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vemV2b24vLi9wYWdlcy9hcGkvaW1hZ2VzL2luZGV4LnRzPzIwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCJcclxuaW1wb3J0IG5jIGZyb20gJ25leHQtY29ubmVjdCdcclxuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tICdmcy9wcm9taXNlcydcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBuYzxOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlPigpXHJcblxyXG5oYW5kbGVyLmdldCgnL2FwaS9pbWFnZXMnLCBhc3luYyhyZXEscmVzKSA9PiB7XHJcbiAgICBsZXQgaW1nRGF0YTpzdHJpbmcgPSAnJ1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaW1nRGF0YSA9IGF3YWl0IHJlYWRGaWxlKG5ldyBVUkwoJy9zcmMvZGF0YS9pbWFnZXMuanNvbicsIGltcG9ydC5tZXRhLnVybCksICd1dGYtOCcpXHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGltYWdlcyA9IEpTT04ucGFyc2UoaW1nRGF0YSlcclxuICAgIGxldCBkYXRhID0gW11cclxuICAgIGlmKHJlcS5oZWFkZXJzLnR5cGUgPT09ICdzaG9wcGluZycpIHtcclxuICAgICAgICBpZihpbWFnZXMuaGFzT3duUHJvcGVydHkoXCJzaG9wcGluZzFcIikpIGRhdGEucHVzaChpbWFnZXMuc2hvcHBpbmcxKVxyXG4gICAgICAgIGlmKGltYWdlcy5oYXNPd25Qcm9wZXJ0eShcInNob3BwaW5nMlwiKSkgZGF0YS5wdXNoKGltYWdlcy5zaG9wcGluZzIpXHJcbiAgICB9IGVsc2UgaWYocmVxLmhlYWRlcnMudHlwZSA9PT0gJ2Jsb2cnKSB7XHJcbiAgICAgICAgaWYoaW1hZ2VzLmhhc093blByb3BlcnR5KFwiYmxvZ1wiKSkgZGF0YS5wdXNoKGltYWdlcy5ibG9nKVxyXG4gICAgfSBlbHNlIGlmKHJlcS5oZWFkZXJzLnR5cGUgPT09ICdjYXRlZ29yeScpIHtcclxuICAgICAgICBpZihpbWFnZXMuaGFzT3duUHJvcGVydHkoXCJjYXRlZ29yeVwiKSkgZGF0YS5wdXNoKGltYWdlcy5jYXRlZ29yeSlcclxuICAgIH1cclxuICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKGRhdGEpXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyIl0sIm5hbWVzIjpbIm5jIiwicmVhZEZpbGUiLCJoYW5kbGVyIiwiZ2V0IiwicmVxIiwicmVzIiwiaW1nRGF0YSIsIlVSTCIsInVybCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJpbWFnZXMiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiaGVhZGVycyIsInR5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJzaG9wcGluZzEiLCJzaG9wcGluZzIiLCJibG9nIiwiY2F0ZWdvcnkiLCJzZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/images/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/images/index.ts"));
module.exports = __webpack_exports__;

})();