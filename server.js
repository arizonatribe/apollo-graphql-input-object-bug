const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")

const typeDefs = gql`
  input AddressInput {
    lat: Float
    lon: Float
    address: String
  }

  type Address {
    id: ID!
    lat: Float
    lon: Float
    address: String
  }

  type Query {
    addresses: [Address]
  }

  type Mutation {
    createNewAddress(address: AddressInput): Boolean
  }
`
const resolvers = {
  Query: {
    addresses: () => {
      return []
    }
  },
  Mutation: {
    createNewAddress(_, { address }) {
      // If address was built via Object.create(null), no Object prototype methods will work
      console.log(address.hasOwnProperty("lat"))

      /* TODO: Do some database call or external API call and return the truthy result */

      return true
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app, path: "/graphql" })

app.listen({ port: 4000 }, () => {
  console.log(`Server is now running at http://localhost:4000${server.graphqlPath}`)
})
