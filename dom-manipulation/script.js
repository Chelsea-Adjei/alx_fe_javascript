let quotes = [
    {text: "It does not matter how slowly you go as long as you do not stop.", category:"Motivational"},
    {text: "I can do all things through Christ who strengthens me.", category:"Scriptural"},
    {text: "I am music, music is me.", category:"Music"},
];  // create a lists of quotes first using array

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

function createAddQuoteForm(){  // Function to create the Add Quote form dynamically
    const formContainer = document.getElementById('formContainer');

    const form = document.getElementById('form'); // This is creating a form element.
    form.id = 'addQuoteForm';

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

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add quote';

    //Now append the inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
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

