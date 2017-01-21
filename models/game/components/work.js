const _ = require('lodash')
const { getAllEntities } = require('../../../lib/game')

const task = {
  requires: ['team'],

  reducers: {
    _setAssignedWorkers: (state, { assignedWorkers }) => {
      return {
        task: { assignedWorkers: { $set: assignedWorkers } }
      }
    }
  },

  effects: {
    update: (state, data, game, send) => {
      const { id, task, team } = state

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
    team.id === teamId && worker.assignedTaskId === null
  )
}

const worker = {
  requires: ['team'],

  reducers: {
    _assignTaskId: (state, { taskId }) => (
      { worker: { assignedTaskId: { $set: taskId } } }
    )
  },

  effects: {
    assignToTask: ({ id }, { taskEntity }, game, send) => {
      const { task } = taskEntity

      send('runtime:switchMode', {
        name: task.name,
        target: { id },
        args: [ taskEntity ]
      }, _.noop)

      send('game:worker._assignTaskId', {
        target: id,
        data: { taskId: taskEntity.id }
      }, _.noop)
    }
  }
}

module.exports = { task, worker }
