import { screen } from '@testing-library/vue'

describe('src/pages/kondo_reportlist/main.js', () => {
  it('load reportlist-main page', async () => {
    document.body.innerHTML =
      '<div id="app">' +
      '</div>';
    require('@/pages/kondo_reportlist/main.js')
    screen.getByText("Reports", {exact: false})
  });
})