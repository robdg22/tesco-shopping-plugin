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
exports.id = "app/api/tesco/route";
exports.ids = ["app/api/tesco/route"];
exports.modules = {

/***/ "(rsc)/./app/api/tesco/route.ts":
/*!********************************!*\
  !*** ./app/api/tesco/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OPTIONS: () => (/* binding */ OPTIONS),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const response = await fetch(\"https://api.tesco.com/shoppingexperience\", {\n            method: \"POST\",\n            headers: {\n                \"X-Apikey\": \"TvOSZJHlEk0pjniDGQFAc9Q59WGAR4dA\",\n                \"Content-Type\": \"application/json\",\n                \"Referer\": \"https://www.tesco.com/groceries/en-GB/search?query=eggs%5D&inputType=free+text\",\n                \"Region\": \"UK\",\n                \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\"\n            },\n            body: JSON.stringify(body)\n        });\n        const data = await response.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data, {\n            status: response.status,\n            headers: {\n                \"Access-Control-Allow-Origin\": \"*\",\n                \"Access-Control-Allow-Methods\": \"POST, OPTIONS\",\n                \"Access-Control-Allow-Headers\": \"Content-Type\"\n            }\n        });\n    } catch (error) {\n        console.error(\"Proxy error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch data\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function OPTIONS() {\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({}, {\n        status: 200,\n        headers: {\n            \"Access-Control-Allow-Origin\": \"*\",\n            \"Access-Control-Allow-Methods\": \"POST, OPTIONS\",\n            \"Access-Control-Allow-Headers\": \"Content-Type\"\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Rlc2NvL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE0RDtBQUVyRCxlQUFlQyxLQUFLQyxPQUFvQjtJQUM3QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxRQUFRRSxJQUFJO1FBRS9CLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSw0Q0FBNEM7WUFDdkVDLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxZQUFZO2dCQUNaLGdCQUFnQjtnQkFDaEIsV0FBVztnQkFDWCxVQUFVO2dCQUNWLGNBQWM7WUFDaEI7WUFDQUwsTUFBTU0sS0FBS0MsU0FBUyxDQUFDUDtRQUN2QjtRQUVBLE1BQU1RLE9BQU8sTUFBTU4sU0FBU0QsSUFBSTtRQUVoQyxPQUFPSixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDTyxNQUFNO1lBQzdCQyxRQUFRUCxTQUFTTyxNQUFNO1lBQ3ZCSixTQUFTO2dCQUNQLCtCQUErQjtnQkFDL0IsZ0NBQWdDO2dCQUNoQyxnQ0FBZ0M7WUFDbEM7UUFDRjtJQUNGLEVBQUUsT0FBT0ssT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0JBQWdCQTtRQUM5QixPQUFPYixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVTLE9BQU87UUFBdUIsR0FBRztZQUFFRCxRQUFRO1FBQUk7SUFDNUU7QUFDRjtBQUVPLGVBQWVHO0lBQ3BCLE9BQU9mLHFEQUFZQSxDQUFDSSxJQUFJLENBQUMsQ0FBQyxHQUFHO1FBQzNCUSxRQUFRO1FBQ1JKLFNBQVM7WUFDUCwrQkFBK0I7WUFDL0IsZ0NBQWdDO1lBQ2hDLGdDQUFnQztRQUNsQztJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9VSzgwMTEzMDE4L0RvY3VtZW50cy9HaXRIdWIvdGVzY28tc2hvcHBpbmctcGx1Z2luL3Byb3h5LXNlcnZlci9hcHAvYXBpL3Rlc2NvL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkudGVzY28uY29tL3Nob3BwaW5nZXhwZXJpZW5jZVwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlgtQXBpa2V5XCI6IFwiVHZPU1pKSGxFazBwam5pREdRRkFjOVE1OVdHQVI0ZEFcIixcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIFwiUmVmZXJlclwiOiBcImh0dHBzOi8vd3d3LnRlc2NvLmNvbS9ncm9jZXJpZXMvZW4tR0Ivc2VhcmNoP3F1ZXJ5PWVnZ3MlNUQmaW5wdXRUeXBlPWZyZWUrdGV4dFwiLFxuICAgICAgICBcIlJlZ2lvblwiOiBcIlVLXCIsXG4gICAgICAgIFwiVXNlci1BZ2VudFwiOiBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MS4wLjQ0NzIuMTI0IFNhZmFyaS81MzcuMzZcIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICB9KVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEsIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCI6IFwiUE9TVCwgT1BUSU9OU1wiLFxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIjogXCJDb250ZW50LVR5cGVcIixcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiUHJveHkgZXJyb3I6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBkYXRhXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBPUFRJT05TKCkge1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe30sIHtcbiAgICBzdGF0dXM6IDIwMCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiOiBcIlBPU1QsIE9QVElPTlNcIixcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc1wiOiBcIkNvbnRlbnQtVHlwZVwiLFxuICAgIH0sXG4gIH0pXG59XG5cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YSIsInN0YXR1cyIsImVycm9yIiwiY29uc29sZSIsIk9QVElPTlMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/tesco/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftesco%2Froute&page=%2Fapi%2Ftesco%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftesco%2Froute.ts&appDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftesco%2Froute&page=%2Fapi%2Ftesco%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftesco%2Froute.ts&appDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_UK80113018_Documents_GitHub_tesco_shopping_plugin_proxy_server_app_api_tesco_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/tesco/route.ts */ \"(rsc)/./app/api/tesco/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/tesco/route\",\n        pathname: \"/api/tesco\",\n        filename: \"route\",\n        bundlePath: \"app/api/tesco/route\"\n    },\n    resolvedPagePath: \"/Users/UK80113018/Documents/GitHub/tesco-shopping-plugin/proxy-server/app/api/tesco/route.ts\",\n    nextConfigOutput,\n    userland: _Users_UK80113018_Documents_GitHub_tesco_shopping_plugin_proxy_server_app_api_tesco_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0ZXNjbyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdGVzY28lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ0ZXNjbyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRlVLODAxMTMwMTglMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZ0ZXNjby1zaG9wcGluZy1wbHVnaW4lMkZwcm94eS1zZXJ2ZXIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGVUs4MDExMzAxOCUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRnRlc2NvLXNob3BwaW5nLXBsdWdpbiUyRnByb3h5LXNlcnZlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNEM7QUFDekg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9VSzgwMTEzMDE4L0RvY3VtZW50cy9HaXRIdWIvdGVzY28tc2hvcHBpbmctcGx1Z2luL3Byb3h5LXNlcnZlci9hcHAvYXBpL3Rlc2NvL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS90ZXNjby9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Rlc2NvXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS90ZXNjby9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9VSzgwMTEzMDE4L0RvY3VtZW50cy9HaXRIdWIvdGVzY28tc2hvcHBpbmctcGx1Z2luL3Byb3h5LXNlcnZlci9hcHAvYXBpL3Rlc2NvL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftesco%2Froute&page=%2Fapi%2Ftesco%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftesco%2Froute.ts&appDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftesco%2Froute&page=%2Fapi%2Ftesco%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftesco%2Froute.ts&appDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2FUK80113018%2FDocuments%2FGitHub%2Ftesco-shopping-plugin%2Fproxy-server&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();