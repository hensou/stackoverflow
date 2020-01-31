# Stackunderflow

This project is an assignment for the application to SAIL's lab, in Queen's University.

The project features are following:

    Extracts from stackoverflow.com the 10 newest Android-related questions, and the 10 most voted Android-related questions that are created in the past week.
    A simple website that displays the titles of the extracted questions.
    A convenient way of displaying the full question body with a click on the row and the full thread with a click on the link.
    A convenient way to filter for diferrent tags and dates when needed

The extracting process is initiated when the application initializes. It is also possible do make new extractions by clicking on the "Fecth" button. This is especially convinient when trying out with different tags and dates. Tags can be added by typing at the tags input, separated by a comma(,) or by the tying of the Enter key. Date inputs offers a date picker to better select an especific date.
Extracted data is presented in two tabs:

- **Most Voted**: that shows most voted questions that contains the specified tags.
- **Most Recet**: that shows most recent questions that contains the specified tags and between the specified dates.


## Running development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
