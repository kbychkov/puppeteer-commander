const puppeteer = require('puppeteer');
const Command = require('./command');

const COMMANDS = [{
  pattern: '^go to (.+)$',
  fn: Command.prototype.goTo
}, {
  pattern: '^click (.+)$',
  fn: Command.prototype.click
}, {
  pattern: '^wait for element (.+) to be visible$',
  fn: Command.prototype.waitFor
}, {
  pattern: '^fill in field (.+) with (.+)$',
  fn: Command.prototype.type
}, {
  pattern: '^url should be (.+)$',
  fn: Command.prototype.isUrl
}];

class Commander {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async start(options) {
    this.browser = await puppeteer.launch(options);
    this.page = await this.browser.newPage();
  }

  async stop() {
    await this.browser.close();
  }

  async run(scenario) {
    for (let i = 0; i < scenario.length; i++) {
      const res = await this.execute(scenario[i]);
      if (!res) return res;
    }
    return true;
  }

  async execute(cmd) {
    const { fn, args } = this.parse(cmd);
    if (!fn) throw new Error(`Unknown command: ${cmd}`);

    const command = new Command(this.page);
    return await fn.apply(command, args);
  }

  parse(str) {
    let fn, args;

    COMMANDS.forEach(cmd => {
      const matches = str.match(new RegExp(cmd.pattern, 'i'));
      if (!matches) return;
      fn = cmd.fn;
      args = matches.slice(1);
    });

    return { args, fn };
  }
}

module.exports = Commander;
