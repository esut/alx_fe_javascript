let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
];

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

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
        const newQuote = 
        { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        updateCategoryFilter();

        alert(' added successfully!');

  
        postQuoteToServer(newQuote);
    } else 
    {
        alert('Please enter both a quote .');
    }
}

function populateCategories() 
{
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;

    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.value = selectedCategory;
}

function getFilteredQuotes() {
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.value = selectedCategory;

    if (selectedCategory === 'all') {
        return quotes;
    } else {
        return quotes.filter(quote => quote.category === selectedCategory);
    }
}

function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
    showRandomQuote();
}

function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        notifyUser('Quotes imported successfully!'); 
    };
    fileReader.readAsText(event.target.files[0]);
}

document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);


async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();
        const serverQuotesArray = serverQuotes.map(post => ({
            text: post.body,
            category: post.title
        }));

        resolveConflicts(serverQuotesArray);
    } catch (error) {
        console.error('error fetching :', error);
        notifyUser('error fetching  from server.'); 
    }
}


async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
        const data = await response.json();
        console.log('posted successfully:', data);
    } catch (error) {
        console.error('Error  server:', error);
    }
}


function resolveConflicts(serverQuotesArray) {
    
    const serverQuoteTexts = new Set(serverQuotesArray.map(q => q.text));
    quotes = quotes.filter(q => !serverQuoteTexts.has(q.text)).concat(serverQuotesArray);
    
    saveQuotes();
    populateCategories();
    filterQuotes();

   
    notifyUser('Quotes synced with server!');  
}

 
function notifyUser(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;  
    setTimeout(() => notification.innerText = '', 5000);  
}

 
function syncQuotes() {
    fetchQuotesFromServer();
}

 
syncQuotes();
setInterval(syncQuotes, 300000);  

createAddQuoteForm();
populateCategories();
filterQuotes();
