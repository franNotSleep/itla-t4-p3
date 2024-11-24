const webdriver = require('selenium-webdriver');
const fs = require('fs/promises')
const { By, until, Browser } = require('selenium-webdriver');

const SECOND = 1000;

const waitTill = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  })
}

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const login = async (driver) => {
  await driver.get("https://qvitae.com.do")
  await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div[4]/button')).click();
  await driver.findElement(By.xpath('//*[@id=":r0:"]')).sendKeys('fran@qvitae.com');
  await driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys('droide03');
  await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();
  await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();

  await waitTill(SECOND * 2);
  await driver.findElement(By.xpath('/html/body/div/div/div/main/section[1]/div[1]/div[3]/div[1]/h1')).getText();
}

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    driver = new webdriver.Builder().forBrowser(Browser.FIREFOX).build();

    // eslint-disable-next-line no-undef
    await driver.get(`https://qvitae.com.do`);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);


  test('can login with correct credentials', async () => {
    await driver.get("https://qvitae.com.do")
    await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div[4]/button')).click();
    await driver.findElement(By.xpath('//*[@id=":r0:"]')).sendKeys('fran@qvitae.com');
    await driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys('droide03');
    await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();
    await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();

    await waitTill(SECOND * 2);
    const el = await driver.findElement(By.xpath('/html/body/div/div/div/main/section[1]/div[1]/div[3]/div[1]/h1')).getText();

    const image = await driver.takeScreenshot();
    await fs.writeFile('./tests-screenshots/can_signin.png', image, 'base64');
  }, 10000)


  test("can't login with incorrect credentials", async () => {
    await driver.get(`https://qvitae.com.do`)
    await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div[4]/button')).click();
    await driver.findElement(By.xpath('//*[@id=":r0:"]')).sendKeys('fran@qvitae.com');
    await driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys('droide03as');
    await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();
    await driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();

    await waitTill(SECOND * 2);
    try {
      await driver.findElement(By.xpath('/html/body/div/div/div/main/section[1]/div[1]/div[3]/div[1]/h1'));
    } catch (error) {
      const image = await driver.takeScreenshot();
      await fs.writeFile('./tests-screenshots/cant_signin.png', image, 'base64');
      return;
    }
  }, 10000)

  test('should see experiences section', async () => {
    await login(driver);
    const got = await driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[3]')).getText();
    const expected = "Work experience";

    expect(expected).toEqual(got);

    const image = await driver.takeScreenshot();
    await fs.writeFile('./tests-screenshots/can_see_experiences.png', image, 'base64');
  }, 10000)

  test('should see education section', async () => {
    await login(driver);
    const got = await driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[3]')).getText();
    const expected = "Work experience";

    expect(expected).toEqual(got);

    const image = await driver.takeScreenshot();
    await fs.writeFile('./tests-screenshots/can_see_experiences.png', image, 'base64');
  }, 10000)

  test('should see skill section', async () => {
    await login(driver);
    const got = await driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[1]/h2')).getText();
    const expected = "About";

    expect(expected).toEqual(got);
    const image = await driver.takeScreenshot();
    await fs.writeFile('./tests-screenshots/can_see_skill.png', image, 'base64');
  }, 10000)

  test('should see about section', async () => {
    await login(driver);
    const got = await driver.findElement(By.xpath('/html/body/div/div/div/main/section[2]/div/div/div/div[1]/h2')).getText();
    const expected = "About";

    expect(expected).toEqual(got);

    const image = await driver.takeScreenshot();
    await fs.writeFile('./tests-screenshots/can_see_about.png', image, 'base64');
  }, 10000)
});
