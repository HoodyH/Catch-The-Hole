//abbestiaDC, license: do what you want

//const api_url = 'https://abbestiadc.pythonanywhere.com/api/posts/'
const api_url = 'http://78.134.58.32:8000/api/posts/'
//const api_url = 'http://10.32.10.96:8000/api/posts/'

function createRequest(method, url) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    return xhr
}

async function setPost(){

  const title = document.getElementById('title').value
  const content = document.getElementById('content').value
  let data = `{"title": "${title}","content": "${content}"}`

  fetch(api_url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data
    }).then(res=>res.json())
      .then(res => console.log(res));
}

async function getFields(){

  const app = document.getElementById('posts')

  const container = document.createElement('div')
  container.setAttribute('class', 'container')

  app.appendChild(container)
  let request = createRequest('GET', api_url)

  request.onload = function() {

    // Begin accessing JSON data here
    let data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      data.reverse().forEach(post => {
        const card = document.createElement('div')
        card.setAttribute('class', 'wrapper fade-up')

        const h3 = document.createElement('h3')
        h3.textContent = post.title

        const blockquote = document.createElement('blockquote')
        blockquote.textContent = post.content

        container.appendChild(card)
        card.appendChild(h3)
        card.appendChild(blockquote)
      })
    }
  };

  request.onerror = function() {
      console.error('Error', request)
  };

  request.send()
}

getFields()
