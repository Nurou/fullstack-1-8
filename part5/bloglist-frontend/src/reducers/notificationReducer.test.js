import notificationReducer from './notificationReducer'

describe('notificationReducer', () => {
  test('returns new state with action NEW_NOTIFICATION', () => {
    const state = null
    const action = {
      type: 'NEW_NOTIFICATION',
      notification: 'hey',
    }

    const newState = notificationReducer(state, action)

    expect(newState).toEqual(action.notification)
  })
})
