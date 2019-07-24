const expect = require('chai').expect;
const commander = require('../index');
const Command = require('../lib/command');

describe('Commander', () => {
  it('should recognize `go to` command', () => {
    const { fn, args } = commander.parse('go to http://example.com');

    expect(Command).to.respondTo(fn.name);
    expect(args).to.deep.equal(['http://example.com']);
  });

  it('should recognize `click` command', () => {
    const { fn, args } = commander.parse('click #id');

    expect(Command).to.respondTo(fn.name);
    expect(args).to.deep.equal(['#id']);
  });

  it('should recognize `wait for element` command', () => {
    const { fn, args } = commander.parse('wait for element #id to be visible');

    expect(Command).to.respondTo(fn.name);
    expect(args).to.deep.equal(['#id']);
  });

  it('should recognize `fill in field` command', () => {
    const { fn, args } = commander.parse('fill in field #id with John Doe');

    expect(Command).to.respondTo(fn.name);
    expect(args).to.deep.equal(['#id', 'John Doe']);
  });

  it('should recognize `url` command', () => {
    const { fn, args } = commander.parse('url should be http://example.com');

    expect(Command).to.respondTo(fn.name);
    expect(args).to.deep.equal(['http://example.com']);
  });

  it('should recognize `check checkbox` command', () => {
    const { fn, args } = commander.parse('check checkbox #id');

    expect(Command).to.respondTo(fn.name);
    expect(fn.name).to.equal('checkboxCheck');
    expect(args).to.deep.equal(['#id']);
  });

  it('should recognize `uncheck checkbox` command', () => {
    const { fn, args } = commander.parse('uncheck checkbox #id');

    expect(Command).to.respondTo(fn.name);
    expect(fn.name).to.equal('checkboxUncheck');
    expect(args).to.deep.equal(['#id']);
  });

  it('should throw an error if a command is not recognized', async () => {
    try {
      await commander.execute('unknown command');
      expect(true).to.be.false; // should not get here
    } catch (error) {
      expect(true).to.be.true;
    }
  });
});
