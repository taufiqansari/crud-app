import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./Homepage.css";
const Homepage = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) =>
              setTodos((oldArray) => [...oldArray, todo])
            );
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, [navigate]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });
    setTodo("");
    setIsEdit(false);
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      uidd: tempUidd,
    });
    setTodo("");
    setIsEdit(false);
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };
  return (
    <div>
      <button onClick={logoutHandler} className="logout-btn">
        LogOut
      </button>
      <div className="todo_conatiner">
        <div className="add_todo">
          <input
            type="text"
            placeholder="Add todo.."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {isEdit ? (
            <div className="btn">
              <button onClick={handleConfirm}>Confirm</button>
            </div>
          ) : (
            <div className="btn">
              <button onClick={writeToDatabase}>Add</button>
            </div>
          )}
        </div>
        {todos.map((todo, index) => (
          <div key={index} className="todo_list">
            <h1>{todo.todo}</h1>
            <div className="list_btn">
              <button className="update-btn" onClick={() => handleUpdate(todo)}>
                Update
              </button>
              <button
                className="dlt-btn"
                onClick={() => handleDelete(todo.uidd)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
