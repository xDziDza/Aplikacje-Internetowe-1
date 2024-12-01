/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var styles = {
  'style-1': 'styles/style_1.css',
  'style-2': 'styles/style_2.css',
  'style-3': 'styles/style_3.css'
};
var currentStyle = 'style-2';
function initializeApp() {
  var menu = document.getElementById('menu');
  var themeLink = document.getElementById('theme');
  if (!menu || !themeLink) {
    console.error('Nie znaleziono elementów DOM!');
    return;
  }
  Object.keys(styles).forEach(function (styleKey) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = "Style ".concat(styleKey.split('-')[1]);
    link.addEventListener('click', function (event) {
      event.preventDefault();
      changeStyle(styleKey, themeLink);
    });
    menu.appendChild(link);
  });
}
function changeStyle(newStyle, themeLink) {
  if (newStyle === currentStyle) return;
  themeLink.href = styles[newStyle];
  currentStyle = newStyle;
}
document.addEventListener('DOMContentLoaded', initializeApp);
/******/ })()
;