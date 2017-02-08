const _ = require('lodash')
const { getAllEntities } = require('@robotopia/choo-game')

const task = {
  requires: ['team'],

  reducers: {
    setWorkerCompleted: ({ task }) => ({
      task: { completedWorkers: { $set: task.completedWorkers + 1 } }
    }),

    _setAssignedWorkers: (state, { assignedWorkers }) => ({
      task: { assignedWorkers: { $set: assignedWorkers } }
    })
  },

  effects: {
    update: (state, data, game, send) => {
      const { id, task, team } = state

      if (task.completedWorkers === task.requiredWorkers) {
        send('game:deleteEntity', { data: { id: state.id } }, _.noop)
      }

      if (task.requiredWorkers === task.assignedWorkers) {
        return
      }

      // get all workers required by the marker or less if there are not enough unassigned workers available
      const assignableWorkers = getUnassignedWorkers(team.id, game)
        .slice(0, task.requiredWorkers - task.assignedWorkers)

      // update number of assigned workers
      send('game:task._setAssignedWorkers', {
        target: id,
        data: { assignedWorkers: task.assignedWorkers + assignableWorkers.length }
      }, _.noop)

      // assign each worker to marker
      _.forEach(assignableWorkers, ({ id }) => {
        send('game:worker.assignToTask', {
          target: id,
          data: { taskEntity: state }
        }, _.noop)
      })
    }
  }
}

function getUnassignedWorkers (teamId, game) {
  const workers = getAllEntities('worker', game)

  return _.filter(workers, ({ team, worker }) =>
    team.id === teamId && worker.assignedTask === null
  )
}

const worker = {
  requires: ['team'],

  reducers: {
    _assignTask: (state, { task }) => ({
      worker: {
        assignedTask: { $set: task }
      }
    })
  },

  effects: {
    assignToTask: ({ id }, { taskEntity }, game, send) => {
      const { task } = taskEntity

      send('runtime:switchMode', {
        type: task.type,
        target: { id },
        args: [taskEntity]
      }, _.noop)

      send('game:worker._assignTask', {
        target: id,
        data: { task: { id: taskEntity.id, type: taskEntity.task.type } }
      }, _.noop)
    },

    completeTask: ({ id, worker }, data, game, send) => {
      send('game:task.setWorkerCompleted', {
        target: worker.assignedTask.id,
        data: {}
      }, _.noop)

      send('game:worker._assignTask', {
        target: id,
        data: { task: null }
      }, _.noop)
    }
  }
}

module.exports = { task, worker }
