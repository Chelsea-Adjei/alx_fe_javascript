let quotes = [
    {text: "It does not matter how slowly you go as long as you do not stop.", category:"Motivational"},
    {text: "I can do all things through Christ who strengthens me.", category:"Scriptural"},
    {text: "I am music, music is me.", category:"Music"},
];  // create a lists of quotes first using array

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length); //the random index used to select a quote is a whole number (an integer).Math.floor() rounds down the decimal result to the nearest whole number, ensuring that the random index is valid and within the bounds of the array.
    const randomQuote = quotes[randomIndex];

    document.getElementById('quoteText').textContent = `"${randomQuote.text}"`; // using the DOM to display the random quote
    document.getElementById('quoteCategory').textContent = `-${randomQuote.category}`; // to display the random category
}

function addQuote(){  // this is the function to add a new quote
    const newQuoteText = document.getElementById('newQuoteText').value.trim(); //getting the values from input field in HTML
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory){ //This is ensuring that both fields are filled. if they're, then....
        const newQuote = { text: newQuoteText, category: newQuoteCategory }; // Adding a new quote to the array at the beginning
        quotes.push(newQuote);

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert('New quote added successfully!'); // if everything done, it should alert this.
    } else {
        alert('Please enter both a quote and a category.'); // if nothing inputted, it should alert this.
    }
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});

