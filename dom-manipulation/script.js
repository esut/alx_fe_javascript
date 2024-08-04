const quotes = [
    { text: "the only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },

    { text: "life is what happens when you're busy making other plans.", category: "Life" },
    
    { text: "get busy living or get busy dying.", category: "Motivation" },
  ];
  
  
  function showRandomQuote() {

    const quoteDisplay = document.getElementById('quoteDisplay');

    const randomIndex = Math.floor(Math.random() * quotes.length);

    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
  }
  
  //show new quote
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  function addQuote() 
  {
    const newQuoteText = document.getElementById('newQuoteText').value;

    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) 
        {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);

      document.getElementById('newQuoteText').value = '';

      document.getElementById('newQuoteCategory').value = '';

      alert('quote added successfully!');
    } else {
      alert('please enter both a quote and a category.');
    }
  }