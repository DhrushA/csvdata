/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudentData = /* GraphQL */ `
  subscription OnCreateStudentData(
    $filter: ModelSubscriptionStudentDataFilterInput
    $id: String
  ) {
    onCreateStudentData(filter: $filter, id: $id) {
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
export const onUpdateStudentData = /* GraphQL */ `
  subscription OnUpdateStudentData(
    $filter: ModelSubscriptionStudentDataFilterInput
    $id: String
  ) {
    onUpdateStudentData(filter: $filter, id: $id) {
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
export const onDeleteStudentData = /* GraphQL */ `
  subscription OnDeleteStudentData(
    $filter: ModelSubscriptionStudentDataFilterInput
    $id: String
  ) {
    onDeleteStudentData(filter: $filter, id: $id) {
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
