const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Employee {
        emp_id: Int!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type User {
        username: String!
        email: String!
        password: String!
    }

    input EmployeeInput {
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    # Queries
    type Query {
        matchUserPassword(username: String!, password: String!): User!
        getAllEmployees: [Employee!]!
        getEmployeeByID(emp_id: Int!): Employee!
    }

    # Mutations
    type Mutation {
        createUser(userInput: UserInput): User!
        createEmployee(employeeInput: EmployeeInput): Employee!
        deleteEmployee(ID: ID!): Boolean!
        editEmployee(ID: ID!, employeeInput: EmployeeInput): Boolean!
    }
`

module.exports = { typeDefs }