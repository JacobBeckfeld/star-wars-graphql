const { AuthenticationError } = require("apollo-server-express");
const { User, Book} = require("../models")
const { signToken } = require("../utils/auth")

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
    },

    Mutation: {
        createUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async(_, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user found!")
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError("Incorrect password")
            }

            const token = signToken(user);
            return { token, user }
        }
    }
}

module.exports = resolvers