describe('Protractor Demo App', function() {
    var firstNumber = element(by.model('vm.query')),
        goButton = element(by.className('submit')),
        latestResult = element(by.className('list')),
        noResult = element(by.className('no-search'));

    beforeEach(function() {
        browser.get('http://angular-kashif.herokuapp.com/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Music Search');
    });

    it('should search get some results', function() {
        firstNumber.sendKeys('Qadri');

        goButton.click();
        browser.wait(expect(latestResult.isDisplayed()).toBe(true), 15 * 1000, 'Wait please');

    });

    it('should search and get no result', function() {
        firstNumber.sendKeys('dfjksahdjhsa');

        goButton.click();
        browser.wait(expect(noResult.isDisplayed()).toBe(true), 15 * 1000, 'Wait please');

    });

    it('should open modal', function() {
        firstNumber.sendKeys('Qadri');

        goButton.click();

        browser.wait(function() {
            return element(by.id('item-3')).isPresent();
        }, 6000);

        (element(by.id('item-3'))).click();
        browser.sleep(3000);
        expect(element(by.className('modal')).isDisplayed());

    });
});