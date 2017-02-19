const entities = require('../../models/game/entities')

const timeLimit = 10
const DEFAULT_WORKSPACE = `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="start_handler" x="50" y="50" deletable="false"></block></xml>`

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 3, 2, 3, 3, 1],
        [1, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 3, 3, 1],
        [1, 3, 3, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
        [1, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1],
        [1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1],
        [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 1, 1, 1],
        [1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 4, 5, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [1, 1, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [1, 1, 1, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1],
        [1, 1, 1, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 1],
        [1, 1, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 1],
        [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 2, 2, 2, 2, 3, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 2, 3, 2, 3, 1],
        [1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({x: 12, y: 12, id: 'ROBOT', teamId: 1, discoverRange: 1})
      ]
    },

    ressources: 10,

    editor: {
      workspace: getWorkspace(),

      toolbox: `<xml id="toolbox" style="display: none">
                <category name="RemoveCategories" colour="40">
                    <block type="move"></block>
                    <block type="rotate"></block>
                    <block type="controls_repeat"></block>
                    <block type="controls_if"></block>
                    <block type="logic_compare"></block>
                    <block type="math_number"></block>
                    <block type="random_number"></block>
                </category>
              </xml>`
    },

    label: 'Scout',

    goals: [
      {
        type: 'collectResources',
        params: {amount: 10},
        desc: 'Collect the resource and bring it back to the base',
        isMandatory: true
      }
    ],

    storyModal: {
      text: '',
      hint: '',
      img: 'assets/img/tutorials/simple-move.png'
    },

    nextTutorial: ''
  }

  function getWorkspace() {
    let wsJSON
    let prevTut = localStorage['robot04']
    if (!prevTut) return DEFAULT_WORKSPACE
    try {
      wsJSON = JSON.parse(prevTut)
      if (wsJSON && wsJSON.workspace) {
        return wsJSON.workspace
      }
    } catch (e) {
      console.log(e)
    }
    return DEFAULT_WORKSPACE
  }
}