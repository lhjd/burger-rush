document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const orderElement = document.getElementById('order');
  const burgerStackElement = document.getElementById('burger-stack');
  const ingredientButtons = document.querySelectorAll('.ingredient-btn');
  const messageElement = document.getElementById('message');

  // Game state
  let currentOrder = [];
  let previousOrder = [];
  let playerBurger = [];
  let gameActive = true;

  // Ingredients available
  const ingredients = ['bread', 'meat', 'lettuce'];

  // Initialize the game
  generateNewOrder();

  // Add event listeners for buttons
  ingredientButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!gameActive) return;

      const ingredient = button.getAttribute('data-ingredient');
      addIngredientToBurger(ingredient);
    });
  });

  // Add keyboard event listener
  document.addEventListener('keydown', (event) => {
    if (!gameActive) return;

    const key = event.key.toLowerCase();

    switch (key) {
      case 'a':
        addIngredientToBurger('bread');
        break;
      case 's':
        addIngredientToBurger('meat');
        break;
      case 'd':
        addIngredientToBurger('lettuce');
        break;
    }
  });

  // Function to generate a new random order
  function generateNewOrder() {
    // Save current order as previous order before reset
    previousOrder = [...currentOrder];

    // Reset game state
    playerBurger = [];
    burgerStackElement.innerHTML = '';
    messageElement.textContent = '';
    messageElement.className = 'message';
    gameActive = true;
    currentOrder = [];

    // Generate a new order that is different from the previous one
    let isSameAsPrevious = true;

    // Keep generating until we get a different order
    while (isSameAsPrevious) {
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

      // Check if new order is different from previous
      if (previousOrder.length === 0 || !arraysEqual(currentOrder, previousOrder)) {
        isSameAsPrevious = false;
      }
    }

    // Display the order
    displayOrder();
  }

  // Helper function to check if two arrays are equal
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  // Function to display the order
  function displayOrder() {
    orderElement.innerHTML = '';

    // Create and display each ingredient in the order
    currentOrder.forEach((ingredient, index) => {
      const ingredientElement = document.createElement('div');
      ingredientElement.classList.add('ingredient', ingredient);

      // If it's the bottom bread
      if (index === 0 && ingredient === 'bread') {
        ingredientElement.classList.add('bottom');
      }

      orderElement.appendChild(ingredientElement);
    });
  }

  // Function to add an ingredient to the burger
  function addIngredientToBurger(ingredient) {
    // Check if current ingredient is correct
    const currentIndex = playerBurger.length;

    // If this ingredient doesn't match the order, fail immediately
    if (currentIndex < currentOrder.length && ingredient !== currentOrder[currentIndex]) {
      playerBurger.push(ingredient);

      // Add the incorrect ingredient to visualize the mistake
      const ingredientElement = document.createElement('div');
      ingredientElement.classList.add('ingredient', ingredient);

      // If it's the bottom bread (first ingredient)
      if (playerBurger.length === 1 && ingredient === 'bread') {
        ingredientElement.classList.add('bottom');
      }

      burgerStackElement.appendChild(ingredientElement);

      // Mark as failed
      gameActive = false;
      messageElement.textContent = "❌";
      messageElement.className = "message error";

      // Wait 1.5 seconds before generating a new order
      setTimeout(generateNewOrder, 1500);
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
      gameActive = false;
      messageElement.textContent = "✅";
      messageElement.className = "message success";

      // Wait 1.5 seconds before generating a new order
      setTimeout(generateNewOrder, 1500);
    }
  }
}); 