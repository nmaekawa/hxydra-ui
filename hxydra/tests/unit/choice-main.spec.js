import { screen } from '@testing-library/vue'

describe('src/pages/kondo_choice/main.js', () => {
  it('load choice-main page', async () => {
    document.body.innerHTML =
      '<div id="app">' +
      '</div>';
    require('@/pages/kondo_choice/main.js')
    screen.getByText("Configure", {exact: false})
  });
})