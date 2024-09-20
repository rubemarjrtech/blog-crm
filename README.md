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


#### Getting started
First, the application should be running successfully after running the commands docker-compose build and after its finished, docker-compose up.

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
Send a post request with the credentials in the body to the login route http://localhost:4000/api/user/login

![Login](https://i.ibb.co/jhPSj6G/Captura-de-tela-2024-09-20-093423.png)

You should receive a session and status 200 as the response.
Nest, send a post request to the create post route http://localhost:4000/api/post/create.

![Create-Post](https://i.ibb.co/5x4rQFB/Captura-de-tela-2024-09-20-094002.png)

Now we have posts to manage!

#### Reminder:
you dont have to pass in tokens in the request headers, when you login, the access and refresh tokens are set as cookies and when sending requests to protected routes, they are gonna be retrieved automatically.

## Managing posts
Login as admin sending the credentials to the admin login route http://<your-host-goes-here>/api/admin/login. You should receive a token in the response.
Now with the token, send a get request to the route http://<your-host-goes-here>/api/post/pending. You should receive a list of posts waiting for approval.

## Publishing posts
You must be logged in as admin for this step.
All you gotta do is send a put request to the route http://<your-host-goes-here>/api/post/approve/<post-id-goes-here>. It's done! Now people on the internet can view the post and comment on it.

## Receiving and approving comments
Of crouse, we need to be logged in as admin for this step.
Send a get request to the route http://<your-host-goes-here>/api/comment/pending. You should receive a list of comments waiting for approval.
You like it? Approve it with a put request to the route http://<your-host-goes-here>/api/comment/aprove/<comment-id-goes-here>.
Only approved posts will show when we load details of a blog post.

## Listing members
You may also get information about all the artists in the route http://<your-host-goes-here>/api/member or full information for a single artist at http://<your-host-goes-here>/api/member/heregoesid



## Final notes:

That's it. Now we manage the blog and comments of an artist.
