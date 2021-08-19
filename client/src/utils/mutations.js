import { gql } from "@apollo/client"

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
                password
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $authors: [String], $description: String!, $title: String!, $image: String!, $link: String){
        saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link ){
            _id
            savedBooks{
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }

`

export const REMOVE_BOOK = gql`
    mutation removeBook($book: String!) {
        removeBook(bookId: $book) {
            _id
            savedBooks{
                bookId
            }
        }
    }
`