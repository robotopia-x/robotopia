const _ = require('lodash')
const update = require('immutability-helper')
const uid = require('uid')

function init (state) {
  const current = _.assign(
    {},
    state,
    {
      entities: _.reduce(state.entities, (entities, entity) => {
        const entityWithId = createEntity(entity)
        entities[entityWithId.id] = entityWithId
        return entities
      }, {})
    }
  )

  return {
    isGameStepCompleted: true, // when false, game is currently in between two steps
    prev: null,
    current,
    next: null
  }
}

function getGameState (state) {
  if (!state.isGameStepCompleted) {
    return state.next
  }

  return state.current
}

function updateGameState (state, changes) {
  if (!state.isGameStepCompleted) {
    return update(state, { next: changes })
  }

  return update(state, { current: changes })
}

function createEntity (entity) {
  if (!entity.id) {
    entity.id = uid()
  }

  // TODO: enforce component requirements

  return entity
}

function getEntity (id, game) {
  return game.entities[id]
}

function deleteEntity (id, game) {
  return _.omitBy(game.entities, (entitiy) => {
    return entitiy.id === id
  })
}

function getAllEntities (componentType, game) {
  return _.filter(game.entities, (entity) => !_.isUndefined(entity[componentType]))
}

function getGameAPI (componentNames) {
  return {
    reducers: {
      createEntity: (state, { data }) => {
        const entity = createEntity(data)

        return updateGameState(state, {
          entities: {
            [entity.id]: { $set: entity }
          }
        })
      },

      deleteEntity: (state, { data }) => {
        return updateGameState(state, {
          entities: {
            $set: deleteEntity(data.id, state)
          }
        })
      },

      beginStep: (state) => {
        return update(state, {
          next: { $set: state.current },
          isGameStepCompleted: { $set: false }
        })
      },

      _completeStep: (state) => {
        if (state.isGameStepCompleted) {
          return state
        }

        return update(state, {
          prev: { $set: state.current },
          current: { $set: state.next },
          next: { $set: null },
          isGameStepCompleted: { $set: true }
        })
      }
    },

    effects: {
      completeStep: (state, data, send) => {
        _.forEach(componentNames, (name) => {
          send(`game:${name}.update`, {}, _.noop)
        })

        send('game:_completeStep', {}, _.noop)
      }
    }
  }
}

function game ({ state, components, reducers, effects }) {
  // TODO: enforce that there are no components which have effects and reducers with the same name

  // we need to ensure that every component handles the update action which is triggered after every game step
  // if a component has no update handler _.noop is added as effect
  const componentsWithUpdateHandler = getComponentsWithUpdateHandler(components)

  const gameAPI = getGameAPI(_.keys(components))

  return {
    namespace: 'game',
    state: init(state),
    reducers: _.assign(
      {},
      getComponentsReducers(componentsWithUpdateHandler),
      gameAPI.reducers,
      getGlobalReducers(reducers)
    ),
    effects: _.assign(
      {},
      getComponentsEffects(componentsWithUpdateHandler),
      gameAPI.effects,
      getGlobalEffects(effects)
    )
  }
}

function getComponentsReducers (components) {
  return getComponentsActionHandlers('reducers', components, executeReducerAction)
}

function getComponentsWithUpdateHandler (components) {
  return _.mapValues(components, (component, name) => {
    // add _.noop as update effect by default
    if (!hasUpdateHandler(component)) {
      if (!component.effects) {
        component.effects = {}
      }
      component.effects.update = _.noop
      return component
    }

    return component
  })
}

function hasUpdateHandler (component) {
  return (
    (component.reducers && component.reducers.update) || (component.effects && component.effects.update)
  )
}

function getComponentsEffects (components) {
  return getComponentsActionHandlers('effects', components, executeEffectAction)
}

/* getComponentsActionHandlers()

 Combines all action handler of all components of one type.
 There are two different action types in choo: reducers and effects

 handlers are prefixed with the name of the component so if we have two components A and B
 the returned handlers would look something like this

 {
 'A.handler1': function(),
 'A.handler2': function(),
 'B.handler3': function()
 }

 All handlers are wrapped so the action handler has only a view of the data of the entity

 */
function getComponentsActionHandlers (actionType, components, executeAction) {
  return _.reduce(components, (handlers, component, componentType) => {
    return _.reduce(component[actionType], (handlers, actionHandler, reducerName) => {
      handlers[`${componentType}.${reducerName}`] = _.partial(executeAction, componentType, actionHandler)
      return handlers
    }, handlers)
  }, {})
}

function executeReducerAction (componentType, actionHandler, state, { target, data }) {
  const game = getGameState(state)
  let entitiyChanges

  if (target) {
    entitiyChanges = getSingleEntityChanges(actionHandler, target, game, data)
  } else {
    entitiyChanges = getAllEntitiesChanges(actionHandler, componentType, game, data)
  }

  return updateGameState(state, { entities: entitiyChanges })
}

function getSingleEntityChanges (actionHandler, id, state, action) {
  const current = getEntity(id, state)
  const nextChanges = actionHandler(current, action, state)

  return {
    [id]: nextChanges
  }
}

function getAllEntitiesChanges (actionHandler, componentType, state, action) {
  const game = getGameState(state)
  const entities = getAllEntities(componentType, game)

  return _.reduce(entities, (entityChanges, entity) => {
    entityChanges[entity.id] = actionHandler(entity, action, game)

    return entityChanges
  }, {})
}

function executeEffectAction (componentType, actionHandler, state, { target, data }, send, done) {
  const game = getGameState(state)

  if (target) {
    const entity = getEntity(target, game)
    return actionHandler(entity, data, game, send, done)
  }

  const entities = getAllEntities(componentType, game)
  _.forEach(entities, (entity) => {
    actionHandler(entity, data, game, send, done)
  })
}

function getGlobalReducers (reducers) {
  return _.reduce(reducers, (handlers, handler, name) => {
    handlers[name] = (state, data) => {
      const game = getGameState(state)
      return updateGameState(state, handler(game, data))
    }

    return handlers
  }, {})
}

function getGlobalEffects (effects) {
  return _.reduce(effects, (handlers, handler, name) => {
    handlers[name] = (state, data, send, done) => {
      const game = getGameState(state)
      handler(game, data, send, done)
    }

    return handlers
  }, {})
}

module.exports = {
  engine: game,
  getGameState,
  getEntity,
  getAllEntities
}