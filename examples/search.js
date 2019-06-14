const commander = require('../index');

const scenario = [
  'go to https://google.com',
  'fill in field form input[name="q"] with puppeteer',
  'wait for element form input[type="submit"] to be visible',
  'click form input[type="submit"]',
  'wait for element #search to be visible'
];

(async () => {
  await commander.start({
    headless: false,
    defaultViewport: null
  });
  const result = await commander.run(scenario);
  console.log(result);
  await commander.stop();
})();
