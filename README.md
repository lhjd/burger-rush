# Burger Rush - 2 Player Edition

A competitive 2-player web-based game where players race to build burgers according to orders.

## How to Play

1. Open `index.html` in your web browser.
2. You'll see an identical order displayed for both players, showing a stack of ingredients.
3. Players compete side by side to build the same burger.
4. The first player to correctly complete their burger wins the round and earns a point.
5. If a player adds an incorrect ingredient, they lose immediately and the other player wins the round.
6. **The first player to successfully build 3 burgers wins the game!**
7. Click the "New Game" button to start a new game.

## Game Rules

- Both players must build the same burger in the exact order shown, from bottom to top.
- Each burger starts with a bottom bread and ends with a top bread.
- The middle ingredients can be any combination of meat and lettuce.
- Orders are randomly generated with 3-5 total ingredients (including the bread).
- Players race against each other - the fastest player to complete the burger correctly wins the round.
- Making a mistake results in immediate loss of the round.
- The first player to win 3 rounds (build 3 correct burgers) wins the entire game.
- A new round starts automatically after a short delay.

## Controls

### Player 1 (Left side)

- Click the ingredient buttons to add ingredients to your burger
- Keyboard shortcuts:
  - `A`: Add bread
  - `S`: Add meat
  - `D`: Add lettuce

### Player 2 (Right side)

- Click the ingredient buttons to add ingredients to your burger
- Keyboard shortcuts:
  - `J`: Add bread
  - `K`: Add meat
  - `L`: Add lettuce

## Files

- `index.html` - Main HTML file
- `styles.css` - CSS styles for the game
- `script.js` - JavaScript game logic
