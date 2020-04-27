describe('Blog app', function () {
  const user = {
    name: 'Testy Tester',
    username: 'testyt',
    password: '1234567890'
  };


  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    window.localStorage.setItem('user', '');
  });

  it('Login from is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('form').within(() => {
        cy.get('input[name="Username"]').type(user.username);
        cy.get('input[name="Password"]').type(user.password);
        cy.get('button[type=submit]').click();
      });
      cy.contains(`${user.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('form').within(() => {
        cy.get('input[name="Username"]').type(user.username);
        cy.get('input[name="Password"]').type(user.password + 'WRONG');
        cy.get('button[type=submit]').click();
      });
      cy.get('#notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', '`${user.name} logged in`');
    });
  });

  describe('When logged in', function () {
    const blog = {
      title: 'bloggy test title',
      author: 'bloggy blogger',
      url: 'http://to.some.where/not/here/though'
    };

    beforeEach(function () {
      cy.login(user);
    });

    it('A blog can be created', function () {
      cy.contains('new note').click();
      cy.get('form').within(() => {
        cy.get('input[name="Title"]').type(blog.title);
        cy.get('input[name="Author"]').type(blog.author);
        cy.get('input[name="Url"]').type(blog.url);
        cy.get('button[type=submit]').click();
      });
      cy.get('#notification')
        .should('contain', `a new blog ${blog.title} by ${blog.author} added`)
        .and('have.css', 'color', 'rgb(0, 100, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('#bloglisting').get('article')
        .should('have.length', 1)
        .should('contain', `${blog.title} ${blog.author}`)
        .should('contain', 'view');
    });

    it('A blog can be liked', function () {
      cy.createBlog(blog);
      cy.get('#bloglisting').get('article').within(() => {
        cy.contains('view').click();
        cy.contains('like').click();
      });
      cy.get('#notification')
        .should('contain', `liked ${blog.title}`)
        .and('have.css', 'color', 'rgb(0, 100, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('#bloglisting').get('article').contains('likes 1');
    });

    it('A blog can be deleted by creator', function () {
      cy.createBlog(blog);
      cy.get('#bloglisting').get('article').within(() => {
        cy.contains('view').click();
        cy.contains('remove').click();
      });

      cy.get('#notification')
        .should('contain', `${blog.title} removed`)
        .and('have.css', 'color', 'rgb(0, 100, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('#bloglisting').get('article').should('have.length', 0);
    });


  });

  describe('when logged in as "wrong" user', function () {
    const blog = {
      title: 'bloggy test title',
      author: 'bloggy blogger',
      url: 'http://to.some.where/not/here/though'
    };

    const anotherUser = {
      name: 'Mr. wrong',
      username: 'mwrong',
      password: '0123456789'
    };

    beforeEach(function () {
      cy.login(user);
      cy.createBlog(blog);
      cy.request('POST', 'http://localhost:3001/api/users/', anotherUser);
      window.localStorage.setItem('user', '');
      cy.login(anotherUser);
    });

    it('A blog can only be deleted by its user', function () {
      cy.get('#bloglisting').get('article').within(() => {
        cy.contains('view').click();
        cy.should('not.contain', 'remove');
      });

    });
  });

  describe.only('when we have multiple blogs', function () {
    const blogs = [
      {
        title: 'test title with 7 likes',
        author: 'bloggy blogger',
        url: 'http://to.some.where/7',
        likes: 7
      },
      {
        title: 'test title with 1 likes',
        author: 'bloggy blogger',
        url: 'http://to.some.where/1',
        likes: 1
      },
      {
        title: 'test title with 20 likes',
        author: 'bloggy blogger',
        url: 'http://to.some.where/20',
        likes: 20
      },
      {
        title: 'test title with 0 likes',
        author: 'bloggy blogger',
        url: 'http://to.some.where/0',
        likes: 0
      },
    ];

    beforeEach(function () {
      cy.login(user);
      blogs.forEach((blog) => cy.createBlog(blog));
    });

    it('blogs should be sorted by likes', function () {
      cy.get('#bloglisting').get('article')
        .then((art) => {
          const arr = art.map(function () {
            return parseInt(this.querySelector('p').dataset.likes, 10);
          }).toArray();
          return arr;
        })
        .should('deep.equal', blogs.map(blog => blog.likes).sort((a, b) => b - a));
    });
  });

});
