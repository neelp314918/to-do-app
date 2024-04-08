import { useEffect, useState } from "react";

function App() {
    // State variables to hold todo list, selected user ID, and fetching status
    const [np_todo, np_setTodo] = useState([]);
    const [np_userID, np_setUserID] = useState(1);
    const [np_fetching, np_setFetching] = useState(false);

    // Function to handle user selection change
    function np_handleChange(e) {
        console.log(e.target.value);
        np_setUserID(e.target.value);
    }

    // Effect to fetch todo list when user ID changes
    useEffect(() => {
        np_setFetching(true);
        console.log("test");
        fetch(`https://dummyjson.com/todos/user/${np_userID}`)
            .then((res) => res.json())
            .then((data) => {
                np_setTodo(data.todos);
                np_setFetching(false);
            });
    }, [np_userID]);

    return (
        <section>
            <header>
                {/* Title and author info */}
                <h1>To Do App</h1>
            </header>
            <div>
                {/* Dropdown to select user */}
                <label htmlFor="user">Select a User : </label>
                <select id="user" onChange={np_handleChange}>
                    <option value="1">Arthur</option>
                    <option value="2">Lily</option>
                    <option value="3">George</option>
                </select>
            </div>
            <main>
                {/* Display loading message or todo list */}
                {np_fetching ? (
                    <p>Loading Data</p>
                ) : (
                    <ul>
                        {np_todo.map((np_task) => {
                            return <li key={np_task.id}>{np_task.todo}</li>;
                        })}
                    </ul>
                )}
            </main>
        </section>
    );
}

export default App;
