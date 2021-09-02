// To hide Error message before any ocurrence of errors
document.getElementById('error-message').style.display = 'none';

// To hide total results found before clicking the search button
document.getElementById('result-heading').style.display='none';

//fetching the url of the text written in the search box with help of an arrow function
const searchForBook = () => {
    const searchId = document.getElementById('search-field');
    const searchText = searchId.value;
    searchId.value = '';
    document.getElementById('error-message').style.display = 'none';
    if(searchText === ''){
        showErrorMessage('Please, write the name of the book you are looking for.');
    }
    else{
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(bookData => displayBookResult(bookData,bookData.docs))
        .catch(err => showErrorMessage(err))
    }
   
    
}

//Displaying error if there is any with help of an arrow function
const showErrorMessage = err => {

    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').innerText = err;
}
 
//Showing the results found from the fetched url with help of an arrow function
const displayBookResult = (bookData,docs) => {
   const searchResult = document.getElementById('search-result');
   //removing previous results
   searchResult.textContent='';

   //checking if the search field is empty or not
   if(docs.length === 0){
    
     showErrorMessage('No results found');
     document.getElementById('result-heading').style.display='none';
        
   }
   else{
    //displaying the total search results
    document.getElementById('result-heading').style.display='block';
    document.getElementById('result-found').innerText = bookData.numFound ;
    
    docs.forEach(doc => {
        const cover_i = doc.cover_i; 
        let author_name ='';
        let image ='';
        let publisher = '';
        let published_date = '';
        //checking if there is author name or not
        if(doc.author_name){
            author_name = doc.author_name;
        }
        else{
            author_name = 'NIL';
        }
         if(doc.publisher){
            publisher = doc.publisher;
        }
        else{
            publisher = 'NIL';
        }

        if(doc.first_publish_year){
            published_date = doc.first_publish_yearr;
        }
        else{
            ublished_date = 'NIL';
        }

        //checking if there is image available or not
        if(cover_i){
            image = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        }
        else{
            //adding a default image
            image = "image/no_image.jpg";
        }
        
        //adding grid cards
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 w-75">
                <div ><img id="search-img" src="${image}" class="card-img-top" alt="..."></div>
                <div class="card-body">
                    <h5 class="card-title">${doc.text[1]}</h5>
                    <h6><span class = "fw-bold">Author:</span> ${author_name}</h6>
                    <h6><span class = "fw-bold">Publisher:</span> ${publisher}</h6>
                    <small><span class = "fw-bold">First Published Date:</span> ${published_date}</small>
                    </div>
                </div>
            `;
        searchResult.appendChild(div);
             
    })
  } 
}

