# Robotopia :robot:

[![built with choo v4](https://img.shields.io/badge/built%20with%20choo-v4-ffc3e4.svg?style=flat-square)](https://github.com/yoshuawuyts/choo)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/robotopia-x/robotopia/blob/master/LICENSE)

> Robotopia is a browser based programming environment for kids and young adults. The goal is to introduce kids to basic programming concepts with cute little robots.

<p align="center">
  <img src="./assets/img/screenshot.png" align="center" alt="Robotopia Editor"/>
</p>

### [Now, play it!](https://robotopia-x.github.io)

## Features

- [x] Graphical programming environment
    - [x] Blockly code editor
    - [x] Game preview
- [x] Tutorials to introduce programming basics 
    - [x] Commands
    - [x] Conditions
    - [x] Loops
    - [x] Events
    - [x] Basic arithmetic logic
- [x] Competitive mode
    - [x] Client editor to create bots
    - [x] Presenter to present robot competition on a central monitor
    - [x] p2p connection between clients and presenter
    - [x] 1v1 mode
- [x] Programmable robots
    - [x] Movement
    - [x] Pathfinding
    - [x] Collecting Resources
    - [x] Place markers
    - [x] React to events
- [x] Robot script runtime
    - [x] Scriptable with JavaScript
    - [x] Roundbased execution of robot scripts 
    - [x] Events

## How *you* could use this
Here is a short guide to get you started if you're interested in using our tool to organize your own coding events.

### What you'll need
- Around 1,5h of time
- A Computer with a current browser for each kid
- A projector or big screen to display the competition
- Tutors who can help the kids if they have questions,

> Note: We had the impression, that 1 supervisor can handle ~5 kids.

### Agenda

#### 1. Tutorials

Open https://robotopia-x.github.io on each computer. The kids should start with the tutorials to learn the basics of programming.  Meanwhile, the tutors can help them if they struggle with a level or have general questions. After most kids have completed the tutorials you can begin with the competition.

Open http://robotopia-x.github.io/#presenter on the computer connected to the projector and pick a room name (the kids have to enter the same room name when opening the editor)

#### 2. Program your robots

At this point, the supervisors will, together with their assigned kids, build a competitive program.  
They'll show them the basic idea behind the program and make them ready to program their own robot swarm.
Upload the current code by pressing the "Upload" button on the top right corner.

> Note: You'll run the first competitive game with 2 of the build programs

#### 3. Let the robots compete

You now have to get back to the presenter on the projector. Press the "Run" button and select two players that already committed their program.  
You can now press the "Start" button to start the competition.  
> Note: The idea on this point is, that all people in the room now look at the game running on the projector.

#### 4. Improving the programs

When the first few competitions are finished, the kids get time to improve their programs with things they noticed while battling.    
Also, the kids who couldn't build their own program by now get the time and opportunity to commit their own program and compete with the others.
> Note: This part of the event can be extended as long as the kids are interested. 

## Installation

```bash
git clone https://github.com/robotopia-x/robotopia.git
cd robotopia
npm install
npm start
```
A local web server will be started at [http://localhost:9966/](http://localhost:9966/).

## Related
- [Our research repo](https://github.com/robotopia-x/research)
- [Our presentation slides](http://slides.com/pguth/robotopia-x)
