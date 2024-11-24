import { Builder, Browser, By, Key } from 'selenium-webdriver';
import fs from 'fs/promises';
import { waitTill, SECOND, wrongBehavior, WrongBehavior } from './utils.js'

export class TestUserManagementSystem {
  constructor(driver, url) {
    this.driver = driver;
    this.url = url;
  }

  async run() {
    try {
      await this.#can_signin_with_correct_credentials();
      await this.#cant_signin_with_incorrect_credentials();
    } catch (error) {
      console.log(error);
    }
  }


  async #cant_signin_with_incorrect_credentials() {
    await this.driver.get(this.url)
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div[4]/button')).click();
    await this.driver.findElement(By.xpath('//*[@id=":r0:"]')).sendKeys('fran@qvitae.com');
    await this.driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys('droide03as');
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();

    await waitTill(SECOND * 2);
    try {
      await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[1]/div[1]/div[3]/div[1]/h1'));
      wrongBehavior('should not enter', 'enter');
    } catch (error) {
      if (error instanceof WrongBehavior) {
        throw error
      }

      const image = await this.driver.takeScreenshot();
      await fs.writeFile('./tests-screenshots/cant_signin.png', image, 'base64');
      return;
    }
  }

  async #can_signin_with_correct_credentials() {
    await this.driver.get(this.url)
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div[4]/button')).click();
    await this.driver.findElement(By.xpath('//*[@id=":r0:"]')).sendKeys('fran@qvitae.com');
    await this.driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys('droide03');
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();
    await this.driver.findElement(By.xpath('/html/body/div/main/div/div[2]/div/div/div/form/input')).click();

    await waitTill(SECOND * 2);
    await this.driver.findElement(By.xpath('/html/body/div/div/div/main/section[1]/div[1]/div[3]/div[1]/h1')).getText();

    const image = await this.driver.takeScreenshot();
    await fs.writeFile('./tests-screenshots/can_signin.png', image, 'base64');
  }
}
