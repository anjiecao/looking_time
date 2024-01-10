const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; // Using uppercase 'PORT'

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/playTrial.html'));
});

// Serve game_policy.html when the path is "/game_policy"
app.get('/game_policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/watchTrial.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send('404: Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error message in our server's console
    res.status(500).send('500: Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
