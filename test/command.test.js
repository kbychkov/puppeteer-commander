const expect = require('chai').expect;
const Command = require('../lib/command');
const puppeteer = require('puppeteer');
const {TestServer} = require('@pptr/testserver');
const path = require('path');

describe('Command', () => {
  let httpServer, browser, page;

  before(async () => {
    const root = path.join(__dirname, 'assets');
    httpServer = await TestServer.create(root, 8000);
  });

  after(async () => {
    await httpServer.stop();
  });

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  describe('goto', () => {
    it('should open test page', async () => {
      const command = new Command(page);

      await command.goTo('http://localhost:8000');
      expect(await page.title()).to.equal('Home page');
    });
  });
});
