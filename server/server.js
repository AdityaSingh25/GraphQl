import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types for our query and mutations //// the Query inside typeDef is how to deal with getting the data from API
// getUser is the name of the query and after the colons is what it will return that is a list of User
//// (id:ID!) means this id field is necessary

/// for resolvers. we need the data, as it is in api so we need some data source(either db or local)
/// for this project we will use local data

const users = [
  { id: "1", name: "John Doe", age: 30, isMarried: true },
  { id: "2", name: "Aditya", age: 25, isMarried: false },
  { id: "3", name: "Cosmo", age: 2, isMarried: false },
];

/// now we will create the resolvers : functions that are going to help tell our API how to deal with all of the type definitions, all the queries, all the mutations which we have created
const typeDefs = `
  type Query {
    getUsers:[User]
    getUserById(id:ID!) : User
  }

  type Mutation{
    createUser(name:String!,age:Int!,isMarried:Boolean!): User
  }

  type User{
    id:ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;
const resolvers = {
  Query: {
    getUsers: () => {
      return users; // if the database is there then we have to make a call here to get the data
    }, //parent is to get access to the above queries
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Server running at ${url}`);

//// every graphql server hase 2 core elements 1. Query  2. Mutation

//// we need to have the typeDefs for our query and our mutations

//// just defining the type definitions is not enough for telling the API how to deal with it, we have to write a function that is going to be resolving the data into the query

//// same thing goes with the mutations, if I define a mutation to create a user or delete a user I'll need to also create a function that is gonna resolve that action of creating or deleting the user, those functions as called resolvers

//// so bically 4 things we need to keep in mind
//// 1. Query, mutation, typeDef, resolver
