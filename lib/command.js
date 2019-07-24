class Command {
  constructor(page) {
    this.page = page;
  }

  async goTo(url) {
    try {
      await this.page.goto(url);
    } catch (error) {
      return false;
    }
    return true;
  }

  async click(selector) {
    try {
      await this.page.click(selector);
    } catch (error) {
      return false;
    }
    return true;
  }

  async waitFor(selector) {
    try {
      await this.page.waitForSelector(selector, { visible: true });
    } catch (error) {
      return false;
    }
    return true;
  }

  async type(selector, text) {
    try {
      await this.page.type(selector, text);
    } catch (error) {
      return false;
    }
    return true;
  }

  async checkbox(selector, checked) {
    try {
      const isChecked = await this.page.$eval(selector, el => el.checked);
      if ((checked && !isChecked) || (!checked && isChecked)) await this.page.click(selector);
    } catch (error) {
      return false;
    }
    return true;
  }

  async checkboxCheck(selector) {
    return await this.checkbox(selector, true);
  }

  async checkboxUncheck(selector) {
    return await this.checkbox(selector, false);
  }

  isUrl(value) {
    return this.page.url() === value;
  }
}

module.exports = Command;
