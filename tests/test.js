const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build();
  try {
    const url = process.env.APP_URL || 'http://localhost:3000';
    await driver.get(url);
    // Add a todo
    let input = await driver.findElement(By.name('title'));
    await input.sendKeys('Test Todo');
    let button = await driver.findElement(By.css('form[action="/add"] button'));
    await button.click();
    // Check if added
    await driver.wait(until.elementLocated(By.css('li')), 5000);
    let todos = await driver.findElements(By.css('li'));
    if (todos.length > 0) {
      console.log('Test passed: Todo added');
    } else {
      console.log('Test failed');
    }
  } finally {
    await driver.quit();
  }
}

runTest();