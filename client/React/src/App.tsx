import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const CRETE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

type NewUser = {
  name: string;
  age: number | string;
  isMarried: boolean | string;
};

function App() {
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    age: "",
    isMarried: "",
  });

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  const { data: getUserByIdData, loading: getUserByIdLoading } = useQuery(
    GET_USER_BY_ID,
    {
      variables: { id: "2" },
    }
  );

  const [createUser] = useMutation(CRETE_USER, {});

  if (getUsersLoading) return <p>data loading!! please wait</p>;
  if (getUsersError) return <p>Error : {getUsersError.message}</p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: Boolean(newUser.isMarried),
      },
    });
  };

  return (
    <div>
      <div>
        <input
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        ></input>
        <input
          placeholder="age"
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        ></input>
        <input
          placeholder="Marital status"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, isMarried: e.target.value }))
          }
        ></input>
        <button onClick={handleCreateUser}>Create user</button>
      </div>
      <div>
        {getUserByIdLoading ? (
          <p>Loading user by id please wait!!</p>
        ) : (
          <div>
            <h1>Choosen User</h1>
            <p>{getUserByIdData.getUserById.name}</p>
            <p>{getUserByIdData.getUserById.age}</p>
          </div>
        )}
      </div>
      <h1>Users</h1>
      <div>
        {getUsersData.getUsers.map((user: any) => (
          <div key={user.id}>
            <p>Name : {user.name}</p>
            <p>age : {user.age}</p>
            <p>Is Married : {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
