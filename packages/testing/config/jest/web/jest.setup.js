/* eslint-env jest */

require('@testing-library/jest-dom')
require('whatwg-fetch')

const { jestPreviewConfigure } = require('jest-preview')

const { getProject } = require('@redwoodjs/structure')
const {
  startMSW,
  setupRequestHandlers,
  mockGraphQLMutation,
  mockGraphQLQuery,
  mockCurrentUser,
} = require('@redwoodjs/testing/web')

global.mockGraphQLQuery = mockGraphQLQuery
global.mockGraphQLMutation = mockGraphQLMutation
global.mockCurrentUser = mockCurrentUser

const project = getProject()

jestPreviewConfigure({
  autoPreview: true,
  // TODO: Add public folder
})

beforeEach(async () => {
  // Import the global mocks.
  for (const m of project.mocks) {
    require(m)
  }
  await startMSW('node')
  setupRequestHandlers() // reset the handlers in each test.
})
