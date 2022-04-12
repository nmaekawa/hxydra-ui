import { screen } from '@testing-library/vue'

describe('src/pages/kondo_projects/main.js', () => {
  it('load projects-main page', async () => {
    document.body.innerHTML =
      '<div id="app">' +
      '</div>';
    require('@/pages/kondo_projects/main.js')
    screen.getByText("Projects", {exact: false})
  });
})