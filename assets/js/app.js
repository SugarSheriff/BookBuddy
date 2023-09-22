document.addEventListener("DOMContentLoaded", function () {
    // Sample data (replace with actual data)
    const data = {
        title: "Welcome to BookBuddy",
        subtitle: "Your Book Discovery Platform",
        menuItems: [
            { text: "Home", link: "#" },
            { text: "Browse Books", link: "#" },
            { text: "My Books", link: "#" }
        ],
        featuredBooks: [
            {
                title: "Book 1",
                author: "Author 1",
                description: "Description of Book 1"
            },
            {
                title: "Book 2",
                author: "Author 2",
                description: "Description of Book 2"
            }
        ],
        footerText: "&copy; 2023 BookBuddy. All rights reserved."
    };

    // Load the Handlebars template from the separate file
    fetch('template.handlebars')
        .then(response => response.text())
        .then(templateSource => {
            // Compile the Handlebars template
            const template = Handlebars.compile(templateSource);

            // Render the template with data
            const renderedHtml = template(data);

            // Append the rendered HTML to the document's body
            document.body.innerHTML = renderedHtml;
        });
});
