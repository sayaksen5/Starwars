# To Make this functional,

Please hit 'npm install' and 'npm install react-icons --save'
 in the terminal before running the app as I have not uploaded the node_modules. 

Data Flow :

The code starts with index.js --> which returns the App.js-->  App.js is in return returning a header, a searchbar and a pagination component--> 

Pagination is taking data of the api call made and checking the count. After the count is available, the no.of pages to be shown is determined and a corresponding  dynamic API call is made for each of the pages.--> As said previously, after the dynamic API call, pagination returns the Characterlisting component which lists the character for the page. Clicking on each of this character Names leads to the CharacterDetails component. --> CharacterDetails component holds certain data and has a favourites button and View Favourites option. Clicking on favourites button adds the object to the favourites whereas unclicking it removes the same. For View Favorites, it lists all the elements that has been added to the list. Also it gives the option to remove the items.

The searchbar queries the search and returns a result from the current page.

Scope of Improvements: 
a) Better Styling
b)Better containerization
c)Adding of Routers
