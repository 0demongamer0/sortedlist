# SortedList

Extends [List](https://github.com/darsain/list) to create a sorted list.

Read about [limitations here](https://github.com/darsain/list#limitations).

## Install

With [component(1)](https://github.com/component/component):

```bash
component install darsain/sortedlist
```

## Usage

```js
var SortedList = require('sortedlist');
var list = new SortedList(['b', 'a']);
list.join(); // b,c
list.insert('a');
list.join(); // a,b,c
list.reverse();
list.join(); // c,b,a
list.insert('d'); // remembers that list is reversed
list.join(); // d,c,b,a
```

With custom order function:

```js
var data = [
	{ name: 'John' },
	{ name: 'Adam' },
	{ name: 'Tomas' }
];
var order = function order(a, b) {
	return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};
var list = new SortedList(data, order);

console.log(list); // { name: 'Adam' }, { name: 'John' }, { name: 'Tomas' }
```

## API

### SortedList([array], [orderFunction])

SortedList constructor. `new` keyword is optional.

#### [array]

`Object`

Array, or an array-like like object to create a SortedList from.

Can be `Array`, `List`, `NodeList`, `arguments`, ... everything that looks like `{ 0: 'foo', length: 1 }`.

#### [orderFunction]

`Function`

Function for ordering items. Receives 2 arguments. Function has to:

- return `-1` when `a < b`
- return `1` when `a > b`
- return `0` otherwise

Example:

```js
function orderFunction(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
```

#### *Inherits all methods from [List](https://github.com/darsain/list)*

*Below are documented methods that are either new, or vary from their native behavior.*

### #_order(a, b)

Current order function. Compares 2 items and returns `-1`, `1`, or `0` depending on an order.

Order function can be switched by `#sort()` method.

### #order(a, b)

Uses `#_order()` to compare items. Flips the order if `#reversed` is `true`.

### #indexOf(item)

Uses binary search to look for an item. Returns an item index, or `-1` when not found.

### #insert(item)

Inserts an item in an ordered place. Returns the new item index.

### #push(item1, ..., itemN)

Uses `#insert()` to add one or multiple items to a list. Returns the new list length.

### #reverse()

Reverses the list and flips the `#reversed` flag.

### #reversed

`Boolean`

Flag specifying whether the list is reversed or not. This flag is used by `#order()` to return a proper sort order.

### #sort([orderFunction])

Sorts the list with current or new order function. When `orderFunction` is passed, it'll replace the current `#_order()`.

You can use this to resort the list when `orderFunction` is dynamic and something has changed

#### [orderFunction]

`Function`

Function that accepts 2 arguments, and returns the sort order. Function has to:

- return `-1` when `a < b`
- return `1` when `a > b`
- return `0` otherwise

Example:

```js
function order(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}
```

### #unshift(item1, ..., itemN)

Uses `#insert()` to add one or multiple items to a list. Returns the new list length.

## Testing

To run tests:

```
component install --dev
component build --dev
```

And open `test/index.html`

## License

MIT