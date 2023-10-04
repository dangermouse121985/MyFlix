let apiEndpoints = [
    {
        title:"Return All Movies",
        description:"Return a list of all movies to the user",
        anchorTag:"get-all-movies",
        url:"/movies",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about all the movies <br />
        [{<br />
        <div class="api-body">
          <span class="object-key">id:</span> 1234,<br />
        </div>
        <div class="api-body">
          <span class="object-key">title:</span> "Batman Begins",<br />
        </div>
        <div class="api-body">
          <span class="object-key">url:</span>
          "/movies/Batman%20Begins",<br />
        </div>
        }, {<br />
        <div class="api-body">
          <span class="object-key">id:</span> 1235,<br />
        </div>
        <div class="api-body">
          <span class="object-key">title:</span> "The Dark Knight",<br />
        </div>
          <div class="api-body">
          <span class="object-key">url:</span>
          "/moview/Batman%20Begins",<br />
        </div>
        }]`
    },
    {
        title:"Return One Movie by Title",
        description:"Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the userv",
        anchorTag:"get-one-movie",
        url:"/movies/{movie-title}",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about a single movies <br />
        {<br />
        <div class="api-body">
          <span class="object-key">id:</span> 1234,<br />
        </div>
        <div class="api-body">
          <span class="object-key">title:</span> "Batman Begins",<br />
          </div>
          <div class="api-body">
          <span class="object-key">url:</span> "/movies/Batman%20Begins",<br />
          </div>
          <div class="api-body">
          <span class="object-key">description</span> "After witnessing his parents' death, 
                                                      Bruce learns the art of fighting to 
                                                      confront injustice. When he returns to 
                                                      Gotham as Batman, he must stop a secret 
                                                      society that intends to destroy the city.", <br>
          </div>
          <div class="api-body">
          <span class="object-key">director:</span>
          </div> 
          <div class="nested-object">{
            <div class="api-body">
            <span class="object-key">name:</span> "Christopher Nolan",<br />
            </div>
            <div class="api-body">
            <span class="object-key">bio:</span> "Christopher Edward Nolan CBE is a British and 
                                                  American filmmaker. Known for his Hollywood 
                                                  blockbusters with complex storytelling, Nolan 
                                                  is considered a leading filmmaker of the 21st 
                                                  century. His films have grossed $5 billion 
                                                  worldwide.", <br>
            </div>
            <div class="api-body">
            <span class="object-key">birth:</span> "1970-07-30T00:00:00.000Z", <br>
            </div>
            <div class="api-body">
            <span class="object-key">death</span> "1970-07-30T00:00:00.000Z" <br>
            </div>
          }, <br>
          <span class="object-key">actors:</span>
          </div> 
          <div class="nested-object">{
            <div class="two-nested-object">{ <br>
            <div class="api-body">
            <span class="object-key">name:</span> "Christian Bale",<br />
            </div>
            <div class="api-body">
            <span class="object-key">bio:</span> "Christian Charles Philip Bale is an English actor. 
                                                  Known for his versatility and physical transformations 
                                                  for his roles, he has been a leading man in films of 
                                                  several genres. He has received various accolades, 
                                                  including an Academy Award and two Golden Globe Awards." <br>
            </div>
            <div class="api-body">
            <span class="object-key">birth:</span> "1970-07-30T00:00:00.000Z", <br>
            </div>
            <div class="api-body">
            <span class="object-key">death:</span> "1970-07-30T00:00:00.000Z" <br>
            </div>
          </div>
            <div class="nested-object">}, <br></div>
            <div class="nested-object">{ <br>
              <div class="nested-object">... <br>
          </div>} <br></div>
          </div>
          <div class="nested-object">}, <br></div>
          <div class="api-body">
            <span class="object-key">genre:</span>
          </div> 
          <div class="nested-object">{ <br>
            <div class="api-body">
            <span class="object-key">name:</span> "Action",<br />
            </div>
            <div class="api-body">
            <span class="object-key">description:</span> "Movies in the action genre are fast-paced 
                                                  and include a lot of action like fight scenes, 
                                                  chase scenes, and slow-motion shots. They can 
                                                  feature superheroes, martial arts, or exciting 
                                                  stunts. These high-octane films are more about 
                                                  the execution of the plot rather than the plot 
                                                  itself. Action movies are thrilling to watch and 
                                                  leave audience members on the edge of their seats." <br>
            </div>
          }, </div>
          <div class="api-body">
          <span class="object-key">imagePath:</span>
          "https://image.com/image.png",<br /> 
          </div>
          <div class="api-body">
          <span class="object-key">featured:</span> true <br />
          </div>
        }`
    },
    {
        title:"Return All Genres",
        description:"Return a list of all genres including their description",
        anchorTag: "get-all-genres",
        url:"/genres",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about all genres <br />
        {<br />
        <div class="api-body">
          <span class="object-key">title:</span> "Action",<br />
          </div>
          <div class="api-body">
          <span class="object-key">description:</span> "Action film is a
          film genre in which the protagonist is thrust into a series of
          events that typically involve violence and physical feats." <br />
        </div>
        },<br />
        {<br />
        <div class="api-body">
          <span class="object-key">...</span>
        </div>
        }`
    },
    {
        title:"Return One Genre by Name",
        description:"Return data about a genre (description) by name/title (e.g., “Thriller”)",
        anchorTag: "get-a-genre",
        url:"/genres/{genre-title}",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about a single genre <br />
        {<br />
        <div class="api-body">
          <span class="object-key">title:</span> "Action",<br />
        </div>
        <div class="api-body">
          <span class="object-key">description:</span> "Action film is a
          film genre in which the protagonist is thrust into a series of
          events that typically involve violence and physical feats." <br />
        </div>
        }`
    },
    {
        title:"Return All Directors",
        description:"Return a list of all directors including their data (bio, birth year, death year)",
        anchorTag: "get-all-directors",
        url:"/directors",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about all directors <br />
        {<br />
        <div class="api-body">
          <span class="object-key">name:</span> "Christopher Nolan",<br />
          </div>
          <div class="api-body">
          <span class="object-key">bio:</span> "Christopher Edward Nolan CBE
          is a British and American filmmaker. Known for his Hollywood
          blockbusters with complex storytelling, Nolan is considered a
          leading filmmaker of the 21st century. His films have grossed $5
          billion worldwide.",<br />
          </div>
          <div class="api-body">
          <span class="object-key">birthYear:</span> 1970,<br />
          </div>
          <div class="api-body">
          <span class="object-key">deathYear:</span> null <br />
        </div>
        },
        {<br />
        <div class="api-body">
          <span class="object-key">...</span>
        </div>
        }`
    },
    {
        title:"Return One Director by Name",
        description:"Return data about a director (bio, birth year, death year) by name",
        anchorTag: "get-a-director",
        url:"/directors/{director-name}",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about a single director <br />
        {<br />
        <div class="api-body">
          <span class="object-key">name:</span> "Christopher Nolan",<br />
        </div><div class="api-body">
          <span class="object-key">bio:</span> "Christopher Edward Nolan CBE
          is a British and American filmmaker. Known for his Hollywood
          blockbusters with complex storytelling, Nolan is considered a
          leading filmmaker of the 21st century. His films have grossed $5
          billion worldwide.",<br />
          </div>
          <div class="api-body">
          <span class="object-key">birthYear:</span> 1970,<br />
          </div>
          <div class="api-body">
          <span class="object-key">deathYear:</span> null <br />
        </div>
        }`
    },
    {
        title:"Return All Actors",
        description:"Return a list of all actors including their data (bio, birth year, death year) by name",
        anchorTag: "get-all-actors",
        url:"/actors/{actor-name}",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about a single director <br />
        {<br />
        <div class="api-body">
          <span class="object-key">name:</span> "Christian Bale",<br />
        </div>
        <div class="api-body">
          <span class="object-key">bio:</span> "Christian Charles Philip Bale is an English actor.
          Known for his versatility and physical transformations for his roles, he has been a 
          leading man in films of several genres. He has received various accolades, including an 
          Academy Award and two Golden Globe Awards.",<br />
        </div>
          <div class="api-body">
          <span class="object-key">birthYear:</span> 1974,<br />
          </div>
          <div class="api-body">
          <span class="object-key">deathYear:</span> null <br />
        </div>
        },<br />
        {<br />
        <div class="api-body">
          <span class="object-key">...</span>
        </div>
        }`
    },
    {
        title:"Return One Actor by Name",
        description:"Return data about an actor (bio, birth year, death year) by name",
        anchorTag: "get-an-actor",
        url:"/actors/{actor-name}",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A JSON object holding data about a single director <br />
        {<br />
        <div class="api-body">
          <span class="object-key">_id:</span> "6514a9b77707cd8d539df844",<br />
          </div>
          <div class="api-body">
          <span class="object-key">name:</span> "Christian Bale",<br />
          </div>
          <div class="api-body">
          <span class="object-key">bio:</span> "Christian Charles Philip Bale is an English actor.
          Known for his versatility and physical transformations for his roles, he has been a 
          leading man in films of several genres. He has received various accolades, including an 
          Academy Award and two Golden Globe Awards.",<br />
          </div>
          <div class="api-body">
          <span class="object-key">birthYear:</span> 1974,<br />
          </div>
          <div class="api-body">
          <span class="object-key">deathYear:</span> null <br />
        </div>
        }`
    },
    {
        title:"Return All Users",
        description:"Return a list of all users including their data (username, password, first name, last name, email, birthdate)",
        anchorTag: "get-all-users",
        url:"/users",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A Json object holding data about the user that was added, including
        an id:
        <br />
        {<br />
        <div class="api-body">
          <span class="object-key">id:</span> 1234,<br />
        </div>
        <div class="api-body">
          <span class="object-key">username:</span> "jdoe123",<br />
        </div>
        <div class="api-body">
          <span class="object-key">password:</span> "password" <br />
        </div>
        <div class="api-body">
          <span class="object-key">first name:</span> "John ",<br />
        </div>
        <div class="api-body">
          <span class="object-key">last name:</span> "Doe",<br />
        </div>
        <div class="api-body">
          <span class="object-key">email:</span> "johndoe@gmail.com",<br />
        </div>
        <div class="api-body">
          <span class="object-key">birth:</span> "1991-01-23" <br />
        </div>
        }<br />
        {<br />
        <div class="api-body">
          <span class="object-key">...</span>
        </div>
        }`
    },
    {
        title:"Return One User by Username",
        description:"Return one user including data (username, password, first name, last name, email, birthdate), by name",
        anchorTag: "get-a-user",
        url:"/users/{username}",
        httpMethod:"GET",
        requestBody:"None",
        responseBody:`A Json object holding data about the user that was added, including
        an id:
        <br />
        {<br />
        <div class="api-body">
          <span class="object-key">id:</span> 1234,<br />
        </div>
        <div class="api-body">
          <span class="object-key">username:</span> "jdoe123",<br />
        </div>
        <div class="api-body">
          <span class="object-key">password:</span> "password" <br />
        </div>
        <div class="api-body">
          <span class="object-key">first name:</span> "John ",<br />
        </div>
        <div class="api-body">
          <span class="object-key">last name:</span> "Doe",<br />
        </div>
        <div class="api-body">
          <span class="object-key">email:</span> "johndoe@gmail.com",<br />
        </div>
        <div class="api-body">
          <span class="object-key">birth:</span> "1991-01-23" <br />
        </div>
        }`
    },
    {
        title:"Create a New User",
        description:"Allow New Users to register",
        anchorTag: "create-a-new-user",
        url:"/users",
        httpMethod:"POST",
        requestBody:`A Json object holding data about the user to add, structure like:
        <br />
        {<br />
          <div class="api-body">
            <span class="object-key">id:</span> 1234,<br />
          </div>
          <div class="api-body">
            <span class="object-key">username:</span> "jdoe123",<br />
          </div>
          <div class="api-body">
            <span class="object-key">password:</span> "password" <br />
          </div>
          <div class="api-body">
            <span class="object-key">first name:</span> "John ",<br />
          </div>
          <div class="api-body">
            <span class="object-key">last name:</span> "Doe",<br />
          </div>
          <div class="api-body">
            <span class="object-key">email:</span> "johndoe@gmail.com",<br />
          </div>
          <div class="api-body">
            <span class="object-key">birth:</span> "1991-01-23" <br />
          </div>
        }`,
        responseBody:`A Json object holding data about the user that was added, including
        an id:
        <br />
        {<br />
          <div class="api-body">
            <span class="object-key">id:</span> 1234,<br />
          </div>
          <div class="api-body">
            <span class="object-key">username:</span> "jdoe123",<br />
          </div>
          <div class="api-body">
            <span class="object-key">password:</span> "password" <br />
          </div>
          <div class="api-body">
            <span class="object-key">first name:</span> "John ",<br />
          </div>
          <div class="api-body">
            <span class="object-key">last name:</span> "Doe",<br />
          </div>
          <div class="api-body">
            <span class="object-key">email:</span> "johndoe@gmail.com",<br />
          </div>
          <div class="api-body">
            <span class="object-key">birth:</span> "1991-01-23" <br />
          </div>
        }`
    },
    {
        title:"Update User Info",
        description:"Allow users to update their user info (username).",
        anchorTag: "update-user-info",
        url:"/users/{username}",
        httpMethod:"PUT",
        requestBody:`A JSON object containing the user's new Username to add. <br />
        {<br />
        <div class="api-body">
          <span class="object-key">username:</span> "JohnDoe123"<br />
        </div>
        }`,
        responseBody:`A JSON Object containing the user's new Username that was added. <br>
        {<br />
        <div class="api-body">
          <span class="object-key">username:</span> "JohnDoe123"<br />
        </div>
        }`
    },
    {
        title:"Add Movie to User's Favorites",
        description:"Allow users to add a movie to their list of favorites (showing only a text that a movie has been added).",
        anchorTag: "add-movie-to-favorites",
        url:"/users/{username}/favorites/{movie-id}",
        httpMethod:"PUT",
        requestBody:`A JSON Object containing the movie to be added to the user's
        favorite list. <br />
        {<br />
        <div class="api-body">
          <span class="object-key">id:</span> 1234, <br />
        </div>
        <div class="api-body">
          <span class="object-key">title:</span> "Batman Begins",<br />
        </div>
          <div class="api-body">
          <span class="object-key">url:</span>
          "movies/batman%20begins"<br />
        </div>
        }`,
        responseBody:`A JSON Object containing the movie that was added to the user's
        favorite list. <br />
        {<br />
          <div class="api-body">
            <span class="object-key">id:</span> 1234, <br />
          </div>
          <div class="api-body">
            <span class="object-key">title:</span> "Batman Begins",<br />
          </div>
            <div class="api-body">
            <span class="object-key">url:</span>
            "movies/batman%20begins"<br />
          </div>
        }`
    },
    {
        title:"Remove a Movie from User's Favorites",
        description:"Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed).",
        anchorTag: "remove-movie-from-favorites",
        url:"/users/{username}/favorites/{movie-id}",
        httpMethod:"DELETE",
        requestBody:"None",
        responseBody:`A Json object holding data about the user and their updated favorites list (movie ids):
        <br />
        {<br />
          <div class="api-body">
            <span class="object-key">id:</span> 1234,<br />
          </div>
          <div class="api-body">
            <span class="object-key">username:</span> "jdoe123",<br />
          </div>
          <div class="api-body">
            <span class="object-key">password:</span> "password" <br />
          </div>
          <div class="api-body">
            <span class="object-key">first name:</span> "John ",<br />
          </div>
          <div class="api-body">
            <span class="object-key">last name:</span> "Doe",<br />
          </div>
          <div class="api-body">
            <span class="object-key">email:</span> "johndoe@gmail.com",<br />
          </div>
          <div class="api-body">
            <span class="object-key">birth:</span> "1991-01-23" <br />
          </div>
          <div class="api-body">
            <span class="object-key">favorites:</span>
          </div> 
          <div class="nested-object">[ <br>
            <div class="api-body">
              "1234", "5678"<br>
            </div>
          ] </div>
        }`
    },
    {
        title:"Delete User",
        description:"Allow existing users to deregister (showing only a text that a user email has been removed).",
        anchorTag: "delete-user",
        url:"/users/{username}",
        httpMethod:"DELETE",
        requestBody:"None",
        responseBody:`Text message indicating user was deregistered.`
    },
]


let endpointSection = document.getElementById('endpoints');

apiEndpoints.forEach(endpoint => {
    let header = document.createElement('h2');
    header.id = endpoint.anchorTag;
    header.textContent = endpoint.title + ' ';
    let headerEndpoint = document.createElement('span');
    headerEndpoint.classList.add(endpoint.httpMethod.toLowerCase());
    headerEndpoint.textContent = endpoint.httpMethod;

    let endpointTable = document.createElement('table');
    endpointTable.classList.add('endpoint-table');
    let tableHead = document.createElement('thead');
    let tableHeaderRow = document.createElement('tr');
    let descriptionHead = document.createElement('th');
    descriptionHead.textContent = 'Description';
    let urlHead = document.createElement('th');
    urlHead.textContent = 'URL';
    let reqBodyHead = document.createElement('th');
    reqBodyHead.textContent = 'Request Body Data Format';
    let resBodyHead = document.createElement('th');
    resBodyHead.textContent = 'Response Body Data Format';

    let tableRow = document.createElement('tr');
    let tdDesc = document.createElement('td');
    tdDesc.textContent = endpoint.description;
    let tdUrl = document.createElement('td');
    tdUrl.textContent = endpoint.url;
    let tdReq = document.createElement('td');
    tdReq.innerHTML = endpoint.requestBody;
    let tdRes = document.createElement('td');
    tdRes.innerHTML = endpoint.responseBody;


    tableHeaderRow.appendChild(descriptionHead)
    tableHeaderRow.appendChild(urlHead);
    tableHeaderRow.appendChild(reqBodyHead);
    tableHeaderRow.appendChild(resBodyHead);
    tableHead.appendChild(tableHeaderRow);
    endpointTable.appendChild(tableHead);

    tableRow.appendChild(tdDesc);
    tableRow.appendChild(tdUrl);
    tableRow.appendChild(tdReq);
    tableRow.appendChild(tdRes);
    endpointTable.appendChild(tableRow);

    header.appendChild(headerEndpoint);
    endpointSection.appendChild(header);
    endpointSection.appendChild(endpointTable);
})

let currentHeadingCounter = 1;
let previousHeadingCounter = 0;
let endpointDiv = document.querySelector('#endpoints');
let h2Headings = endpointDiv.getElementsByTagName('h2');
let totalHeadings = h2Headings.length;

let previousButton = document.querySelector('.previous-button');
previousButton.classList.add('button--hide');

let bttButton = document.querySelector('.btt-button');
bttButton.addEventListener('click', () => {
    window.scrollTo(0,0);
    currentHeadingCounter = 1;
    previousHeadingCounter = 0;
    nextButton.innerHTML = document.querySelector(`#endpoints > h2:nth-of-type(${currentHeadingCounter})`).textContent;
    nextButton.classList.remove('button--hide');
    previousButton.classList.add('button--hide');
});


let nextButton = document.querySelector('.next-button');
nextButton.innerHTML = document.querySelector(`#endpoints > h2:nth-of-type(${currentHeadingCounter})`).textContent;
nextButton.addEventListener('click', () => {
    let nextHeading = document.querySelector(`#endpoints > h2:nth-of-type(${currentHeadingCounter})`);
    nextHeading.scrollIntoView({behavior: 'smooth'});
    currentHeadingCounter = currentHeadingCounter + 1;
    previousHeadingCounter = previousHeadingCounter + 1;
    
    nextButton.innerHTML = document.querySelector(`#endpoints > h2:nth-of-type(${currentHeadingCounter})`).textContent;
    
    let newPreviousButtonHeading = document.querySelector(`#endpoints > h2:nth-of-type(${previousHeadingCounter - 1})`)
    previousButton.innerHTML = previousHeadingCounter -1 > 0 ? newPreviousButtonHeading.textContent: '';
    
    if (currentHeadingCounter > 2) {
        previousButton.classList.remove('button--hide');
    } else if (currentHeadingCounter === 1) {
        previousButton.classList.add('button--hide');
    }

    if (currentHeadingCounter >= totalHeadings) {
        nextButton.classList.add('button--hide')
    }
});

previousButton.addEventListener('click', () => {
    let previousHeading = document.querySelector(`#endpoints > h2:nth-of-type(${previousHeadingCounter -1})`);
    previousHeading.scrollIntoView({behavior: 'smooth'});
    previousHeadingCounter--;
    currentHeadingCounter--;

    nextButton.innerHTML = document.querySelector(`#endpoints > h2:nth-of-type(${currentHeadingCounter})`).textContent;
    previousButton.innerHTML = document.querySelector(`#endpoints > h2:nth-of-type(${previousHeadingCounter})`).textContent;

    if (currentHeadingCounter <= 2) {
        previousButton.classList.add('button--hide');
    }

    if (currentHeadingCounter < totalHeadings) {
        nextButton.classList.remove('button--hide')
    }
});