//  npm i -g json-server
// json-server --watch db.json


let likes = 0
const quoteUl = document.querySelector("#quote-list")
const form = document.getElementById('new-quote-form')
form.addEventListener('submit', (e) => submitButtonClicked(e))
//console.log(submitButton)


    function fetchQuotes() {
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(quotes => quotes.filter(quote => renderQuotes(quote)))
        .catch(error => {
            console.log(error)
            })
    }

fetchQuotes()

    function renderQuotes(quoteInfo) {
        
        const quote = quoteInfo.quote
        const author = quoteInfo.author
        //console.log(author)
        const likes = quoteInfo.likes.map(likesInfo => {   
            return likesInfo.quoteId
            //return quoteInfo
        })
        

        const quoteBlock = document.createElement('li')
        const authorBlock = document.createElement('p')
        const likesBlock = document.createElement('p')
        const deleteButton = document.createElement('button')
        const div = document.createElement('div')
        const likeButton = document.createElement('button')
        
        div.id = quoteInfo.id
        quoteUl.appendChild(div)
        div.appendChild(quoteBlock)
        quoteBlock.innerText = quote
        quoteBlock.appendChild(authorBlock)
        authorBlock.innerText = author
        likesBlock.id = quoteInfo.id
        //console.log(authorBlock.innerText)
        quoteBlock.appendChild(likesBlock)
        if (likes.length === 0) {
            likesBlock.innerHTML = `likes: <span id="likes-count${quoteInfo.id}">0</span>`
        } else {
            likesBlock.innerHTML = `likes: <span id="likes-count${quoteInfo.id}">${likes}</span>`
        }
        
        quoteBlock.appendChild(likeButton)
        likeButton.innerText = 'like'
        quoteBlock.appendChild(deleteButton)
        deleteButton.innerText = 'delete'

        //button clicked delete post
        deleteButton.addEventListener('click', () => deleteQuote(quoteInfo))
        likeButton.addEventListener('click', () => quoteLiked(quoteInfo))

    }

    //if like button clicked increase likes

    //submission form adds a new quote
    function submitButtonClicked(e) {
        e.preventDefault()
        quoteUl.innerHTML = ''
        const quoteInput = document.getElementById('test')
        const authorInput = document.getElementById('author')
        const newQuote = quoteInput.value
        const newAuthor = authorInput.value


        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
    
                "quote": newQuote,
                "author": newAuthor
            })
        }
        fetch('http://localhost:3000/quotes?_embed=likes', configurationObject)
        .then(response => response.json())
        .then(quote => fetchQuotes(quote))
        .catch(error => {
            console.log(error)
            })
    }

    function deleteQuote(quoteInfo) {

        //const div = document.getElementById(quoteInfo.id)
        //div.remove()
        quoteUl.innerHTML = ''
        const id = quoteInfo.id
        const quote = quoteInfo.quote
        const author = quoteInfo.author

        const configurationObject = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "quote": quote,
                "author": author
            })
        }
        fetch(`http://localhost:3000/quotes/${id}`, configurationObject)
        .then(response => response.json())
        .then(quote => fetchQuotes(quote))
        .catch(error => {
            console.log(error)
            })
    }

    function quoteLiked(quoteInfo) {
        //quoteUl.innerHTML = ''
        
        const numberId = document.getElementById(`likes-count${quoteInfo.id}`)
        const number = parseInt(numberId.innerText, 10) + 1;
        console.log(numberId)
        numberId.innerText = number


        // const configurationObject = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
    
        //         "quoteId": number
            
        //     })
        // }
        // fetch(`http://localhost:3000/likes/`, configurationObject)
        // .then(response => response.json())
        // .then(quote => fetchQuotes(quote))
        // .catch(error => {
        //     console.log(error)
        //     })
    }


