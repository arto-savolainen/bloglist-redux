describe('Blog app', function () {
  const user = {
    username: 'testaaja',
    name: 'Testaaja',
    password: 'salasana'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    let blog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url'
    }

    function addBlog() {
      cy.contains('add blog').click()

      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-blog-button').click()

      cy.contains('view').click()
    }

    beforeEach(function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      addBlog()

      cy.contains(`A new blog ${blog.title} by ${blog.author} added`)
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains(`${blog.title} by ${blog.author}`)
      cy.get('#blog-url').contains(blog.url)
      cy.get('#blog-likes').contains('0')
      cy.get('#blog-user').contains(user.name)
    })

    it('A blog can be liked', function () {
      addBlog()

      cy.get('#blog-likes').contains('0')
      cy.get('#like-button').click()
      cy.get('#blog-likes').contains('1')
    })

    it('A blog can be deleted', function () {
      addBlog()

      cy.get('#delete-blog-button').click()
      cy.on('window:confirm', function () {
        return true
      })
      cy.contains('Blog deleted')
      cy.contains(`${blog.title} by ${blog.author}`).should('not.exist')
    })

    it('A blog cannot be deleted by another user', function () {
      addBlog()

      cy.contains('logout').click()

      const user2 = {
        username: 'forbiddenuser',
        name: 'Forbidden User',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)

      cy.get('#username').type(user2.username)
      cy.get('#password').type(user2.password)
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.get('#delete-blog-button').click()
      cy.on('window:confirm', function () {
        return true
      })
      cy.contains('Error: not authorized')
      cy.contains(`${blog.title} by ${blog.author}`)
    })

    it('Blogs are arranged in descending order of likes', function () {
      const blogs = [
        {
          title: 'blog 0',
          author: 'author 0',
          url: 'url 0'
        },
        {
          title: 'blog 1',
          author: 'author 1',
          url: 'url 1'
        },
        {
          title: 'blog 2',
          author: 'author 2',
          url: 'url 2'
        }
      ]

      blogs.forEach(function (x) {
        blog = x
        addBlog()
      })

      //Check that in the beginning, blogs are in the order they were added
      cy.get('.blog').eq(0).should('contain', blogs[0].title)
      cy.get('.blog').eq(1).should('contain', blogs[1].title)
      cy.get('.blog').eq(2).should('contain', blogs[2].title)

      //Assign alias to PUT requests so we can wait for likes to update after clicking the button
      cy.intercept({
        method: 'PUT'
      })
        .as('likePutRequest')

      //Increase likes of last blog by 6
      for (let i = 1; i <= 6; i++) {
        cy.get('.blog').eq(2).contains('like').click()
        cy.wait('@likePutRequest').its('response.statusCode').should('equal', 200)
      }

      //Refresh page to sort blogs according to likes
      cy.reload()

      //Now order should be: blog 2, blog 0, blog 1
      cy.get('.blog').eq(0).should('contain', blogs[2].title)
      cy.get('.blog').eq(1).should('contain', blogs[0].title)
      cy.get('.blog').eq(2).should('contain', blogs[1].title)

      //Increase likes of last blog (now 'blog 1') by 3
      cy.get('.blog').eq(2).contains('view').click()
      for (let i = 1; i <= 3; i++) {
        cy.get('.blog').eq(2).contains('like').click()
        cy.wait('@likePutRequest').its('response.statusCode').should('equal', 200)
      }

      cy.reload()

      //Now order should be: blog 2, blog 1, blog 0
      cy.get('.blog').eq(0).should('contain', blogs[2].title)
      cy.get('.blog').eq(1).should('contain', blogs[1].title)
      cy.get('.blog').eq(2).should('contain', blogs[0].title)
    })
  })
})