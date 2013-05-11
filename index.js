var define = Object.defineProperty || function (obj, name, desc) {
  obj.__defineGetter__(name, desc.get);
};

var convert = {
  second: 1000,
  minute: 1000 * 60,
  hour:   1000 * 60 * 60,
  day:    1000 * 60 * 60 * 24,
  week:   1000 * 60 * 60 * 24 * 7,
  month:  1000 * 60 * 60 * 24 * 30,
  year:   1000 * 60 * 60 * 24 * 365
};

Object.keys(convert).forEach(function (unit) {
  convert[unit+'s'] = convert[unit];
});

function Time (value) { this.value = value || 0; }

Time.prototype = {
  before: function (date) { return new Date(+date - this.value); },
  after: function (date) { return new Date(+date + this.value); },
  and: function (date) { return new Time(+date + this.value); },
  valueOf: function () { return this.value; }
};

Time.prototype.from = Time.prototype.after;

define(Time.prototype, 'ago', {
  get: function () { return new Date(T.now - this.value); }
});

function T (val) { return new Time(val); }
define(T, 'now', {
  get: function () { return +new Date(); }
});

Object.keys(convert).forEach(function (unit) {
  T[unit] = convert[unit];
  define(Time.prototype, unit, {
    get: function () { return new Time(this.value * convert[unit]); }
  });
});

module.exports = T;
