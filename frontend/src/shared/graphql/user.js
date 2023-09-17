import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query allUser {
    users {
      id
      firstName
      lastName
      participation
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $participation: Float!
  ) {
    createUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        participation: $participation
      }
    ) {
      id
      firstName
      lastName
      participation
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $firstName: String!
    $lastName: String!
    $participation: Float!
  ) {
    updateUser(
      id: $id
      data: {
        firstName: $firstName
        lastName: $lastName
        participation: $participation
      }
    ) {
      id
      firstName
      lastName
      participation
    }
  }
`;

export const REMOVE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;
