# MongoDB Practice

MongoDB Exercise in mongo shell

Connect to a running mongo instance, use a database named `mongo_practice`.

Document all your queries in a javascript file to use as a reference.

## Insert Documents

Insert the following documents into a `movies` collection.

### Insert one

```javascript
{
  title : "Fight Club",
  writer : "Chuck Palahniuk",
  year : 1999,
  actors : [
    "Brad Pitt",
    "Edward Norton"
  ]
}
```

### Insert many

```javascript
[
  {
    title : "Pulp Fiction",
    writer : "Quentin Tarantino",
    year : 1994,
    actors : [
      "John Travolta",
      "Uma Thurman"
    ]
  },
  {
    title : "Inglorious Basterds",
    writer : "Quentin Tarantino",
    year : 2009,
    actors : [
      "Brad Pitt",
      "Diane Kruger",
      "Eli Roth"
    ]
  },
  {
    title : "The Hobbit: An Unexpected Journey",
    writer : "J.R.R. Tolkein",
    year : 2012,
    franchise : "The Hobbit",
  },
  {
    title: "The Hobbit: The Desolation of Smaug",
    writer: "J.R.R. Tolkein",
    year : 2013,
    franchise: "The Hobbit"
  },
  {
    title : "The Hobbit: The Battle of the Five Armies",
    writer : "J.R.R. Tolkein",
    year : 2012,
    franchise : "The Hobbit",
    synopsis : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
  },
  {
    title : "Pee Wee Herman's Big Adventure"
  },
  {
    title: "Avatar"
  }
]
```

## Query / Find Documents

Query the `movies` collection to

- [x] Get all documents

  ```javascript
  db.movies.find()
  ```

- [x] Get all documents with `writer` set to "Quentin Tarantino"

  ```javascript
    db.movies.find({ writer: "Quentin Tarantino" })
  ```

- [x] Get all documents where `actors` include "Brad Pitt"

  ```javascript
  db.movies.find({ actors: { $in: ["Brad Pitt"] } })
  ```

- [x] Get all documents with `franchise` set to "The Hobbit"

  ```javascript
  db.movies.find({ franchise: "The Hobbit" })
  ```

- [x] Get all movies released in the 90s
  
  ```javascript
  db.movies.find({ 
    $and: [
      { year: { $lt: 2000 } }, 
      { year: { $gte: 1990 } }
    ]
  })
  ```

- [x] get all movies released before the year 2000 or after 2010

  ```javascript
  db.movies.find({
    $or: [
      { year: { $lt: 2000 }},
      { year: { $gt: 2010 }}
    ]
  })
  ```

## Update Documents

- [x] Add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."

  ```javascript
  db.movies.updateOne(
    { 
      title: "The Hobbit: An Unexpected Journey"
    },
    { 
      $set: {
      synopsis: "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
      }
    }
  )
  ```

- [x] Add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
  
  ```javascript
  db.movies.updateOne(
    { 
      title: "The Hobbit: The Desolation of Smaug"
    }, 
    {
      $set: {
        synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
      }
    }
  )
  ```

- [x] Add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"

  ```javascript
  db.movies.updateOne(
    { title: "Pulp Fiction" }, 
    { $push: { actors: "Samuel L. Jackson" } }
  )
  ```

## Text Search

- [x] Find all movies that have a synopsis that contains the word "Bilbo"
  
  ```javascript
  db.movies.find({
      synopsis: {
        $regex: /Bilbo/i
      }      
  })
  ```

- [x] Find all movies that have a synopsis that contains the word "Gandalf"

  ```javascript
  db.movies.find({
      synopsis: {
        $regex: /Gandalf/i
      }      
  })
  ```

- [x] Find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"

  ```javascript
  db.movies.find({
    $and: [
      { synopsis: { $regex: /Bilbo/i} },
      { 
        synopsis: { $not: { $regex: /Gandalf/i} }
      }
    ]
  })
  ```

- [x] Find all movies that have a synopsis that contains the word "dwarves" or "hobbit"

  ```javascript
  db.movies.find({
    $or: [
      { synopsis: { $regex: /dwarves/i} },
      { synopsis: { $regex: /hobbit/i} }
    ]
  })
  ```
  
- [x] Find all movies that have a synopsis that contains the word "gold" and "dragon"

  ```javascript
  db.movies.find({
    $and: [
      { synopsis: { $regex: /gold/i} },
      { synopsis: { $regex: /dragon/i} }
    ]
  })
  ```

## Delete Documents

- [x] Delete the movie "Pee Wee Herman's Big Adventure"

  ```javascript
  db.movies.deleteOne({ title: "Pee Wee Herman's Big Adventure" })
  ```

- [x] Delete the movie "Avatar"

  ```javascript
  db.movies.deleteOne({ title: "Avatar" })
  ```
  
## Relationships

### Insert the following documents into a `users` collection

```javascript
db.users.insertMany([
  { 
    username: "GoodGuyGreg",
    first_name: "Good Guy",
    last_name: "Greg"
  },
  {
    username: "ScumbagSteve",
    full_name:{
      first: "Scumbag",
      last: "Steve"
    }
  }
])
```

### Insert the following documents into a `posts` collection

```javascript
db.posts.insertMany([
  {
    username: "GoodGuyGreg",
    title: "Passes out at party",
    body: "Wakes up early and cleans house"
  },
  {
    username: "GoodGuyGreg",
    title: "Steals your identity",
    body: "Raises your credit score"
  },
  {
    username: "GoodGuyGreg",
    title: "Reports a bug in your code",
    body: "Sends you a Pull Request"
  },
  {
    username: "ScumbagSteve",
    title: "Borrows something",
    body: "Sells it"
  },
  {
    username: "ScumbagSteve",
    title: "Borrows everything",
    body: "The end"
  },
  {
    username: "ScumbagSteve",
    title: "Forks your repo on github",
    body: "Sets to private"
  }
])
```

### Insert the following documents into a `comments` collection

```javascript
db.comments.insertMany([
  {
    username: "GoodGuyGreg",
    comment: "Hope you got a good deal!",
    post: "630d31b2a08eb3764ce3630f"
  },
  {
    username: "GoodGuyGreg",
    comment: "What's mine is yours!",
    post: "630d31b2a08eb3764ce3630f"
  },
  {
    username: "GoodGuyGreg",
    comment: "Don't violate the licensing agreement!",
    post: "630d31b2a08eb3764ce36311"
  },
  {
    username: "ScumbagSteve",
    comment: "It still isn't clean",
    post: "630d31b2a08eb3764ce3630c"
  },
  {
    username: "ScumbagSteve",
    comment: "Denied your PR cause I found a hack",
    post: "630d31b2a08eb3764ce3630e"
  }
])
```

## Querying related collections

- [x] Find all users
  
  ```javascript
  db.users.find()
  ```

- [x] Find all posts

  ```javascript
  db.posts.find()
  ```

- [x] Find all posts that was authored by "GoodGuyGreg"

  ```javascript
  db.posts.find({ username: "GoodGuyGreg" })
  ```

- [x] Find all posts that was authored by "ScumbagSteve"
  
  ```javascript
  db.posts.find({ username: "ScumbagSteve" })
  ```

- [x] Find all comments

  ```javascript
  db.comments.find()
  ```

- [x] Find all comments that was authored by "GoodGuyGreg"

  ```javascript
  db.comments.find({ username: "GoodGuyGreg" })
  ```

- [x] Find all comments that was authored by "ScumbagSteve"

  ```javascript
  db.comments.find({ username: "ScumbagSteve" })
  ```
  
- [x] Find all comments belonging to the post "Reports a bug in your code"

  ```javascript
  db.comments.find({ 
    post: db.posts.findOne({ 
      title: "Reports a bug in your code" 
    })._id.toString()
  })
  ```
