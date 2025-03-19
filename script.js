document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const order1Element = document.getElementById('order1');
  const order2Element = document.getElementById('order2');
  const burgerStack1Element = document.getElementById('burger-stack1');
  const burgerStack2Element = document.getElementById('burger-stack2');
  const ingredientButtons = document.querySelectorAll('.ingredient-btn');
  const message1Element = document.getElementById('message1');
  const message2Element = document.getElementById('message2');
  const player1ScoreElement = document.getElementById('player1-score');
  const player2ScoreElement = document.getElementById('player2-score');
  const newGameButton = document.getElementById('new-game-btn');

  // Game state
  let gameActive = false;
  let currentOrder = [];
  let player1Burger = [];
  let player2Burger = [];
  let player1Score = 0;
  let player2Score = 0;
  // Add burger counters and win condition
  const BURGERS_TO_WIN = 3;

  // Ingredients available
  const ingredients = ['bread', 'meat', 'lettuce'];

  // Initialize the game
  startNewGame();

  // Event listeners
  newGameButton.addEventListener('click', startNewGame);

  // Add event listeners for ingredient buttons
  ingredientButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!gameActive) return;

      const ingredient = button.getAttribute('data-ingredient');
      const player = button.getAttribute('data-player');

      if (player === '1') {
        addIngredientToBurger(1, ingredient);
      } else {
        addIngredientToBurger(2, ingredient);
      }
    });
  });

  // Add keyboard event listener
  document.addEventListener('keydown', (event) => {
    if (!gameActive) return;

    const key = event.key.toLowerCase();

    // Player 1 controls (A, S, D)
    switch (key) {
      case 'a':
        addIngredientToBurger(1, 'bread');
        break;
      case 's':
        addIngredientToBurger(1, 'meat');
        break;
      case 'd':
        addIngredientToBurger(1, 'lettuce');
        break;
    }

    // Player 2 controls (J, K, L)
    switch (key) {
      case 'j':
        addIngredientToBurger(2, 'bread');
        break;
      case 'k':
        addIngredientToBurger(2, 'meat');
        break;
      case 'l':
        addIngredientToBurger(2, 'lettuce');
        break;
    }
  });

  // Function to start a new game
  function startNewGame() {
    // Reset game state
    gameActive = true;
    currentOrder = [];
    player1Burger = [];
    player2Burger = [];
    player1Score = 0;
    player2Score = 0;

    // Remove game over class if present
    document.querySelector('.container').classList.remove('game-over');

    // Clear the burger stacks
    burgerStack1Element.innerHTML = '';
    burgerStack2Element.innerHTML = '';

    // Clear the messages
    message1Element.textContent = '';
    message1Element.className = 'message';
    message2Element.textContent = '';
    message2Element.className = 'message';

    // Generate a new random order
    generateNewOrder();

    // Update the score display
    updateScoreDisplay();
  }

  // Function to start a new round
  function startNewRound() {
    // Reset for the next round
    gameActive = true;
    currentOrder = [];
    player1Burger = [];
    player2Burger = [];

    // Clear the burger stacks
    burgerStack1Element.innerHTML = '';
    burgerStack2Element.innerHTML = '';

    // Clear the messages
    message1Element.textContent = '';
    message1Element.className = 'message';
    message2Element.textContent = '';
    message2Element.className = 'message';

    // Generate a new random order
    generateNewOrder();
  }

  // Function to generate a new random order
  function generateNewOrder() {
    currentOrder = [];

    // We want total ingredients to be between 3 and 5
    const orderLength = Math.floor(Math.random() * 3) + 3;

    // Always start with bottom bread
    currentOrder.push('bread');

    // Middle ingredients - exactly orderLength-2 ingredients
    for (let i = 0; i < orderLength - 2; i++) {
      // Only use meat and lettuce for middle ingredients
      const middleIngredients = ['meat', 'lettuce'];
      const randomIndex = Math.floor(Math.random() * middleIngredients.length);
      currentOrder.push(middleIngredients[randomIndex]);
    }

    // Always end with top bread
    currentOrder.push('bread');

    // Display the order for both players
    displayOrder();
  }

  // Function to display the order
  function displayOrder() {
    order1Element.innerHTML = '';
    order2Element.innerHTML = '';

    // Create and display each ingredient in the order for both players
    currentOrder.forEach((ingredient, index) => {
      // For player 1
      const ingredientElement1 = document.createElement('div');
      ingredientElement1.classList.add('ingredient', ingredient);

      // If it's the bottom bread
      if (index === 0 && ingredient === 'bread') {
        ingredientElement1.classList.add('bottom');
      }

      order1Element.appendChild(ingredientElement1);

      // For player 2
      const ingredientElement2 = document.createElement('div');
      ingredientElement2.classList.add('ingredient', ingredient);

      // If it's the bottom bread
      if (index === 0 && ingredient === 'bread') {
        ingredientElement2.classList.add('bottom');
      }

      order2Element.appendChild(ingredientElement2);
    });
  }

  // Function to add an ingredient to the player's burger
  function addIngredientToBurger(player, ingredient) {
    if (!gameActive) return;

    const playerBurger = player === 1 ? player1Burger : player2Burger;
    const burgerStackElement = player === 1 ? burgerStack1Element : burgerStack2Element;
    const messageElement = player === 1 ? message1Element : message2Element;
    const currentIndex = playerBurger.length;

    // Check if this ingredient is correct according to the order
    if (currentIndex < currentOrder.length && ingredient !== currentOrder[currentIndex]) {
      // Wrong ingredient - the other player wins
      playerBurger.push(ingredient);

      // Add the incorrect ingredient to visualize the mistake
      const ingredientElement = document.createElement('div');
      ingredientElement.classList.add('ingredient', ingredient);

      // If it's the bottom bread (first ingredient)
      if (playerBurger.length === 1 && ingredient === 'bread') {
        ingredientElement.classList.add('bottom');
      }

      burgerStackElement.appendChild(ingredientElement);

      // Mark as failed and the other player wins
      gameActive = false;
      messageElement.textContent = "❌ Wrong ingredient!";
      messageElement.className = "message error";

      if (player === 1) {
        player2Score++;
        message2Element.textContent = `🏆 Round win! (${player2Score}/${BURGERS_TO_WIN})`;
        message2Element.className = "message winner";
      } else {
        player1Score++;
        message1Element.textContent = `🏆 Round win! (${player1Score}/${BURGERS_TO_WIN})`;
        message1Element.className = "message winner";
      }

      // Check if someone has won the game
      if (player1Score >= BURGERS_TO_WIN) {
        declareWinner(1);
      } else if (player2Score >= BURGERS_TO_WIN) {
        declareWinner(2);
      } else {
        // Continue to next round after a delay
        setTimeout(startNewRound, 2000);
      }

      updateScoreDisplay();
      return;
    }

    // If correct, add to burger
    playerBurger.push(ingredient);

    // Create and display the ingredient
    const ingredientElement = document.createElement('div');
    ingredientElement.classList.add('ingredient', ingredient);

    // If it's the bottom bread (first ingredient)
    if (playerBurger.length === 1 && ingredient === 'bread') {
      ingredientElement.classList.add('bottom');
    }

    burgerStackElement.appendChild(ingredientElement);

    // Check if the burger is complete
    if (playerBurger.length === currentOrder.length) {
      // This player has completed the burger first - they win
      gameActive = false;

      if (player === 1) {
        player1Score++;
        message1Element.textContent = `✅ Perfect burger! (${player1Score}/${BURGERS_TO_WIN})`;
        message1Element.className = "message success";
        message2Element.textContent = "😢 Too slow!";
        message2Element.className = "message error";
      } else {
        player2Score++;
        message2Element.textContent = `✅ Perfect burger! (${player2Score}/${BURGERS_TO_WIN})`;
        message2Element.className = "message success";
        message1Element.textContent = "😢 Too slow!";
        message1Element.className = "message error";
      }

      // Check if someone has won the game
      if (player1Score >= BURGERS_TO_WIN) {
        declareWinner(1);
      } else if (player2Score >= BURGERS_TO_WIN) {
        declareWinner(2);
      } else {
        // Continue to next round after a delay
        setTimeout(startNewRound, 2000);
      }

      updateScoreDisplay();
    }
  }

  // Function to declare the final winner
  function declareWinner(player) {
    if (player === 1) {
      message1Element.textContent = "🏆 YOU WIN THE GAME! 🏆";
      message1Element.className = "message winner";
      message2Element.textContent = "Game Over";
      message2Element.className = "message error";
    } else {
      message2Element.textContent = "🏆 YOU WIN THE GAME! 🏆";
      message2Element.className = "message winner";
      message1Element.textContent = "Game Over";
      message1Element.className = "message error";
    }

    // Add game over class to container for potential styling
    document.querySelector('.container').classList.add('game-over');
  }

  // Function to update the score display
  function updateScoreDisplay() {
    player1ScoreElement.textContent = `Player 1: ${player1Score}/${BURGERS_TO_WIN} burgers`;
    player2ScoreElement.textContent = `Player 2: ${player2Score}/${BURGERS_TO_WIN} burgers`;
  }
}); 