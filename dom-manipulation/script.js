let quotes = [
    {text: "It does not matter how slowly you go as long as you do not stop.", category:"Motivational"},
    {text: "I can do all things through Christ who strengthens me.", category:"Scriptural"},
    {text: "I am music, music is me.", category:"Music"},
];  // create a lists of quotes first using array

// Load quotes from localStorage if available
window.onload = function() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
      //displayQuotes();
      populateCategories();
    }
};

// Mock API URL for simulation
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your own server or mock API if needed

// Load quotes from local storage on initialization
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Fetch quotes from the simulated server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Simulate quote structure
        const serverQuotes = data.map(item => ({
            text: item.title,
            category: "General" // Assign a default category for simulation
        }));
        return serverQuotes;
    } catch (error) {
        console.error("Error fetching data from server:", error);
        return [];
    }
}

function startDataSync() {
    setInterval(async () => {
        const serverQuotes = await fetchQuotesFromServer();
        if (JSON.stringify(quotes) !== JSON.stringify(serverQuotes)) {
            localStorage.setItem('quotes', JSON.stringify(serverQuotes));
            quotes = serverQuotes;
            displayQuotes();
            notifyUser('Data synced with server.');
        }
    }, 10000); // Sync every 10 seconds
}

// Set interval to fetch quotes every 30 seconds (30000 ms)
setInterval(fetchQuotesFromServer, 30000);


// Sync local quotes with server quotes
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    if (serverQuotes.length > 0) {
        const mergedQuotes = mergeQuotes(quotes, serverQuotes);
        quotes = mergedQuotes;
        saveQuotes();
        alert('Quotes synced with server!'); // Added alert for sync success
        filterQuotes(); // Update displayed quotes
    }
}

// Merge local quotes with server quotes
function mergeQuotes(localQuotes, serverQuotes) {
    const quoteMap = new Map();

    // Add local quotes to map
    localQuotes.forEach(quote => quoteMap.set(quote.text, quote));

    // Add server quotes to map, replacing any existing ones
    serverQuotes.forEach(quote => quoteMap.set(quote.text, quote));

    return Array.from(quoteMap.values());
}


function showRandomQuote(){ // function to display a random quote using innerHTML
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = "No quotes available.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length); //the random index used to select a quote is a whole number (an integer).Math.floor() rounds down the decimal result to the nearest whole number, ensuring that the random index is valid and within the bounds of the array.
    const randomQuote = quotes[randomIndex];

    document.getElementById('quoteText').textContent = `"${randomQuote.text}"`; // using the DOM to display the random quote
    document.getElementById('quoteCategory').textContent = `-${randomQuote.category}`; // to display the random category
}

// Function to display all quotes
function displayQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = quotes.map(quote => `<p>"${quote.text}" - ${quote.category}</p>`).join('');
}

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });

        if (!response.ok) {
            throw new Error('Failed to post the quote to the server.');
        }

        const newQuote = await response.json();
        console.log('Quote successfully posted to the server:', newQuote);
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

function createAddQuoteForm(){  // Function to create the Add Quote form dynamically
    const formContainer = document.getElementById('formContainer');

    let form = document.getElementById('form'); // This is creating a form element.
    form = 'addQuoteForm';

    const quoteInput = document.createElement('input'); // creating the input "text" form.
    quoteInput.type = 'text'; //the input will be texts.
    quoteInput.id = 'newQuoteText'; // where the quote will be inputted.
    quoteInput.placeholder = 'Enter a new quote';
    quoteInput.required = true;

    const categoryInput = document.createElement('input'); // creating the input "category"
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category'
    categoryInput.required = true;

    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes as JSON';
    exportButton.addEventListener('click', exportToJson);


    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add quote';

    //Now append the inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(exportButton);
    form.appendChild(submitButton);

    //Then Append the form to the container.
    formContainer.appendChild(form);

    //Now add an event listener to the form when submitted ot clicked on the submit button.
    form.addEventListener('submit', function(event){
    event.preventDefault(); // Prevent page reload on form submission
    addQuote(); // Call the addQuote function
    });
}

function addQuote(){  // this is the function to add a new quote
    const newQuoteText = document.getElementById('newQuoteText').value.trim(); //getting the values from input field in HTML
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory){ //This is ensuring that both fields are filled. if they're, then....
        const newQuote = { text: newQuoteText, category: newQuoteCategory }; // Adding a new quote to the array at the beginning
        quotes.push(newQuote);
        saveQuotes();
        displayQuotes();
        populateCategories();

        document.getElementById('newQuoteText').value = '';  //clear input files
        document.getElementById('newQuoteCategory').value = '';

        alert('New quote added successfully!'); // if everything done, it should alert this.
    } else {
        alert('Please enter both a quote and a category.'); // if nothing inputted, it should alert this.
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    // Clear existing options except for 'All Categories'
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

    // Create a Set to store unique categories
    const categories = new Set(quotes.map(quote => quote.category));

    // Populate dropdown with unique categories
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    // Load last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    }
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteList = document.getElementById('quoteList');

    // Save the selected category to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);

    // Filter and display quotes
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);

    quoteList.innerHTML = filteredQuotes.map((quote, index) =>
      `<li>${quote.text} (${quote.category})
        <button onclick="removeQuote(${index})">Delete</button></li>`
    ).join('');
}

function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Pretty JSON format
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(); // Save to local storage after importing
      displayQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm(); // Create the form
    displayQuotes(); // Display the initial quotes
});