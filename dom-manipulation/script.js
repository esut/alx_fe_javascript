const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
];

function showRandomQuote()
 {
    const quoteDisplay = document.getElementById('quoteDisplay');

    const randomIndex = Math.floor(Math.random() * quotes.length);

    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
}

//Show New Quote 
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteButton">Add Quote</button>
    `;
    document.body.appendChild(formContainer);

    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
}

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

        alert('added successfully!');
    } else 
    {
        alert('please enter both a quote .');
    }
}

// 
createAddQuoteForm();
