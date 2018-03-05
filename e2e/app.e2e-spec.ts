import { TffFrontPage } from './app.po';

describe('tff-front App', function() {
  let page: TffFrontPage;

  beforeEach(() => {
    page = new TffFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
