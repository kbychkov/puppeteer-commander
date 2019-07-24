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

  describe('checkbox', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8000/checkbox.html');
    });

    it('should check checkbox', async () => {
      const command = new Command(page);

      expect(await page.$eval('#cb1', el => el.checked)).to.equal(false, 'Initial state should be unchecked');
      const result = await command.checkboxCheck('#cb1');
      expect(result).to.equal(true, 'Result should be true');
      expect(await page.$eval('#cb1', el => el.checked)).to.equal(true, 'Next state should be checked');
    });

    it('should uncheck checkbox', async () => {
      const command = new Command(page);

      expect(await page.$eval('#cb2', el => el.checked)).to.equal(true, 'Initial state should be checked');
      const result = await command.checkboxUncheck('#cb2');
      expect(result).to.equal(true, 'Result should be true');
      expect(await page.$eval('#cb2', el => el.checked)).to.equal(false, 'Next state should be unchecked');
    });
  });
});
