var assert = require('assert');
var List = require('list');
var SortedList = require('sortedlist');

/**
 * Custom order function.
 */
function order(a, b) {
	return a < b ? -1 : 1;
}

describe('SortedList([array], [orderFunction])', function () {
	it('should inherit from List', function () {
		var list = new SortedList();
		assert(list instanceof SortedList);
		assert(list instanceof List);
	});
	it('should not require a new keyword' , function () {
		assert(SortedList() instanceof SortedList);
	});
	it('should have a correct constructor' , function () {
		assert(new SortedList().constructor === SortedList);
	});
	it('should sort innitial data', function () {
		var list = new SortedList('cba'.split(''));
		assert(list.join() === 'a,b,c');
	});
	it('should accept custom order function as 1st argument', function () {
		var list = new SortedList(order);
		list.push('b', 'a', 'c');
		assert(list.join() === 'a,b,c');
		assert(list._order === order);
	});
	it('should accept custom order function as 2nd argument', function () {
		var list = new SortedList('cba'.split(''), order);
		assert(list.join() === 'a,b,c');
		assert(list._order === order);
	});
	it('should initialize with reversed false', function () {
		var list = new SortedList();
		assert(list.reversed === false);
	});
	it('should for...in loop only thorugh items', function () {
		var list = new List('abc'.split(''));
		var keys = [];
		for (var key in list) keys.push(key);
		assert(keys.join() === '0,1,2');
	});
});

describe('#_order(a, b) - default order function', function () {
	var order = new SortedList()._order;
	it('should return -1 when a < b', function () {
		assert(order(1, 2) === -1);
	});
	it('should return 1 when a > b', function () {
		assert(order(2, 1) === 1);
	});
	it('should return 0 otherwise', function () {
		assert(order(1, 1) === 0);
	});
	it('should place numbers before letters', function () {
		assert(order(1, 'a') === -1);
	});
});

describe('#order(a, b)', function () {
	it('should flip the result when #reversed === true', function () {
		var list = new SortedList();
		assert(list.order(1, 2) === -1 && list.order(2, 1) === 1 && list.order(1, 1) === 0);
		list.reverse();
		assert(list.order(1, 2) === 1 && list.order(2, 1) === -1 && list.order(1, 1) === 0);
	});
});

describe('#indexOf(item)', function () {
	it('should find an item, and return its index', function () {
		var list = new SortedList('abcdefghijklmnopqrstuvwxyz'.split(''));
		assert(list.indexOf('h') === 7);
		assert(list.indexOf('a') === 0);
		assert(list.indexOf('z') === 25);
	});
	it('should return -1 when item was not found', function () {
		var list = new SortedList('abcdefghijklmnopqrstuvwxyz'.split(''));
		assert(list.indexOf('xx') === -1);
	});
});

describe('#insert(item)', function () {
	it('should sort-insert an item', function () {
		var list = new SortedList('abcdefghijklmnopqrstuvwyz'.split(''));
		var beforeLength = list.length;
		list.insert('x');
		assert(list.join('') === 'abcdefghijklmnopqrstuvwxyz');
		assert(list.length === beforeLength + 1);
	});
	it('should return a new item index', function () {
		var list = new SortedList('bcdefghijklmnopqrstuvwy'.split(''));
		assert(list[list.insert('a')] === 'a');
		assert(list[list.insert('z')] === 'z');
		assert(list[list.insert('x')] === 'x');
		list = new SortedList();
		assert(list[list.insert('a')] === 'a');
	});
});

describe('#push(item1, ..., itemN)', function () {
	it('should sort-insert an item', function () {
		var list = new SortedList('abcdefghijklmnopqrstuvwyz'.split(''));
		var beforeLength = list.length;
		list.push('x');
		assert(list.join('') === 'abcdefghijklmnopqrstuvwxyz');
		assert(list.length === beforeLength + 1);
	});
	it('should sort-insert multiple items', function () {
		var list = new SortedList('bcdefghijklmnopqrstuvwy'.split(''));
		var beforeLength = list.length;
		list.push('x', 'a', 'z');
		assert(list.join('') === 'abcdefghijklmnopqrstuvwxyz');
		assert(list.length === beforeLength + 3);
	});
	it('should return a new list length', function () {
		var list = new SortedList('cdefghijklmnopqrstuvwy'.split(''));
		assert(list.push('a') === list.length);
		assert(list.push('x', 'b', 'z') === list.length);
	});
});

describe('#reverse()', function () {
	it('should reverse a list', function () {
		var list = new SortedList('abc'.split(''));
		list.reverse();
		assert(list.join() === 'c,b,a');
	});
	it('should flip #reversed flag', function () {
		var list = new SortedList('ac'.split(''));
		var before = !list.reversed;
		list.reverse();
		assert(before === list.reversed);
	});
});

describe('#sort([orderFunction])', function () {
	it('should sort a list', function () {
		var list = new SortedList('ac'.split(''));
		list[list.length++] = 'b';
		list.sort();
		assert(list.join() === 'a,b,c');
	});
	it('should replace order function when one is passed', function () {
		var list = new SortedList('ac'.split(''));
		list[list.length++] = 'b';
		list.sort(order);
		assert(list.join() === 'a,b,c');
		assert(list._order === order);
	});
});

describe('#unshift(item1, ..., itemN)', function () {
	it('should sort-insert an item', function () {
		var list = new SortedList('abcdefghijklmnopqrstuvwyz'.split(''));
		var beforeLength = list.length;
		list.unshift('x');
		assert(list.join('') === 'abcdefghijklmnopqrstuvwxyz');
		assert(list.length === beforeLength + 1);
	});
	it('should sort-insert multiple items', function () {
		var list = new SortedList('bcdefghijklmnopqrstuvwy'.split(''));
		var beforeLength = list.length;
		list.unshift('x', 'a', 'z');
		assert(list.join('') === 'abcdefghijklmnopqrstuvwxyz');
		assert(list.length === beforeLength + 3);
	});
	it('should return a new list length', function () {
		var list = new SortedList('cdefghijklmnopqrstuvwy'.split(''));
		assert(list.unshift('a') === list.length);
		assert(list.unshift('x', 'b', 'z') === list.length);
	});
});