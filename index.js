var List = require('list');
var inherit = require('inherit');
var definer = require('definer');
var bind = require('bind');
var listProto = List.prototype;
var writableDescriptor = { writable: true };

module.exports = SortedList;

function SortedList(array, orderFunction) {
	if (!(this instanceof SortedList)) return new SortedList(array, orderFunction);
	if (typeof array === 'function') {
		orderFunction = array;
		array = null;
	}
	definer(this)
		.type('p', writableDescriptor)
		.p('reversed', false)
		.p('_order', orderFunction || defaultOrderFunction);
	List.call(this, array);
}

inherit(SortedList, List);

definer(SortedList.prototype)
	.type('m')

	.m('constructor', SortedList)
	.m('order', order)
	.m('indexOf', indexOf)
	.m('insert', insert)
	.m('push', bulkInsert)
	.m('reverse', reverse)
	.m('sort', sort)
	.m('unshift', bulkInsert);

function defaultOrderFunction(a, b) {
	if (typeof a !== typeof b) {
		a += '';
		b += '';
	}
	return a < b ? -1 : a > b ? 1 : 0;
}

function order(a, b) {
	var direction = this._order(a, b);
	return this.reversed ? direction * -1 : direction;
}

function indexOf(item) {
	var low = 0;
	var high = this.length;
	var index;
	while (high > low) {
		index = (high + low) / 2 >>> 0;
		switch (this.order(this[index], item)) {
			case -1: low = index + 1; break;
			case 1: high = index; break;
			default: return index;
		}
	}
	return -1;
}

function insert(item) {
	var i = this.length;
	this[i] = item;
	this.length++;
	while (i && this.order(item, this[i-1]) < 1) {
		this[i] = this[--i];
		this[i] = item;
	}
	return i;
}

function bulkInsert() {
	for (var i = 0; i < arguments.length; i++) this.insert(arguments[i]);
	return this.length;
}

function sort(orderFunction) {
	if (typeof orderFunction === 'function') this._order = orderFunction;
	return listProto.sort.call(this, bind(this, 'order'));
}

function reverse() {
	this.reversed = !this.reversed;
	listProto.reverse.call(this);
}