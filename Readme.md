
# rube-schema

  Validate schemas. Works in the browser and on the server. Powered by [rube](https://github.com/lapwinglabs/rube).

## Installation

```bash
npm install rube-schema
```

## Usage

```js
var schema = Schema()
  .attr('email')
    .format(/^(\s|\s)$/g, '')
    .type(String)
  .attr('phone')
    .format(/[^\d]+/g, '')
    .cast(String, Number)

// validate against `obj`
schema.validate(obj, function(errors, values) {
  errors // when errors, key is `attr`, value is `error`
  values // when no errors, values is transformed `obj` values
});
```

## TODO

* Docs
* Tests

## License

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;matt@lapwinglabs.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
