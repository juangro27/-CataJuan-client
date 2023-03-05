Client routes

| Endpoint                                          | Description                                    | Protected |
|---------------------------------------------------|------------------------------------------------|-----------|
| /                                                 | Index page                                     |           |
| /login                                            | Login page                                     |           |
| /signup                                           | Signup page                                    |           |
| /logout                                           | Logout page                                    |     ✅    |
| /aboutus                                          | Aboutus page                                   |           |
| /contact                                          | Contact page                                   |           |
| /myprofile                                        | My profile page                                |     ✅    |
| /myprofile/edit                                   | Edit profile page                              |     ✅    |
| /users/:id/edit                                   | Edit specific user page                        |     ✅    |
| /users/:id/my-posts                               | List of posts for a specific user page         |     ✅    |
| /users/:id/favorites-posts                        | User favorite posts page                       |     ✅    |
| /countries                                        | List of countries page                         |            |
| /countries/:id                                    | Specific country page                          |            |
| /countries/:id/edit                               | Edit specific country page                     |     ✅    |
| /countries/posts/:id/comments/:comment/edit       | Edit comment for a specific country page       |     ✅    |
| /countries/posts                                  | List of posts for a specific country page      |            |
| /countries/posts/create                           | Create a new post for a specific country page  |     ✅    |
| /countries/posts/:id                              | Sepecific post for a specific country page     |     ✅    |
| /countries/posts/:id/edit                         | Edit post for a specific country page          |     ✅    |
| /countries/posts/:id/comments/:comment/edit       | Edit comment for a specific post page          |     ✅    |
