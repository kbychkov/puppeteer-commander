const commander = require('../index');

const scenario = [
  'go to http://example.com',
  'url should be http://example.com/'
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
