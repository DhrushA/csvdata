/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStudentData = /* GraphQL */ `
  mutation CreateStudentData(
    $input: CreateStudentDataInput!
    $condition: ModelStudentDataConditionInput
  ) {
    createStudentData(input: $input, condition: $condition) {
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
export const updateStudentData = /* GraphQL */ `
  mutation UpdateStudentData(
    $input: UpdateStudentDataInput!
    $condition: ModelStudentDataConditionInput
  ) {
    updateStudentData(input: $input, condition: $condition) {
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
export const deleteStudentData = /* GraphQL */ `
  mutation DeleteStudentData(
    $input: DeleteStudentDataInput!
    $condition: ModelStudentDataConditionInput
  ) {
    deleteStudentData(input: $input, condition: $condition) {
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
