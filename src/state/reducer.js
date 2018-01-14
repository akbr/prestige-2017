module.exports = function reducer (state, action) {
  return {
    game: state.game,
    ui: uiReducer(state.ui, action)
  }
}

let uiReducer = (ui, action) => {
  switch (action.type) {
    case 'SELECT':
      return Object.assign({}, ui, {selected: action.id})
    case 'DESELECT':
      return Object.assign({}, ui, {selected: null})
    default:
      return ui
  }
}