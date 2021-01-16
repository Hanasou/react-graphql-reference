import { gql, useMutation } from '@apollo/client';
import React, {useRef} from 'react';
import { AddUserRequest, UserGet } from '../models/User';

// Define our queries/mutations outside of our function
const ADD_USER = gql`
    mutation AddUser($user: AddUserInput!){
        addUser(user: $user) {
            id
            firstName
            age
            company {
                id
                name
                description
            }
        }
    }
`;
const UsersForm: React.FC = () => {

    const nameInputRef = useRef<HTMLInputElement>(null);
    const ageInputRef = useRef<HTMLInputElement>(null);
    const companyInputRef = useRef<HTMLInputElement>(null);

    let formValues: AddUserRequest = {
        firstName: "",
        age: 0,
        companyName: "",
    }
    // This is some complicated as hell syntax, let's try to walk through it
    // We're destructuring some variables here.
    // userAdd is the function we call to execute this mutation
    // If error has an error, it will exist, otherwise it will be undefined
    // Data is the return value of what we added (I think)
    const [userAdd, {error, data}] = useMutation<
        // I believe the first one is the type of our return value (stored in our data variable)
        // For some reason this always appears to be undefined though
        // Whatever the case, the name should probably match the name of the mutation
        {addUser: UserGet},
        // This argument should be the type of our input variables
        // The name must match the variable name in the mutation
        {user: AddUserRequest}
    >
    // These are the actual arguments of the useMutation hook
    // ADD_USER is the mutation we defined above. Straightforward enough
    // The second one is an object that contains an object that contains our input variables
    (ADD_USER, {
        variables: {user: formValues}
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        formValues = {
            firstName: nameInputRef.current!.value,
            age: +ageInputRef.current!.value,
            companyName: companyInputRef.current!.value,
        }
        console.log(formValues);
        userAdd({
            variables: {user: formValues}
        });
        console.log(error);
        // Why is this undefined?
        console.log(data);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input type="text" ref={nameInputRef}/>
                </label>
                
                <label>
                    Age
                    <input type="number" ref={ageInputRef}/>
                </label>
                
                <label>
                    Company
                    <input type="text" ref={companyInputRef}/>
                </label>
                
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default UsersForm;