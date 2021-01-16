import React from 'react';
import {useQuery, gql} from '@apollo/client';

import { UserGet, UserGetData } from '../models/User';

// Define our graphql query
const USERS_QUERY = gql`
    query {
        users {
            id
            firstName
            age
            company {
                name
                description
            }
        }
    }
`;

const Users: React.FC = () => {
    // Run our query inside the component
    // Destructure the result into loading, error, and data components
    const {loading, error, data} = useQuery<UserGetData, UserGet>(USERS_QUERY);

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error</p>;

    const users = data!.users.map(user => {
        return <li key={user.id}>{user.firstName}: {user.age} in {user.company.name}</li>
    })

    return(
        <div>
            <h1>Users Component</h1>
            <ul>
                {users}
            </ul>
        </div>
    )
}

export default Users;