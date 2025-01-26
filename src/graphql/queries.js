/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStudentData = /* GraphQL */ `
  query GetStudentData($id: ID!) {
    getStudentData(id: $id) {
      id
      first_name
      last_name
      gender
      email
      phone
      date_of_birth
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStudentData = /* GraphQL */ `
  query ListStudentData(
    $filter: ModelStudentDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        gender
        email
        phone
        date_of_birth
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
