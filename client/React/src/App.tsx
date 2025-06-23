import { useQuery, useMutation, gql } from "@apollo/client";
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
function App() {
  const { data, error, loading } = useQuery(GET_USERS);
  if (loading) return <p>data loading!! please wait</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      <h1>Users</h1>
      <div>
        {data.getUsers.map((user: any) => (
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
