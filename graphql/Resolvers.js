const Employee = require('../models/employee')
const User = require('../models/user')

const resolvers = {
    Query: {
        async getAllEmployees() {
            return Employee.find()
        },

        async getEmployeeByID(_, { emp_id }) {
            return await Employee.findOne({ emp_id: emp_id })
        },

        async matchUserPassword(_, { username, password }) {
            return await User.findOne({ username: username, password: password })
        }
    },

    Mutation: {
        async createUser(_, { userInput: { username, email, password } }) {
            const createdUser = new User({
                username: username,
                email: email,
                password: password
            })

            const res = await createdUser.save()
            console.log(res._doc)
            return {
                id: res.id,
                ...res._doc
            }
        },

        async createEmployee(_, { employeeInput: { emp_id, first_name, last_name, email, gender, salary } }) {
            const createdEmployee = new Employee({
                emp_id: emp_id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                salary: salary
            })

            const res = await createdEmployee.save()
            console.log(res._doc)
            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteEmployee(_, { emp_id }) {
            const wasDeleted = (await Employee.deleteOne(emp_id)).deletedCount

            return wasDeleted
        },

        async editEmployee(_, { emp_id,  employeeInput: { first_name, last_name, email, gender, salary }}) {
            const wasEdited = (await Employee.updateOne({ emp_id }, { first_name: first_name, last_name: last_name, email: email, gender: gender, salary: salary })).modifiedCount
            return wasEdited
        }
    }
}

module.exports = { resolvers }