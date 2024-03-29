// ==UserScript==
// @name         de4js helper
// @namespace    https://baivong.github.io/de4js/
// @description  Enable Unreadable option in de4js
// @version      1.2.1
// @icon         https://i.imgur.com/CJ5MfxV.png
// @author       Zzbaivong
// @license      MIT
// @match        http://localhost:4000/de4js/
// @include      http://127.0.0.1:4000/de4js/
// @include      http://localhost:4000/de4js/
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js?v=a834d46
// @noframes
// @connect      jsnice.org
// @supportURL   https://github.com/lelinhtinh/de4js/issues
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function () {
    'use strict';

    var nicify = document.getElementById('nicify'),
        input = document.getElementById('input'),
        output = document.getElementById('output'),
        view = document.getElementById('view'),
        redecode = document.getElementById('redecode');

    function jsnice() {
        if (!isOnine()) return;
        if (input.value.trim() === '') return;

        view.classList.add('waiting');
        GM.xmlHttpRequest({
            method: 'POST',
            url: 'http://jsnice.org/beautify?pretty=0&rename=1&types=0&packers=0&transpile=0&suggest=0',
            responseType: 'json',
            data: input.value,
            onload: function (response) {
                var source = response.response.js;

                if (source.indexOf('Error compiling input') === 0) {
                    source = input.value;
                } else {
                    source = response.response.js;
                }

                output.value = source;
                document.getElementById('highlight').onchange();
            },
            onerror: function (e) {
                console.error(e); // eslint-disable-line no-console
            }
        });
    }

    function isOnine() {
        nicify.disabled = !navigator.onLine;
        return navigator.onLine;
    }

    nicify.disabled = false;
    nicify.onchange = jsnice;

    input.addEventListener('input', function () {
        if (nicify.checked) jsnice();
    });

    redecode.addEventListener('click', function () {
        if (nicify.checked) jsnice();
    });

    window.addEventListener('online', isOnine);
    window.addEventListener('offline', isOnine);
    isOnine();

})();
