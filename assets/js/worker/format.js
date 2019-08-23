/**
 * @name  de4js
 * @description  JavaScript Deobfuscator and Unpacker
 * @author  Zzbaivong <Zzbaivong@gmail.com> (http://localhost:4000)
 * @version  1.2.1
 * @copyright  Zzbaivong 2017
 * @license  MIT
 */

self.addEventListener('message', function (e) {
    var source = e.data.source;

    self._window = self.window;
    self.window = {};

    if (e.data.beautify) {
        self.importScripts('/de4js/assets/js/lib/js-beautify/beautify.min.js');
        source = self.window.js_beautify(source, {
            unescape_strings: true,
            jslint_happy: true
        });
    }

    self.window = self._window;

    if (e.data.highlight) {
        self.importScripts('/de4js/assets/js/lib/highlight-js/highlight.pack.js');
        source = self.hljs.highlight('javascript', source).value;
    }

    self.postMessage(source);
});
