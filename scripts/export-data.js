var fs = require('fs');
var stringEscape = require('jsesc');
var regenerate = require('regenerate');

var object = {};
var toString = object.toString;
var isArray = function(value) {
	return toString.call(value) == '[object Array]';
};

var readJSON = function(fileName) {
	var contents = fs.readFileSync('data/' + fileName + '.json', 'utf-8');
	var object = JSON.parse(contents);
	if (isArray(object)) {
		return object;
	}
	return stringEscape(object, {
		'compact': true,
		'quotes': 'single'
	});
};

module.exports = {
	'encodeMap': readJSON('encode-map'),
	'encodeSingleSymbols': regenerate.fromCodePoints(readJSON('encode-lone-code-points')),
	'encodeMultipleSymbols': stringEscape(readJSON('encode-paired-symbols').join('|')),
	'decodeOverrides': readJSON('decode-map-overrides'),
	'decodeMap': readJSON('decode-map'),
	'decodeMapLegacy': readJSON('decode-map-legacy'),
	'legacyReferences': readJSON('decode-legacy-named-references').join('|'),
	'astralSymbols': regenerate.fromCodePointRange(0x010000, 0x10FFFF),
	'invalidCodePoints': '[' + readJSON('invalid-code-points').join(',') + ']',
	'version': JSON.parse(fs.readFileSync('package.json', 'utf-8')).version
};
