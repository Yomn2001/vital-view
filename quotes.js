const quotes = [
    "Take care of your body. It's the only place you have to live. – Jim Rohn",
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    "What we eat is a matter of life and death. – Michael Pollan",
    "Self-care is how you take your power back.",
    "You can’t pour from an empty cup. Take care of yourself first.",
    "Nourishing your body and mind is the key to a healthier lifestyle.",
    "Every day may not be good, but there is something good in every day.",
    "Physical fitness is not only one of the most important keys to a healthy body; it is the basis of dynamic and creative intellectual activity. – John F. Kennedy",
    "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
    "It’s not about being the best. It’s about being better than you were yesterday."
];

// Function to generate a random quote
function generateQuote() {
    const quoteText = document.getElementById("quote-text");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
}

// Function to reset the quote text to its initial message
function resetQuote() {
    document.getElementById("quote-text").textContent = "Press 'New Quote' to get a motivational quote!";
}
