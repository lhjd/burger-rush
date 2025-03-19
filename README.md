# Burger Rush

A simple web-based game where you build burgers according to orders.

## How to Play

1. Open `index.html` in your web browser.
2. You'll see an order displayed at the top, showing a stack of ingredients.
3. Click on ingredient buttons to add them to your burger, starting from the bottom (first ingredient) to the top (last ingredient).
4. If you add an incorrect ingredient, the game will immediately show a failure message (❌) and generate a new order after 1.5 seconds.
5. If you complete the burger correctly, the game will show a success message (✅) and automatically generate a new order after 1.5 seconds.

## Game Rules

- You must build the burger in the exact order shown, from bottom to top.
- Each burger starts with a bottom bread and ends with a top bread.
- The middle ingredients can be any combination of meat and lettuce.
- Orders are randomly generated with 3-5 total ingredients (including the bread).
- The game ensures each new order is different from the previous one.

## Controls

- Click the ingredient buttons to add ingredients to your burger
- Keyboard shortcuts:
  - `A`: Add bread
  - `S`: Add meat
  - `D`: Add lettuce

## Files

- `index.html` - Main HTML file
- `styles.css` - CSS styles for the game
- `script.js` - JavaScript game logic
