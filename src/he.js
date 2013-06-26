/*! http://mths.be/he v<%= version %> by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var regexAstralSymbols = /<%= astralSymbols %>/g;
	var regexEncode = /<%= encodeMultipleSymbols %>|<%= encodeSingleSymbol %>/g;
	var encodeMap = <%= encodeMap %>;
	var regexEscape = /[&<>"']/g;
	var escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'"': '&quot;',
		'\'': '&apos;',
		// See http://mathiasbynens.be/notes/ambiguous-ampersands: the following
		// is not strictly necessary unless part of a tag or an unquoted attribute
		// value. We’re only escaping it to match existing `htmlEscape`
		// implementations.
		'>': '&gt;'
	};
	var decodeMap = <%= decodeMap %>;

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	// Inspired by `ucs2encode` in http://mths.be/punycode
	var codePointToSymbol = function(codePoint) {
		var output = '';
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			return escapeMap[$0]; // no need to check `has()` here
		});
	};

	var encode = function(string) {
		return string
			.replace(regexEncode, function($0) {
				return encodeMap[$0]; // no need to check `has()` here
			})
			.replace(regexAstralSymbols, function($0) {
				// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return '&#x' + codePoint.toString(16).toUpperCase() + ';';
			})
			// Replace other non-ASCII chars with a hexadecimal escape
			.replace(/[^\0-\x7F]/g, function($0) {
				return '&#x' + $0.charCodeAt(0).toString(16).toUpperCase() + ';';
			});
	};

	var decode = function(html) {
		return html
			.replace(/&#([0-9]+);?/g, function($0, codePoint) {
				return codePointToSymbol(codePoint);
			})
			.replace(/&#[xX]([0-9a-fA-F]+);?/g, function($0, hexDigits) {
				var codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint);
			})
			.replace(/&([0-9a-zA-Z]+;?)/g, function($0, reference) {
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// ambiguous ampersand; see http://mths.be/notes/ambiguous-ampersands
					return '&' + reference;
				}
			});
	}

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '<%= version %>',
		'escape': escape,
		'encode': encode,
		'decode': decode,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return he;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(this));