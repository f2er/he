# he [![Build status](https://travis-ci.org/mathiasbynens/he.png?branch=master)](https://travis-ci.org/mathiasbynens/he) [![Dependency status](https://gemnasium.com/mathiasbynens/he.png)](https://gemnasium.com/mathiasbynens/he)

_he_ (for “HTML entities”) is a robust HTML entity encoder/decoder written in JavaScript. It supports [all standardized named character references as per HTML](http://www.whatwg.org/specs/web-apps/current-work/multipage/named-character-references.html), handles [ambiguous ampersands](http://mathiasbynens.be/notes/ambiguous-ampersands) just like a browser would, has an extensive test suite, and — contrary to many other JavaScript solutions — _he_ handles astral Unicode symbols just fine. [An online demo is available.](http://mothereff.in/html-entities)

## Installation

Via [npm](http://npmjs.org/):

```bash
npm install he
```

Via [Bower](http://bower.io/):

```bash
bower install he
```

Via [Component](https://github.com/component/component):

```bash
component install mathiasbynens/he
```

In a browser:

```html
<script src="he.js"></script>
```

In [Narwhal](http://narwhaljs.org/), [Node.js](http://nodejs.org/), and [RingoJS](http://ringojs.org/):

```js
var he = require('he');
```

In [Rhino](http://www.mozilla.org/rhino/):

```js
load('he.js');
```

Using an AMD loader like [RequireJS](http://requirejs.org/):

```js
require(
  {
    'paths': {
      'he': 'path/to/he'
    }
  },
  ['he'],
  function(he) {
    console.log(he);
  }
);
```

## API

### `he.version`

A string representing the semantic version number.

### `he.encode(text)`

This function takes a string of text and encodes any symbols that aren’t printable ASCII symbols and that can be replaced with named character references. For example, it would turn `©` into `&copy;`, but it wouldn’t turn `+` into `&plus;` since there is no point in doing so. Additionally, it replaces any remaining non-ASCII symbols with a hexadecimal escape sequence (e.g. `&#x1D306;`).

```js
he.encode('foo © bar ≠ baz 𝌆 qux');
// → 'foo &copy; bar &ne; baz &#x1D306; qux'
```

### `he.decode(html)`

This function takes a string of HTML and decodes any named and numerical character references in it.

```js
he.encode('foo &copy; bar &ne; baz &#x1D306; qux');
// → 'foo © bar ≠ baz 𝌆 qux'
```

### `he.escape(text)`

This function takes a string of text and escapes it for use in text contexts in XML or HTML documents. Only the following characters are escaped: `&`, `<`, `>`, `"`, and `\`.

```js
he.escape('<img src=\'x\' onerror="prompt(1)">');
// → '&lt;img src=&apos;x&apos; onerror=&quot;prompt(1)&quot;&gt;'
```

### `he.unescape(html)`

`he.unescape` is an alias for `he.decode`. It takes a string of HTML and decodes any named and numerical character references in it.

## Support

he has been tested in at least Chrome 27-29, Firefox 3-22, Safari 4-6, Opera 10-12, IE 6-10, Node.js v0.10.0, Narwhal 0.3.2, RingoJS 0.8-0.9, PhantomJS 1.9.0, and Rhino 1.7RC4.

## Unit tests & code coverage

After cloning this repository, run `npm install` to install the dependencies needed for he development and testing. You may want to install Istanbul _globally_ using `npm install istanbul -g`.

Once that’s done, you can run the unit tests in Node using `npm test` or `node tests/tests.js`. To run the tests in Rhino, Ringo, Narwhal, and web browsers as well, use `grunt test`.

To generate [the code coverage report](http://rawgithub.com/mathiasbynens/he/master/coverage/he/he.js.html), use `grunt cover`.

## Author

| [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](http://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |

## License

_he_ is available under the [MIT](http://mths.be/mit) license.