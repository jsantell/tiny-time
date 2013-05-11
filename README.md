# tiny-time

Tiny DSL for creating Dates. Inspired by [David Chambers](http://github.com/davidchambers)' [an.hour.ago](https://github.com/davidchambers/an.hour.ago), except without modifying `Number.prototype`.

## Properties

* `now` current timestamp (same as `+new Date()`)

As well as representation of units of time (plural, singular) for `seconds`, `minutes`, `hours`, `days`, `weeks`, `months` (30 days), `years` (365 days)

## Unit creation

```
  t(1).second // 1000
  t(3).minutes // 180000
  t(5).days // 1000 * 60 * 60 * 24 * 5
```

## Date creation

Comparators can accept a `Date` object, and return a `Date` object with the difference relative to the argument.

### before

```
var newYears = new Date('1/1/2013'); // Tue Jan 01 2013 00:00:00 GMT-0800 (PST)
t(10).days.before(newYears); // Sat Dec 22 2012 00:00:00 GMT-0800 (PST)
```

### after, from

`after` and `from` are the same method.
```
  var newYears = new Date('1/1/2013'); // Tue Jan 01 2013 00:00:00 GMT-0800 (PST)
  t(3).weeks.after(newYears); // Tue Jan 22 2013 00:00:00 GMT-0800 (PST)
```

### ago

`ago` is essentially the same as `before`, except it's not a method and gets the time from `now`.

```
new Date(); // Fri May 10 2013 17:44:55 GMT-0800 (PST)
t(1).year.ago; // Thu May 10 2012 17:44:55 GMT-0800 (PST)
```

## Chains

### and
It's possible to extend a time by chaining several `and` calls together. For example, to get the time of 1 year and 3 months ago:

```
new Date(); // Fri May 10 2013 17:47:44 GMT-0800 (PST)
t(1).year.and(t(3).months).ago; // Fri Feb 10 2012 17:47:44 GMT-0800 (PST)
```

## Development

Install dev dependencies via `npm install` and run `npm test` for tests

## License

MIT License
