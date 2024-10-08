# Blog CRM (Customer Relationship Management) API for managing user posts and visitors comments.

#### About this project
Project developed with the following technologies:
* Nodejs
* Express.js
* MySQL
* TypeORM
* Docker.

The idea of this project is to have control and manage posts and comments for an artist, so we have an admin who could be the artists' staff. They will be the ones approving posts made by the artists themselves
as well as approving or rejecting comments made in the posts made by the artists.
This way, the staff and management have full control over what is posted so they can avoid unwanted content in their blogs.


### Getting started
First, the application should be running successfully after running the commands docker-compose build and after its finished, docker-compose up.

![AppStarted](https://i.ibb.co/ZMsDjJq/Captura-de-tela-2024-09-20-105439.png)

Now we need to seed the database with an admin, member, posts and comments:
- Go to admin.seeder.example and edit the adminData object and save the file
```
const adminData = {
         username: 'example_admin',
         password: await bcrypt.hash('example_password', 10),
      };
```
- Next, go to member.seeder.example and edit the memberData object and save the file
```
const memberData = [
         // Can add more members here
         {
            fullName: '',
            zodiacSign: '',
            birthdate: '',
            height: 0,
            birthplace: '',
            bloodType: '',
            imageUrl: '',
         },
      ];
```
- Default number of posts and comments are 60 and 500 respectively, but you can adjust in the posts.seeder.example and comments.seeder.example files respectively.
- Lastly, run the following command in the project terminal:
```npm run seed:run```

Now we have an admin, member, posts and comments to control and manage!


### Using the API

Ps: You can test it in the API platform of your preference

To have comments, we need a blog post, which in turn requires a member to post a blog. We have seeded the database with some posts, so dont worry about it, but you could test it.
Send a post request with the credentials in the body to the login route ```http://localhost:4000/api/user/login```

![Login](https://i.ibb.co/jhPSj6G/Captura-de-tela-2024-09-20-093423.png)

You should receive a session and status 200 as the response.
Nest, send a post request to the create post route ```http://localhost:4000/api/post/create```

![Create-Post](https://i.ibb.co/5x4rQFB/Captura-de-tela-2024-09-20-094002.png)

You should receive the post in the response body and a status 200.

Now we have posts to manage!

#### Reminder:
you dont have to pass in tokens in the request headers, when you login, the access and refresh tokens are set as cookies and when sending requests to protected routes, they are gonna be retrieved automatically.

## Managing posts
Login as admin sending the credentials to the admin login route ```http://localhost:4000/api/admin/login```

![AdminLogin](https://i.ibb.co/35KJXKW/Captura-de-tela-2024-09-20-094833.png)

Now, you may send a get request to the route ```http://localhost:4000/api/post/pending``` You should receive a list of posts waiting for approval.

![PostsForApproval](https://i.ibb.co/vYtCF16/Captura-de-tela-2024-09-20-095217.png)

## Publishing posts
You must be logged in as admin for this step.
All you gotta do is send a put request to the route ```http://localhost:4000/api/post/approve/postid```. Reminder! Post must exist in the database! It's done! Now people on the internet can view the post and comment on it.

![PublishPost](https://i.ibb.co/GM3VyNF/Captura-de-tela-2024-09-20-100743.png)

Let's test it by retrieving the posts as if we were a normal user browing on the website.

![RetrieveApprovedPosts](https://i.ibb.co/Smtn2JK/Captura-de-tela-2024-09-20-101049.png)

## Receiving and approving comments
First send a post request to ```http://localhost:4000/api/comment/create/postid``` with a comment like the following:

![create-comment](https://i.ibb.co/cCY8GD3/Captura-de-tela-2024-09-20-105909.png)

Now we need to be logged in as admin for this step.

Send a get request to the route ```http://localhost:4000/api/comment/pending```. You should receive a list of comments waiting for approval.

![comments-for-approval](https://i.ibb.co/KV18rWY/Captura-de-tela-2024-09-20-110254.png)

You like it? Approve it with a put request to the route ```http://localhost:4000/api/comment/aprove/comment-id-goes-here```.



Only approved posts will show when we load details of a blog post. Now when we retrieve a specific blog post for example of id 2:

![blog-post-2](https://i.ibb.co/BKczcL6/Captura-de-tela-2024-09-20-133126.png)

## Listing members
You may also get information about all the artists in the route ```http://localhost:4000/api/member``` or full information for a single artist at ```http://localhost:4000/api/member/member-id-goes-here```

## Versioning
1.0.0.0

## Author
Rubemar Rocha de Souza Junior (https://github.com/rubemarjrtech)
In case of sensitive bugs like security vulnerabilities, please contact rubemarrocha22@gmail.com directly instead of using issue tracker.
