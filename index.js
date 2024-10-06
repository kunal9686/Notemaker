const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

// Home page
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.error("Error reading files:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.render('index', { kunnu: files });
    });
});

// Create File Form
app.get('/create', (req, res) => {
    res.render('create'); // Render create form
});

// Create new file
app.post('/create', (req, res) => {
    const fileName = req.body.title.split(' ').join('') + '.txt';
    fs.writeFile(`./files/${fileName}`, req.body.details, (err) => {
        if (err) {
            console.error("Error creating file:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.redirect('/');
    });
});

// Edit file form
app.get("/edit/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file for editing:", err);
            return res.status(404).send("File not found");
        }
        res.render("edit", { title: req.params.filename, content: data });
    });
});

// Update file content
app.post("/edit/:filename", (req, res) => {
    fs.writeFile(`./files/${req.params.filename}`, req.body.details, (err) => {
        if (err) {
            console.error("Error updating file:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.redirect('/');
    });
});

// Show file content
app.get('/:filename', (req, res) => {
    const filepath = path.join(__dirname, 'files', req.params.filename);
    fs.readFile(filepath, 'utf8', (err, content) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(404).send("File not found");
        }
        res.render('show', { title: req.params.filename, name: content });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
