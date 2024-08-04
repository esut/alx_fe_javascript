const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "the only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "life is what happens when you're busy making other plans.", category: "Life" },
    { text: "get busy living or get busy dying.", category: "Motivation" },
];

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote()
 {
    const quoteDisplay = document.getElementById('quoteDisplay');

    const randomIndex = Math.floor(Math.random() * quotes.length);

    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function createAddQuoteForm() 
{

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
        saveQuotes();

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert(' added successfully!');
    } else {
        alert('please enter both a quote.');
    }
}
  




function importFromJsonFile(event) 
{
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}


document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// 
createAddQuoteForm();