var
  chai = require('chai'),
  expect = chai.expect,
  t = require('../index.js');

// Helper for use with 'now' times to ensure
// the time is within 2ms of target
chai.Assertion.addMethod('closeTo', function (value) {
  expect(this._obj).to.be.within(value - 2, value + 2);
});

var
  seconds = 1000,
  minutes = seconds * 60,
  hours = minutes * 60,
  days = hours * 24,
  weeks = days * 7,
  months = days * 30,
  years = days * 365;

describe('constants', function () {
  it('has t.now which returns current timestamp', function () {
    expect(t.now).to.be.closeTo(new Date().getTime());
  });
  it('has t.UNIT constants', function () {
    expect(t.second).to.equal(seconds);
    expect(t.seconds).to.equal(seconds);
    expect(t.minute).to.equal(minutes);
    expect(t.minutes).to.equal(minutes);
    expect(t.hour).to.equal(hours);
    expect(t.hours).to.equal(hours);
    expect(t.day).to.equal(days);
    expect(t.week).to.equal(weeks);
    expect(t.weeks).to.equal(weeks);
    expect(t.days).to.equal(days);
    expect(t.month).to.equal(months);
    expect(t.months).to.equal(months);
    expect(t.year).to.equal(years);
    expect(t.years).to.equal(years);
  });
});

describe('units', function () {
  it('converts seconds to ms', function () {
    expect(+t(20).seconds).to.equal(seconds * 20);
    expect(+t(20).second).to.equal(seconds * 20);
  });
  it('converts minutes to ms', function () {
    expect(+t(5).minutes).to.equal(minutes * 5);
    expect(+t(5000).minute).to.equal(minutes * 5000);
  });
  it('converts hours to ms', function () {
    expect(+t(24).hours).to.equal(hours * 24);
    expect(+t(1).hour).to.equal(hours * 1);
  });
  it('converts days to ms', function () {
    expect(+t(15).days).to.equal(days * 15);
    expect(+t(4).day).to.equal(days * 4);
  });
  it('converts weeks to ms', function () {
    expect(+t(200).weeks).to.equal(weeks * 200);
    expect(+t(5).weeks).to.equal(days * 35);
  });
  it('converts months to ms', function () {
    expect(+t(3).months).to.equal(months * 3);
    expect(+t(1).month).to.equal(months * 1);
  });
  it('converts years to ms', function () {
    expect(+t(3).years).to.equal(years * 3);
    expect(+t(10).year).to.equal(years * 10);
  });
});

describe('ranges', function () {
  it('before', function () {
    var date = now() + 10 * days; // 10 days from now
    expect(+t(10).days.before(date)).to.be.closeTo(now());
    expect(+t(1).days.before(date)).to.be.closeTo(now() + days * 9);
    expect(+t(5).minutes.before(t.now)).to.be.closeTo(now() - minutes * 5);
    expect(t(5).days.before(t.now)).to.be.instanceof(Date);
  });
  it('after, from', function () {
    var date = now() - 10 * months; // 10 months ago
    expect(+t(1).month.after(date)).to.be.closeTo(now() - months * 9);
    expect(+t(1).year.after(t.now)).to.be.closeTo(now() + years);
    expect(t(5).days.after(t.now)).to.be.instanceof(Date);
    expect(+t(1).month.from(date)).to.be.closeTo(now() - months * 9);
    expect(+t(1).year.from(t.now)).to.be.closeTo(now() + years);
    expect(t(5).days.from(t.now)).to.be.instanceof(Date);
  });
  it('ago', function () {
    expect(+t(10).days.ago).to.be.closeTo(now() - days * 10);
    expect(+t(1).year.ago).to.be.closeTo(now() - years);
    expect(+t(5).minutes.ago).to.be.closeTo(now() - minutes * 5);
    expect(t(20).minutes.ago).to.be.instanceof(Date);
  });
});

describe('chains', function () {
  it('and', function () {
    expect(+t(1).day.and(t(12).hours).ago).to.be.closeTo(now() - days - hours * 12);
    expect(
      +t(1).day.and(t(12).hours).and(t(36).minutes).ago
    ).to.be.closeTo(now() - days - hours * 12 - minutes * 36);
  });
});

function now() { return +new Date(); }
