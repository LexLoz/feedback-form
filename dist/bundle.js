/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/api/phonemask.js":
/*!*********************************!*\
  !*** ./src/js/api/phonemask.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhoneMask)\n/* harmony export */ });\n/* \r\nhttps://www.npmjs.com/package/@zoibana/phonemask\r\n*/\n\nclass PhoneMask {\n  constructor(selector) {\n    if (typeof selector === 'object') {\n      this.initEventsOnElement(selector);\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", () => {\n        let inputs = document.querySelectorAll(selector);\n        for (let phoneInput of inputs) {\n          this.initEventsOnElement(phoneInput);\n        }\n      });\n    }\n  }\n  initEventsOnElement(element) {\n    element.addEventListener('keydown', e => this.onKeyDown(e));\n    element.addEventListener('input', e => this.onInput(e), false);\n    element.addEventListener('paste', e => this.onPaste(e), false);\n    if (element.value.length) {\n      element.value = this.formatPhoneNumber(element.value.replace(/[^\\d+]+/g, ''));\n    }\n  }\n  isRussianNumber(numericValue) {\n    return [\"7\", \"8\", \"9\"].indexOf(numericValue[0]) > -1;\n  }\n  inputNumberValue(input) {\n    return input.value.replace(/\\D/g, '');\n  }\n  formatPhoneNumber(inputNumbersValue) {\n    const hasPlus = inputNumbersValue[0] === '+';\n    const cleanNumber = inputNumbersValue.replace(/\\D/g, '');\n    const isRussanNumber = this.isRussianNumber(cleanNumber);\n\n    // Russian number must be 11 digits length\n    if (!hasPlus && cleanNumber.length > 11) {\n      cleanNumber = cleanNumber.substring(0, 11);\n    }\n    if (cleanNumber[0] === \"9\") {\n      cleanNumber = \"7\" + cleanNumber;\n    }\n    let firstSymbols = '+';\n    if (isRussanNumber) {\n      firstSymbols += \"7\";\n    }\n    let formattedInputValue = firstSymbols;\n    if (isRussanNumber) {\n      inputNumbersValue += ' ';\n      if (inputNumbersValue.length > 1) {\n        formattedInputValue += '(' + cleanNumber.substring(1, 4);\n      }\n      if (inputNumbersValue.length >= 5) {\n        formattedInputValue += ') ' + cleanNumber.substring(4, 7);\n      }\n      if (inputNumbersValue.length >= 8) {\n        formattedInputValue += '-' + cleanNumber.substring(7, 9);\n      }\n      if (inputNumbersValue.length >= 10) {\n        formattedInputValue += '-' + cleanNumber.substring(9, 11);\n      }\n    } else {\n      formattedInputValue += cleanNumber;\n    }\n    return formattedInputValue;\n  }\n  onPaste(e) {\n    let input = e.target;\n    let inputNumbersValue = this.inputNumberValue(input);\n    let pasted = e.clipboardData || window.clipboardData;\n    if (pasted) {\n      let pastedText = pasted.getData('Text');\n      if (/\\D/g.test(pastedText)) {\n        if (!inputNumbersValue) {\n          inputNumbersValue = pastedText.replace(/\\D/g, '');\n        }\n\n        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,\n        // formatting will be in onPhoneInput handler\n        input.value = this.formatPhoneNumber(inputNumbersValue);\n      }\n    }\n  }\n  onInput(e) {\n    if (!e.isTrusted) {\n      return;\n    }\n    let input = e.target;\n    let inputNumbersValue = this.inputNumberValue(input);\n    let selectionStart = input.selectionStart;\n    let formattedInputValue = \"\";\n    if (!inputNumbersValue) {\n      if (e.data === '+') {\n        return input.value = \"+\";\n      }\n      return input.value = \"\";\n    }\n\n    // Editing in the middle of input, not last symbol\n    if (input.value.length !== selectionStart) {\n      if (input.value[0] !== '+') {\n        // Add \"+\" if input value starts with not \"+\"\n        let oldSelectionStart = input.selectionStart;\n        input.value = '+' + input.value;\n        input.selectionStart = input.selectionEnd = oldSelectionStart + 1;\n      }\n      if (e.data && /\\D/g.test(e.data)) {\n        // Attempt to input non-numeric symbol\n        input.value = this.formatPhoneNumber(inputNumbersValue);\n        input.selectionStart = input.selectionEnd = selectionStart - 1;\n      }\n\n      // do not allow to enter digits if phone length is full\n      if (inputNumbersValue.length > 11) {\n        input.value = input.value.substring(0, selectionStart - 1) + input.value.substring(selectionStart, 19);\n        input.selectionStart = input.selectionEnd = selectionStart - 1;\n      }\n      return;\n    }\n\n    // Russian phone\n\n    const numericValue = this.inputNumberValue(input);\n    if (this.isRussianNumber(numericValue)) {\n      formattedInputValue = this.formatPhoneNumber(inputNumbersValue);\n    } else {\n      // Non-russian phone\n      // Ignore formatting, but allow to enter phone\n      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);\n    }\n    input.value = formattedInputValue;\n    input.dispatchEvent(new Event('input'));\n    return false;\n  }\n  onKeyDown(e) {\n    // Clear input after remove last symbol\n    let inputValue = e.target.value.replace(/\\D/g, '');\n    if (e.keyCode === 8 && inputValue.length <= 1) {\n      // Clear input after remove last symbol\n      e.target.value = \"\";\n    } else if ([8, 46].indexOf(e.keyCode) > -1 && inputValue.length > 1) {\n      // Prevent when removing service symbols\n      let symToClear = '';\n      switch (e.keyCode) {\n        case 8:\n          // BackSpace key\n          symToClear = e.target.value[e.target.selectionStart - 1];\n          break;\n        case 46:\n          // Delete key\n          symToClear = e.target.value[e.target.selectionStart];\n          break;\n      }\n      if (symToClear && /\\D/.test(symToClear)) e.preventDefault();\n    }\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxDQUFDO0lBRWxELElBQUlQLENBQUMsQ0FBQ21DLE9BQU8sS0FBSyxDQUFDLElBQUlELFVBQVUsQ0FBQzdCLE1BQU0sSUFBSSxDQUFDLEVBQUU7TUFFM0M7TUFDQUwsQ0FBQyxDQUFDb0IsTUFBTSxDQUFDaEIsS0FBSyxHQUFHLEVBQUU7SUFFdkIsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUNNLE9BQU8sQ0FBQ1YsQ0FBQyxDQUFDbUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUlELFVBQVUsQ0FBQzdCLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFFakU7TUFDQSxJQUFJK0IsVUFBVSxHQUFHLEVBQUU7TUFFbkIsUUFBUXBDLENBQUMsQ0FBQ21DLE9BQU87UUFDYixLQUFLLENBQUM7VUFBRTtVQUNKQyxVQUFVLEdBQUdwQyxDQUFDLENBQUNvQixNQUFNLENBQUNoQixLQUFLLENBQUNKLENBQUMsQ0FBQ29CLE1BQU0sQ0FBQ1EsY0FBYyxHQUFHLENBQUMsQ0FBQztVQUN4RDtRQUNKLEtBQUssRUFBRTtVQUFFO1VBQ0xRLFVBQVUsR0FBR3BDLENBQUMsQ0FBQ29CLE1BQU0sQ0FBQ2hCLEtBQUssQ0FBQ0osQ0FBQyxDQUFDb0IsTUFBTSxDQUFDUSxjQUFjLENBQUM7VUFDcEQ7TUFDUjtNQUNBLElBQUlRLFVBQVUsSUFBSSxJQUFJLENBQUNWLElBQUksQ0FBQ1UsVUFBVSxDQUFDLEVBQUVwQyxDQUFDLENBQUNxQyxjQUFjLENBQUMsQ0FBQztJQUMvRDtFQUNKO0FBRUoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZWVkYmFjay1mb3JtLy4vc3JjL2pzL2FwaS9waG9uZW1hc2suanM/NjJlNCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBcclxuaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvQHpvaWJhbmEvcGhvbmVtYXNrXHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG9uZU1hc2sge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRFdmVudHNPbkVsZW1lbnQoc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBob25lSW5wdXQgb2YgaW5wdXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0RXZlbnRzT25FbGVtZW50KHBob25lSW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEV2ZW50c09uRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMub25LZXlEb3duKGUpKTtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHRoaXMub25JbnB1dChlKSwgZmFsc2UpO1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoZSkgPT4gdGhpcy5vblBhc3RlKGUpLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gdGhpcy5mb3JtYXRQaG9uZU51bWJlcihlbGVtZW50LnZhbHVlLnJlcGxhY2UoL1teXFxkK10rL2csICcnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzUnVzc2lhbk51bWJlcihudW1lcmljVmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gW1wiN1wiLCBcIjhcIiwgXCI5XCJdLmluZGV4T2YobnVtZXJpY1ZhbHVlWzBdKSA+IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0TnVtYmVyVmFsdWUoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRQaG9uZU51bWJlcihpbnB1dE51bWJlcnNWYWx1ZSkge1xyXG5cclxuICAgICAgICBjb25zdCBoYXNQbHVzID0gaW5wdXROdW1iZXJzVmFsdWVbMF0gPT09ICcrJztcclxuICAgICAgICBjb25zdCBjbGVhbk51bWJlciA9IGlucHV0TnVtYmVyc1ZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XHJcbiAgICAgICAgY29uc3QgaXNSdXNzYW5OdW1iZXIgPSB0aGlzLmlzUnVzc2lhbk51bWJlcihjbGVhbk51bWJlcik7XHJcblxyXG4gICAgICAgIC8vIFJ1c3NpYW4gbnVtYmVyIG11c3QgYmUgMTEgZGlnaXRzIGxlbmd0aFxyXG4gICAgICAgIGlmICghaGFzUGx1cyAmJiBjbGVhbk51bWJlci5sZW5ndGggPiAxMSkge1xyXG4gICAgICAgICAgICBjbGVhbk51bWJlciA9IGNsZWFuTnVtYmVyLnN1YnN0cmluZygwLCAxMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2xlYW5OdW1iZXJbMF0gPT09IFwiOVwiKSB7XHJcbiAgICAgICAgICAgIGNsZWFuTnVtYmVyID0gXCI3XCIgKyBjbGVhbk51bWJlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmaXJzdFN5bWJvbHMgPSAnKyc7XHJcblxyXG4gICAgICAgIGlmIChpc1J1c3Nhbk51bWJlcikge1xyXG4gICAgICAgICAgICBmaXJzdFN5bWJvbHMgKz0gXCI3XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9ybWF0dGVkSW5wdXRWYWx1ZSA9IGZpcnN0U3ltYm9scztcclxuXHJcbiAgICAgICAgaWYgKGlzUnVzc2FuTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlucHV0TnVtYmVyc1ZhbHVlICs9ICcgJztcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dE51bWJlcnNWYWx1ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRJbnB1dFZhbHVlICs9ICcoJyArIGNsZWFuTnVtYmVyLnN1YnN0cmluZygxLCA0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlucHV0TnVtYmVyc1ZhbHVlLmxlbmd0aCA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRJbnB1dFZhbHVlICs9ICcpICcgKyBjbGVhbk51bWJlci5zdWJzdHJpbmcoNCwgNyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dE51bWJlcnNWYWx1ZS5sZW5ndGggPj0gOCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkSW5wdXRWYWx1ZSArPSAnLScgKyBjbGVhbk51bWJlci5zdWJzdHJpbmcoNywgOSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dE51bWJlcnNWYWx1ZS5sZW5ndGggPj0gMTApIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZElucHV0VmFsdWUgKz0gJy0nICsgY2xlYW5OdW1iZXIuc3Vic3RyaW5nKDksIDExKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcm1hdHRlZElucHV0VmFsdWUgKz0gY2xlYW5OdW1iZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkSW5wdXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhc3RlKGUpIHtcclxuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgaW5wdXROdW1iZXJzVmFsdWUgPSB0aGlzLmlucHV0TnVtYmVyVmFsdWUoaW5wdXQpO1xyXG4gICAgICAgIGxldCBwYXN0ZWQgPSBlLmNsaXBib2FyZERhdGEgfHwgd2luZG93LmNsaXBib2FyZERhdGE7XHJcblxyXG4gICAgICAgIGlmIChwYXN0ZWQpIHtcclxuICAgICAgICAgICAgbGV0IHBhc3RlZFRleHQgPSBwYXN0ZWQuZ2V0RGF0YSgnVGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKC9cXEQvZy50ZXN0KHBhc3RlZFRleHQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dE51bWJlcnNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0TnVtYmVyc1ZhbHVlID0gcGFzdGVkVGV4dC5yZXBsYWNlKC9cXEQvZywgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gcGFzdGUgbm9uLW51bWVyaWMgc3ltYm9sIOKAlCByZW1vdmUgYWxsIG5vbi1udW1lcmljIHN5bWJvbHMsXHJcbiAgICAgICAgICAgICAgICAvLyBmb3JtYXR0aW5nIHdpbGwgYmUgaW4gb25QaG9uZUlucHV0IGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGhpcy5mb3JtYXRQaG9uZU51bWJlcihpbnB1dE51bWJlcnNWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dChlKSB7XHJcblxyXG4gICAgICAgIGlmICghZS5pc1RydXN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlucHV0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IGlucHV0TnVtYmVyc1ZhbHVlID0gdGhpcy5pbnB1dE51bWJlclZhbHVlKGlucHV0KTtcclxuICAgICAgICBsZXQgc2VsZWN0aW9uU3RhcnQgPSBpbnB1dC5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICBsZXQgZm9ybWF0dGVkSW5wdXRWYWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmICghaW5wdXROdW1iZXJzVmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChlLmRhdGEgPT09ICcrJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlID0gXCIrXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFZGl0aW5nIGluIHRoZSBtaWRkbGUgb2YgaW5wdXQsIG5vdCBsYXN0IHN5bWJvbFxyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggIT09IHNlbGVjdGlvblN0YXJ0KSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5wdXQudmFsdWVbMF0gIT09ICcrJykgeyAvLyBBZGQgXCIrXCIgaWYgaW5wdXQgdmFsdWUgc3RhcnRzIHdpdGggbm90IFwiK1wiXHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkU2VsZWN0aW9uU3RhcnQgPSBpbnB1dC5zZWxlY3Rpb25TdGFydFxyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnKycgKyBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gaW5wdXQuc2VsZWN0aW9uRW5kID0gb2xkU2VsZWN0aW9uU3RhcnQgKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5kYXRhICYmIC9cXEQvZy50ZXN0KGUuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gaW5wdXQgbm9uLW51bWVyaWMgc3ltYm9sXHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRoaXMuZm9ybWF0UGhvbmVOdW1iZXIoaW5wdXROdW1iZXJzVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSBpbnB1dC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25TdGFydCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBhbGxvdyB0byBlbnRlciBkaWdpdHMgaWYgcGhvbmUgbGVuZ3RoIGlzIGZ1bGxcclxuICAgICAgICAgICAgaWYgKGlucHV0TnVtYmVyc1ZhbHVlLmxlbmd0aCA+IDExKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnN1YnN0cmluZygwLCBzZWxlY3Rpb25TdGFydCAtIDEpICsgaW5wdXQudmFsdWUuc3Vic3RyaW5nKHNlbGVjdGlvblN0YXJ0LCAxOSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IGlucHV0LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0IC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUnVzc2lhbiBwaG9uZVxyXG5cclxuICAgICAgICBjb25zdCBudW1lcmljVmFsdWUgPSB0aGlzLmlucHV0TnVtYmVyVmFsdWUoaW5wdXQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1J1c3NpYW5OdW1iZXIobnVtZXJpY1ZhbHVlKSkge1xyXG4gICAgICAgICAgICBmb3JtYXR0ZWRJbnB1dFZhbHVlID0gdGhpcy5mb3JtYXRQaG9uZU51bWJlcihpbnB1dE51bWJlcnNWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm9uLXJ1c3NpYW4gcGhvbmVcclxuICAgICAgICAgICAgLy8gSWdub3JlIGZvcm1hdHRpbmcsIGJ1dCBhbGxvdyB0byBlbnRlciBwaG9uZVxyXG4gICAgICAgICAgICBmb3JtYXR0ZWRJbnB1dFZhbHVlID0gJysnICsgaW5wdXROdW1iZXJzVmFsdWUuc3Vic3RyaW5nKDAsIDE2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBmb3JtYXR0ZWRJbnB1dFZhbHVlO1xyXG5cclxuICAgICAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZSkge1xyXG5cclxuICAgICAgICAvLyBDbGVhciBpbnB1dCBhZnRlciByZW1vdmUgbGFzdCBzeW1ib2xcclxuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDggJiYgaW5wdXRWYWx1ZS5sZW5ndGggPD0gMSkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYXIgaW5wdXQgYWZ0ZXIgcmVtb3ZlIGxhc3Qgc3ltYm9sXHJcbiAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChbOCwgNDZdLmluZGV4T2YoZS5rZXlDb2RlKSA+IC0xICYmIGlucHV0VmFsdWUubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgLy8gUHJldmVudCB3aGVuIHJlbW92aW5nIHNlcnZpY2Ugc3ltYm9sc1xyXG4gICAgICAgICAgICBsZXQgc3ltVG9DbGVhciA9ICcnO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgODogLy8gQmFja1NwYWNlIGtleVxyXG4gICAgICAgICAgICAgICAgICAgIHN5bVRvQ2xlYXIgPSBlLnRhcmdldC52YWx1ZVtlLnRhcmdldC5zZWxlY3Rpb25TdGFydCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0NjogLy8gRGVsZXRlIGtleVxyXG4gICAgICAgICAgICAgICAgICAgIHN5bVRvQ2xlYXIgPSBlLnRhcmdldC52YWx1ZVtlLnRhcmdldC5zZWxlY3Rpb25TdGFydF07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN5bVRvQ2xlYXIgJiYgL1xcRC8udGVzdChzeW1Ub0NsZWFyKSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXSwibmFtZXMiOlsiUGhvbmVNYXNrIiwiY29uc3RydWN0b3IiLCJzZWxlY3RvciIsImluaXRFdmVudHNPbkVsZW1lbnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGhvbmVJbnB1dCIsImVsZW1lbnQiLCJlIiwib25LZXlEb3duIiwib25JbnB1dCIsIm9uUGFzdGUiLCJ2YWx1ZSIsImxlbmd0aCIsImZvcm1hdFBob25lTnVtYmVyIiwicmVwbGFjZSIsImlzUnVzc2lhbk51bWJlciIsIm51bWVyaWNWYWx1ZSIsImluZGV4T2YiLCJpbnB1dE51bWJlclZhbHVlIiwiaW5wdXQiLCJpbnB1dE51bWJlcnNWYWx1ZSIsImhhc1BsdXMiLCJjbGVhbk51bWJlciIsImlzUnVzc2FuTnVtYmVyIiwic3Vic3RyaW5nIiwiZmlyc3RTeW1ib2xzIiwiZm9ybWF0dGVkSW5wdXRWYWx1ZSIsInRhcmdldCIsInBhc3RlZCIsImNsaXBib2FyZERhdGEiLCJ3aW5kb3ciLCJwYXN0ZWRUZXh0IiwiZ2V0RGF0YSIsInRlc3QiLCJpc1RydXN0ZWQiLCJzZWxlY3Rpb25TdGFydCIsImRhdGEiLCJvbGRTZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImlucHV0VmFsdWUiLCJrZXlDb2RlIiwic3ltVG9DbGVhciIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/api/phonemask.js\n");

/***/ }),

/***/ "./src/js/api/validation.js":
/*!**********************************!*\
  !*** ./src/js/api/validation.js ***!
  \**********************************/
/***/ (() => {

eval("const inputBoxes = document.querySelectorAll(\".input-box\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXBpL3ZhbGlkYXRpb24uanMiLCJuYW1lcyI6WyJpbnB1dEJveGVzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZWVkYmFjay1mb3JtLy4vc3JjL2pzL2FwaS92YWxpZGF0aW9uLmpzPzJhMzMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5wdXRCb3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5wdXQtYm94XCIpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMifQ==\n//# sourceURL=webpack-internal:///./src/js/api/validation.js\n");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles */ \"./src/styles/index.js\");\n/* harmony import */ var _api_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/validation.js */ \"./src/js/api/validation.js\");\n/* harmony import */ var _api_validation_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_api_validation_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _modal_window_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-window.js */ \"./src/js/modal-window.js\");\n/* harmony import */ var _modal_window_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modal_window_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW1CO0FBQ1UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZWVkYmFjay1mb3JtLy4vc3JjL2pzL2luZGV4LmpzPzdiYTUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi4vc3R5bGVzXCI7XHJcbmltcG9ydCBcIi4vYXBpL3ZhbGlkYXRpb24uanNcIjtcclxuaW1wb3J0IFwiLi9tb2RhbC13aW5kb3cuanNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/index.js\n");

/***/ }),

/***/ "./src/js/modal-window.js":
/*!********************************!*\
  !*** ./src/js/modal-window.js ***!
  \********************************/
/***/ (() => {

eval("const openCloseButtons = document.querySelectorAll(\".modal-button\");\nopenCloseButtons.forEach(element => element.addEventListener('click', () => document.body.classList.toggle(\"disable-scroll\")));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbW9kYWwtd2luZG93LmpzIiwibmFtZXMiOlsib3BlbkNsb3NlQnV0dG9ucyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJvZHkiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL2ZlZWRiYWNrLWZvcm0vLi9zcmMvanMvbW9kYWwtd2luZG93LmpzPzk2NDQiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgb3BlbkNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubW9kYWwtYnV0dG9uXCIpO1xyXG5cclxub3BlbkNsb3NlQnV0dG9ucy5mb3JFYWNoKGVsZW1lbnQgPT5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzYWJsZS1zY3JvbGxcIilcclxuICAgIClcclxuKTsiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztBQUVuRUYsZ0JBQWdCLENBQUNHLE9BQU8sQ0FBQ0MsT0FBTyxJQUM1QkEsT0FBTyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFDbENKLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDL0MsQ0FDSixDQUFDIn0=\n//# sourceURL=webpack-internal:///./src/js/modal-window.js\n");

/***/ }),

/***/ "./src/styles/index.js":
/*!*****************************!*\
  !*** ./src/styles/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _feedback_form_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feedback-form.sass */ \"./src/styles/feedback-form.sass\");\n/* harmony import */ var _modal_window_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-window.sass */ \"./src/styles/modal-window.sass\");\n/* harmony import */ var _js_api_phonemask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/api/phonemask */ \"./src/js/api/phonemask.js\");\n\n\n\nnew _js_api_phonemask__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\".phone-number\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBOEI7QUFDRDtBQUNlO0FBRTVDLElBQUlBLHlEQUFTLENBQUMsZUFBZSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmVlZGJhY2stZm9ybS8uL3NyYy9zdHlsZXMvaW5kZXguanM/MjI3MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL2ZlZWRiYWNrLWZvcm0uc2Fzc1wiO1xyXG5pbXBvcnQgXCIuL21vZGFsLXdpbmRvdy5zYXNzXCI7XHJcbmltcG9ydCBQaG9uZU1hc2sgZnJvbSBcIi4uL2pzL2FwaS9waG9uZW1hc2tcIjtcclxuXHJcbm5ldyBQaG9uZU1hc2soXCIucGhvbmUtbnVtYmVyXCIpIl0sIm5hbWVzIjpbIlBob25lTWFzayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/styles/index.js\n");

/***/ }),

/***/ "./src/styles/feedback-form.sass":
/*!***************************************!*\
  !*** ./src/styles/feedback-form.sass ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL2ZlZWRiYWNrLWZvcm0uc2FzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mZWVkYmFjay1mb3JtLy4vc3JjL3N0eWxlcy9mZWVkYmFjay1mb3JtLnNhc3M/NTEyMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/styles/feedback-form.sass\n");

/***/ }),

/***/ "./src/styles/modal-window.sass":
/*!**************************************!*\
  !*** ./src/styles/modal-window.sass ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL21vZGFsLXdpbmRvdy5zYXNzIiwibWFwcGluZ3MiOiI7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZlZWRiYWNrLWZvcm0vLi9zcmMvc3R5bGVzL21vZGFsLXdpbmRvdy5zYXNzP2E1YmYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/styles/modal-window.sass\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;