function createRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    return xhr;
}

const app = document.getElementById('posts')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)
  
var url = 'https://abbestiadc.pythonanywhere.com/api/posts/';

var request = createRequest('GET', url);

request.onload = function() {
  
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(post => {
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
    console.error('Error', request);
};

request.send()