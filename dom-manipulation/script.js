let quotes = JSON.parse(localStorage.getItem('quotes')) || [

    { text: "the only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },

    { text: "life is what happens when you're busy making other plans.", category: "Life" },

    { text: "get busy living or get busy dying.", category: "Motivation" },
];

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const filteredQuotes = getFilteredQuotes();
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function createAddQuoteForm() {
    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
}

function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        updateCategoryFilter();
        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}
