# Tutorial - what needs to be taught (https://hackmd.io/EbCsGMDMFMAYGYC04DsBGYiAstSkcJABywGiyxoCGRWE0AJkA===)

- [ ] IDE related
  - [x] Code-Blocks are on the left side in the IDE
  - [x] Code-Blocks snatch/attach to each other
  - [x] Code-Blocks can be deleted
  - [x] Code-Block groups
  - [ ] (optional) Can be copy-pasted
  - [x] Run Button Starts
  - [x] Stop Button Resets
  - [ ] Speed Slider
- [ ] Block Useage
  - [x] Move
  - [x] Rotate
  - [ ] Loops
    - [x] Repeat X
    - [ ] While
  - [ ] Move to
    - [ ] XY
    - [x] Position (Base/Marker/Ressource)
  - [ ] IF
    - [x] simple if
    - [x] else
    - [ ] elseif

- [x] My Base
- [ ] Ressources
  - [ ] Types
  - [x] Collect / Deposit
- [ ] Events
  - [ ] When Start
  - [x] When Ressource is discovered
  - [ ] When turning red/blue etc. thanks to markers
- [ ] Marker
  - [ ] amount of robots assigned
  - [ ] placement
  - [ ] robot modus

## Tutorial Levels now

### 01 - Blockly

#### Teaches
* Code-Blocks are on the Left Side
* Code-Blocks attach to each other
* Test/Run Code with play button
* Stop button resets the stage
* Move

#### Goal
Simply move the robot to the stone tile.

#### Workspace
* a couple of "move forwards" are present

#### Available blocks
* Move Forward

#### Solution
1. Take another 1-2 Move Forward Blocks

#### Unlocks
* Rotate Block

### 02 - Delete and Turn

#### Teaches
* Deleting Code
* Rotate

#### Goal
* Move the Robot to the Stone tile
* (optional) don't get dirty

#### Workspace
* Random Code, that does not solve the puzzle

#### Available blocks
* Move Forward
* Rotate

#### Solution
1. Delete weird code
1. add Rotation and Move Blocks
1. (make sure you dont pass dirt for bonus)

#### Unlocks
* Dirty Code Badge
* Loop X times

### 03 - Loop

#### Teaches
* Loop X time

#### Goal
* Move the Robot to the Stone tile
* (optional) Use a loop block inside a loop

#### Workspace
* Loop block (repeat = 3)
  * contains move forward

#### Available blocks
* Move Forward
* Rotate
* Loop X times

#### Solution
1. Repeat count of loop block to 6
1. add Rotation clockwise after the loop block
1. Chose either: 
  * surround all code with another loop (BONUS)
  * Copy Paste all code two times

#### Unlocks
* if
* Random number from A to B

### 04 - Scout

#### Teaches
* Base marked by Star
* if
* conditions
* robots discover ressources within 3 blocks

#### Goal
* Make the robot scout the terrain
  * internally catch the ressource discover and move to next tutorial
* Fast discover
* (optional) Use If/Else with the settings wheel

#### Workspace
* repeat X times (X = 3)
  * if (random number from 0 to 1 == 1)
    * rotate
  * move forward

#### Available blocks
* Move Forward
* Rotate
* Loop X times
* IF
* Random Number from A to B

#### Solution
1. Realize what the existing code does
1. Increase repeat count
1. (optional) Make IF -> IF/ELSE and rotate to other direction in else
1. (optional) Discover quicker by
  * Wrap "move forward" with a loop to travel some distance before turning again
  * or decrease rotate chance

#### Unlocks
* Ressource discovered Event
* Collect Ressource
* Deposit Ressoure

Fließender Übergang zum nächsten Tutorial - (Workspace update)

### 05 - Ressource

#### Teaches
* Codeblock Groups
* Event
  * Jump into other Code Block
* Move TO
  * Base/Ressource
* Ressource
  * Collect
  * Deposit

#### Goal
* Go to the discovered Ressource
* Collect Ressource
* Bring Ressource to Base
* Deposit Ressource

#### Workspace
* continue with Code from last Tutorial
* Dropped "on Ressource" into the Code Area
* (Surround old Code with "on Start")

#### Available blocks
* Movement
  * Move Forward
  * Rotate
  * Move To
* Logic
  * Loop X times
  * IF
* Actions
  * Collect Ressource
  * Deposit Ressource
* Random Number from A to B
* Events

#### Solution
1. in Ressource Event
    1. Move to ressource
    1. Collect Ressource
    1. Move to Base
    1. Deposit Ressource

#### Unlocks
* ?

### 06 - Bots react to Markers
Some bots idling clueless around
marker placed by bot brings them home

### 07 - On "Color" Marker Events
Automated bot places marker on ressources
Code the events

### 08 - ?