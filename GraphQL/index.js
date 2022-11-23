import {ApolloServer, gql} from 'apollo-server'

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

let typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    #    input type for newBook, rewrite the fields bc we need to add !
    input NewBookInput {
        title: String!
        author: String!
    }

    #   FETCH
    type Query {
        books: [Book]
    }

    #   MODIFY
    type Mutation {
        newBook(input: NewBookInput!): Book! 
    }
`

let resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        newBook: (_, {input}) => {
            books.push(input);
            return input;
        }
    }
}

let server = new ApolloServer({typeDefs, resolvers})
server.listen();
