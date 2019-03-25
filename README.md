# Funeral Zone Javascript Code Test

You need to refactor this class, it is a simple class that makes a call to a http API to retrieve a list of books and return them. Think about extensibility - how could you easily add other book seller APIs in the the future, handle different API formats, different query types (by publisher, by year published etc - things like that).

Refactor this to what you consider to be production ready code.

## Getting started

Simply fork this repository and commit and push your changes to yor fork.

---

# Refactor notes

- Switched from vanilla JavaScript to TypeScript.
- Replaced the old function constructor syntax with a TypeScript class, which is basically an ES6 class with slightly more features.
- Switched from XMLHttpRequest to Fetch API. It's not necessarily better but provides a cleaner syntax.
- My main goal was to keep things short, clean and concise as well as to use modern solutions.

# Refactored class features

- You can instantiate the class by providing an API URL and a config object that contains the necessary query parameters in a 'key:value' format.
- The 'getBooks' method makes an API call with the given URL and the stored config object. You may also give it a new config object in which case it'll be used instead of the stored one.
- There's no need to declare a response format anymore, it will be figured out automatically from the response headers (support for JSON and Text/XML).
- Since the stored API URL and config object are public properties, they can be changed at will.
