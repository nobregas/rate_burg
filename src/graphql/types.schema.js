import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Rating {
        id: ID!
        rating: Int!
        comment: String
        createdAt: String!
        user: User!
        restaurant: Restaurant!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        role: String!
        image: String
    }

    type Restaurant {
        id: ID!
        name: String!
        image: String!
        location: Location!
        ratings: [Rating!]!
    }

    type Location {
        city: String!
        state: String!
        street: String!
        number: Int!
        complement: String!
    }

    input RatingInput {
        userId: ID!
        averageRating: Float!
        restaurantId: ID!
        rating: Int!
        comment: String
    }

    type Query {
        getRatingsByRestaurant(restaurantId: ID!): [Rating!]!
        getRating(id: ID!): Rating
    }

    type Mutation {
        rateRestaurant(input: RatingInput!): Rating!
    }
`;