import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import './Home.css'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import AddTodo from '../AddTodo/AddTodo'
import { useNavigate } from 'react-router-dom'


function Home() {
    const [todos, setTodos] = useState([])

    const token = localStorage.getItem('token')

    const [id, setId] = useState(null);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

    const [displayModal, setDisplayModal] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('todos/list-todo', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                })
                setTodos(response.data)

            } catch (err) {
                alert(err)
            }
        }
        fetchTodos();
    }, [])


    //Add Logic
    const showModal = () => {
        setDisplayModal(true)
    }

    const hideModal = () => {
        setDisplayModal(false)
    }

    const handleAdd = async (newTodo) => {

        try {
            const response = await axios.post(`todos/create-todo`, newTodo, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            const createdTodo = response.data

            setTodos((prevTodos) => [...prevTodos, createdTodo])

        } catch (err) {
            alert(err)
        }
    };

    //edit logic
    const showEditModal = (todo) => {
        setSelectedTodo(todo);
        showModal();
    };


    const handleUpdate = async ({ updatedTodo, completeTodo }) => {
        // Make the API call to update the todo
        try {
            await axios.patch(`todos/update-todo/${updatedTodo.id}`, updatedTodo, {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
            )
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === completeTodo.id ? completeTodo : todo)));
        } catch (err) {
            console.log(err)
        }

        hideModal();
    };

    //Delete Logic
    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
        try {
            axios.delete(`todos/delete-todo/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setDisplayConfirmationModal(false)
        } catch (err) {
            alert(err)
        }
    }

    const showDeleteModal = (id) => {
        setId(id);
        setDeleteMessage(`Are you sure you want to delete todo '${todos.find((x) => x.id === id).title}'?`);
        setDisplayConfirmationModal(true);
    }

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false)
    }

    //Logout
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div className='todo-wrapper text-center d-flex flex-column justify-content-center align-items-center'>
            <h1 className='mt-3'>Todos</h1>
            <div className='button-group'>
                <button className='shadow-button' onClick={handleLogout}>Logout</button>
                <button className='shadow-button' onClick={() => showModal()}>Add Todo</button>
            </div>
            <div className='container mt-3'>
                <Row>
                    {todos.map((todo, index) => {
                        return (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} >
                                <div className='custom-card card mb-3' >
                                    <h3>{todo.title}</h3>
                                    <p className='task-description'>{todo.description}</p>
                                    {todo.completed ? <span className='status-c'>Completed</span> : <span className='status-p'>Pending</span>}
                                    <div className='custom-card-footer card-footer d-flex justify-content-around'>
                                        <div className='btn-container'>
                                            <FaTrash className='footer-btn' onClick={() => showDeleteModal(todo.id)} />
                                        </div>
                                        <div className='btn-container'>
                                            <FaPencilAlt className='footer-btn' onClick={() => showEditModal(todo)} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <AddTodo showAddModal={displayModal} hideAddModal={hideModal} handleAdd={handleAdd} handleUpdate={handleUpdate} editTodo={selectedTodo !== null} existingTodo={selectedTodo} />
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
        </div>
    )
}

export default Home