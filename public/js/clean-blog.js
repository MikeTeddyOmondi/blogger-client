'use strict';
console.log('Client-Side | JavaScript running!...');

const form = document.getElementById('contactForm'); 
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:5000' : 'https://dynasty-api.herokuapp.com';

// BrowserFs Module - For accessing LocalStorage file system
BrowserFS.install(window);
// Configures BrowserFS to use the LocalStorage file system.
BrowserFS.configure({
  fs: "LocalStorage"
}, function(e) {
  if (e) {
    // An error happened!
    throw e;
  }
  // Otherwise, BrowserFS is ready-to-use!
});

const fs = require('fs')

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
  
      const newContact = {
        name,
        email,
        phone,
        message
      };
      
      console.log(newContact)
    
      fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {      
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType.includes('json')) {
            return response.json().then(error => Promise.reject(error.message));
          } else {
            return response.text().then(message => Promise.reject(message));
          }
        }
      }).then(() => {
        form.reset();
      }).catch(error => {
        console.log(error.message)
      });
  });  
}

const saveBlogs = async () => {
  await fetch(`${API_URL}/api/blogs`, {
    method: "GET",
    headers: { "Content-type": "application/json" }
    })
    .then((response) => {
      response.json()
        .then((blogs) => {
          console.log(blogs)
          let data = JSON.stringify(blogs)
          function saveBlogsOffline(content, filename) {
            fs.writeFile(`/${filename}`, content, (err) => {
              if (err) {
                console.log(err);
              }
              console.log("Blogs have been saved for offline ...")
            });
          }

          saveBlogsOffline(data, 'blogs.json')
        })
    })
};

saveBlogs()

const { createApp } = Vue;

const app =
{
  setup()
  {
    let articles = {}
    const getBlogs = function ()
    {
      fs.readFile(`blogs.json`, (err, data) =>
      {
        if (err) {
          console.log(err);
        }
        articles = JSON.parse(data)
        console.log("Blogs retrieved ...")
        return articles
      })
    }
    
    getBlogs()

    return {
      blogs: articles
    }
  }
}

createApp(app).mount('#app')