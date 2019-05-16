## Overview
Defeat nefarious foes by answering random trivia questions! Just like a big, bad boss battle in your favorite video game, widdle away at the bad guy's health bar until they are vanquished. However, the only way to do damage is correctly answering trivia questions hurled your way. Answer incorrectly and your health bar will be the one taking damage. Audio fx serve to bring the enemy boss to life, and loot drops heighten the stakes.

### Functionality
* Played through a series of button clicks, players are presented with a question and have to select the correct answer from several options. Players have limited time to answer.
* Player/Boss health bars update based on whether the player's answer was correct.
* As the game progresses, new questions are generated until either the boss or the player have no remaining health in their health bars.
* Player can choose to play again after they win or lose.
* Bonus Feature: If the player wins, they are rewarded with glorious loot (a cool looking icon representing a legendary weapon or armor piece). Cookies will be used to persist a player's loot drops.
* An emphasis on randomization: questions, sound fx and loot are all randomly drawn from pools.

### Wireframes

### Motivation for project
Gain a deeper understanding of how to manipulate html elements with javascript to create engaging visual and audio experiences. Also, learning to store and retrieve information via cookies to persist a user's loot inventory.

### MVPs
* Aesthetic backdrop featuring an idly animating boss (GIF) to render a question and answer options over
* Random question generation
* Player and boss HP bars that update when a question is answered
* Idle music and random audio cues that trigger based on game events (boss death, correctly/incorrectly answered question, loot drop, etc.)
* Boss defeat and loot drop animations
* Loot inventory display

### Architecture and Technologies
* Vanilla JavaScript for game logic
* HTML audio player for background music and sound fx
* Webpack to bundle scripts
* HTML5 Canvas for rendering

### Implementation Timeline
* **Day 1**
  * Finalize game screen layout
  * Complete board background rendering including idling boss animation
* **Day 2**
  * Gather necessary assets (audio files, images, GIFs)
  * Random question generation logic
* **Day 3**
  * Health bar rendering and decrementation logic
  * Audio hooks and game over logic
* **Day 4**
  * Any remaining styling
  * Seed question and answer data as much as possible, questions are various video game related trivia
