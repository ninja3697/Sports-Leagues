# Sports Leagues

A single-page application (SPA) that consumes the [All Leagues API](https://www.thesportsdb.com/api/v1/json/3/all_leagues.php) and displays the sports leagues with filtering options by name and sport. On clicking a league card, the latest badge of the selected league is shown using the info from the [Search Seaspm API](https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>).

![](demo/demo.gif)

Tools and technologies used to build this project are:

- Typescipt as programming language
- React for building UI components and logic handling
- Axios for data fetching
- Tailwind CSS for styling
- ChatGPT AI for static design generation, and
- Vite for build setup and bundling

To run this project in production mode, first build the project using the following command:

```
npm run build
```

Then, deploy the application using the fololwing command:

```
npm run preview
```
