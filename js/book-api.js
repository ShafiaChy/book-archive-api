const searchForBook = () => {
    const bookId = document.getElementById('search-field');
    const bookInput = bookId.value;
    bookId.value = '';
    fetch(`https://openlibrary.org/search.json?q=${bookInput}`)
    .then(res => res.json())
    .then(bookData => displayBookResult(bookData.docs))
    
}

const displayBookResult = docs => {
   const searchResult = document.getElementById('search-result');
   docs.forEach(doc => {
       console.log(doc);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${doc.text[1]}</h5>
                    <h6>Author: ${doc.author_name}</h6>
                    <h6>Publisher: ${doc.publisher}</h6>
                    <small>Published Date: ${doc.first_publish_year}</small>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
   })
   

   
}