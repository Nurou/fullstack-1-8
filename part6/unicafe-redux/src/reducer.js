const initialState = { good: 0, ok: 0, bad: 0 }

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DO_NOTHING':
      return state
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'NEUTRAL':
      return { ...state, ok: state.ok + 1 }
    case 'RESET_STATS':
      return { ...initialState }
    default:
      return state
  }
}

export default counterReducer
