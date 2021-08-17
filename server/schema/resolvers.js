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
            console.log("test")
            const user = await User.create(args);
            const token = signToken(user);
            console.log(user)
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
        },

        saveBook: async(_, { bookId, authors, description, title, image, link }, context ) => {
            if( context.user) {
                return User.findOneAndUpdate({ _id: context.user._id},
                    { $push: { savedBooks: { bookId, authors, description, title, image, link } } }
                    )
            }
        },

        removeBook: async(_, { userId, bookId }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: bookId } },
                { new: true }
            )
        }
    }
}

module.exports = resolvers