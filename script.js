document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const order1Element = document.getElementById('order1');
  const order2Element = document.getElementById('order2');
  const burgerStack1Element = document.getElementById('burger-stack1');
  const burgerStack2Element = document.getElementById('burger-stack2');
  const feedback1Element = document.getElementById('feedback1');
  const feedback2Element = document.getElementById('feedback2');
  const ingredientButtons = document.querySelectorAll('.ingredient-btn');
  const player1Circles = document.querySelectorAll('.player1-circles .circle');
  const player2Circles = document.querySelectorAll('.player2-circles .circle');
  const newGameButton = document.getElementById('new-game-btn');
  const startButton = document.getElementById('start-btn');
  const player1Area = document.querySelector('.player1-area');
  const player2Area = document.querySelector('.player2-area');

  // Game state
  let gameActive = false;
  let currentOrder = [];
  let player1Burger = [];
  let player2Burger = [];
  let player1Score = 0;
  let player2Score = 0;
  let countdownActive = false;
  // Add burger counters and win condition
  const BURGERS_TO_WIN = 3;
  // Track previous order to prevent repeats
  let previousOrder = [];

  // Initialize the game
  startNewGame();

  // Event listeners
  newGameButton.addEventListener('click', startNewGame);
  startButton.addEventListener('click', startCountdown);

  // Add event listeners for ingredient buttons
  ingredientButtons.forEach(button => {
    // Keep click support for mouse users
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

    // Add touchstart support for touch devices
    button.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Prevent default behavior
      if (!gameActive) return;

      const ingredient = button.getAttribute('data-ingredient');
      const player = button.getAttribute('data-player');

      if (player === '1') {
        addIngredientToBurger(1, ingredient);
      } else {
        addIngredientToBurger(2, ingredient);
      }
    }, { passive: false });
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

  // Add countdown function
  function startCountdown() {
    if (countdownActive) return;

    countdownActive = true;
    gameActive = false;

    // Hide the START button after it's clicked
    startButton.classList.add('hidden');

    // Create countdown overlay
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    document.body.appendChild(countdownElement);

    // Start the countdown sequence
    countdownElement.textContent = '3';

    setTimeout(() => {
      countdownElement.textContent = '2';

      setTimeout(() => {
        countdownElement.textContent = '1';

        setTimeout(() => {
          countdownElement.textContent = 'GO!';

          setTimeout(() => {
            // Remove the countdown overlay and activate the game
            countdownElement.remove();
            gameActive = true;
            countdownActive = false;

            // Show the orders only after countdown
            order1Element.classList.add('visible');
            order2Element.classList.add('visible');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  // Function to start a new game
  function startNewGame() {
    // Reset game state
    gameActive = false;
    countdownActive = false;
    currentOrder = [];
    player1Burger = [];
    player2Burger = [];
    player1Score = 0;
    player2Score = 0;

    // Remove game over class if present
    document.querySelector('.container').classList.remove('game-over');

    // Clear the burger stacks but preserve the feedback overlays
    clearBurgerStack(burgerStack1Element);
    clearBurgerStack(burgerStack2Element);

    // Reset visual feedback
    resetVisualFeedback();

    // Reset the score circles
    resetScoreCircles();

    // Remove any confetti
    removeAllConfetti();

    // Hide orders until countdown starts
    order1Element.classList.remove('visible');
    order2Element.classList.remove('visible');

    // Show the START button
    startButton.classList.remove('hidden');

    // Generate a new random order
    generateNewOrder();
  }

  // Function to reset score circles
  function resetScoreCircles() {
    // Reset player 1 circles
    player1Circles.forEach(circle => {
      circle.classList.remove('filled');
    });

    // Reset player 2 circles
    player2Circles.forEach(circle => {
      circle.classList.remove('filled');
    });
  }

  // Function to reset visual feedback
  function resetVisualFeedback() {
    player1Area.classList.remove('error', 'success', 'winner');
    player2Area.classList.remove('error', 'success', 'winner');

    // Hide feedback overlays
    feedback1Element.classList.remove('visible', 'success', 'error');
    feedback2Element.classList.remove('visible', 'success', 'error');
  }

  // Function to start a new round
  function startNewRound() {
    // Reset for the next round
    gameActive = false;
    currentOrder = [];
    player1Burger = [];
    player2Burger = [];

    // Clear the burger stacks but preserve the feedback overlays
    clearBurgerStack(burgerStack1Element);
    clearBurgerStack(burgerStack2Element);

    // Reset visual feedback
    resetVisualFeedback();

    // Generate a new random order
    generateNewOrder();

    // Make orders visible immediately (since countdown has been done for the game)
    order1Element.classList.add('visible');
    order2Element.classList.add('visible');

    // Enable ingredient inputs immediately (don't require Start button between rounds)
    gameActive = true;
  }

  // Function to generate a new random order
  function generateNewOrder() {
    // Store the current order before overwriting it
    previousOrder = [...currentOrder];
    currentOrder = [];

    // Function to create a new order
    const createOrder = () => {
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
    };

    // Create a new order
    createOrder();

    // Check if the new order is the same as the previous one
    // and regenerate if it is (and if we had a previous order)
    let attempts = 0;
    const maxAttempts = 5;

    while (previousOrder.length > 0 && arraysEqual(currentOrder, previousOrder) && attempts < maxAttempts) {
      createOrder();
      attempts++;
    }

    // If we still have the same order after multiple attempts, force a difference
    if (previousOrder.length > 0 && arraysEqual(currentOrder, previousOrder)) {
      // Force a change by modifying at least one middle ingredient
      if (currentOrder.length <= 3) {
        // If burger only has 3 ingredients (2 bread + 1 middle), add one more ingredient
        currentOrder.splice(currentOrder.length - 1, 0, previousOrder[1] === 'meat' ? 'lettuce' : 'meat');
      } else {
        // Find a middle index (not first or last bread)
        const middleIndex = Math.floor(Math.random() * (currentOrder.length - 2)) + 1;
        // Toggle between meat and lettuce
        currentOrder[middleIndex] = currentOrder[middleIndex] === 'meat' ? 'lettuce' : 'meat';

        // If the order is still the same (unlikely but possible), add or remove an ingredient
        if (arraysEqual(currentOrder, previousOrder)) {
          if (currentOrder.length < 5) {
            // Add an ingredient if we have room
            currentOrder.splice(currentOrder.length - 1, 0, 'meat');
          } else {
            // Remove a middle ingredient
            currentOrder.splice(Math.floor(Math.random() * (currentOrder.length - 2)) + 1, 1);
          }
        }
      }
    }

    // Display the order for both players
    displayOrder();
  }

  // Utility function to compare arrays
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
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
    const playerFeedback = player === 1 ? feedback1Element : feedback2Element;
    const playerArea = player === 1 ? player1Area : player2Area;
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

      // Show red cross on the player's burger who made the mistake
      playerFeedback.classList.add('visible', 'error');

      if (player === 1) {
        player2Score++;
        updateScoreCircles(2);
      } else {
        player1Score++;
        updateScoreCircles(1);
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
        // Show green tick on the successful burger
        feedback1Element.classList.add('visible', 'success');
        updateScoreCircles(1);
      } else {
        player2Score++;
        // Show green tick on the successful burger
        feedback2Element.classList.add('visible', 'success');
        updateScoreCircles(2);
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
    }
  }

  // Function to update score circles
  function updateScoreCircles(player) {
    const circles = player === 1 ? player1Circles : player2Circles;
    const score = player === 1 ? player1Score : player2Score;

    // Fill in circles up to the current score
    for (let i = 0; i < circles.length; i++) {
      if (i < score) {
        circles[i].classList.add('filled');
      } else {
        circles[i].classList.remove('filled');
      }
    }
  }

  // Function to declare the final winner
  function declareWinner(player) {
    // Reset visual feedback first
    resetVisualFeedback();

    const winnerArea = player === 1 ? player1Area : player2Area;

    // Add winner class to the winner's area
    winnerArea.classList.add('winner');

    // Create a single burst of abundant confetti for the game winner
    createConfetti(winnerArea);

    // Add game over class to container for potential styling
    document.querySelector('.container').classList.add('game-over');
  }

  // Function to clear burger stack but preserve feedback overlay
  function clearBurgerStack(stackElement) {
    // Save the feedback overlay
    const feedbackOverlay = stackElement.querySelector('.feedback-overlay');

    // Clear the stack
    stackElement.innerHTML = '';

    // Re-append the feedback overlay
    if (feedbackOverlay) {
      stackElement.appendChild(feedbackOverlay);
    }
  }

  // Function to remove all confetti elements
  function removeAllConfetti() {
    const confettiElements = document.querySelectorAll('.confetti');
    confettiElements.forEach(element => {
      element.remove();
    });
  }
}); 