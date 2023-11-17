import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import './Home.css'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import AddTodo from '../AddTodo/AddTodo'


function Home() {
    const [todos, setTodos] = useState([])
    const token = localStorage.getItem('token')

    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [displayAddModal, setDisplayAddModal] = useState(false)

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('todos/list-todo', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                })

                console.log(response.data)
                setTodos(response.data)

            } catch (err) {
                alert(err)
            }
        }
        fetchTodos();
    }, [])

    const showAddModal = () => {
        setDisplayAddModal(true)
    }

    const hideAddModal = () => {
        setDisplayAddModal(false)
    }

    const handleAdd = () => {
        setTodos((prevTodos) => [...prevTodos, {title: title, description: description}])
    }


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

    return (
        <div className='content-wrapper text-center d-flex flex-column justify-content-center align-items-center'>
            <h1>Todos</h1>
            <button className='btn btn-primary' onClick={() => showAddModal() }>Add Todo</button>
            <div className='container mt-3'>
                <Row>
                    {todos.map((todo, index) => {
                        return (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} >
                                <div className='card mb-3' >
                                    <h3>{todo.title}</h3>
                                    <p>{todo.description}</p>
                                    {todo.completed ? <span>Completed</span> : <span>Pending</span>}
                                    <div className='card-footer d-flex justify-content-around'>
                                        <FaTrash className='footer-btn' onClick={() => showDeleteModal(todo.id)} />
                                        <FaPencilAlt className='footer-btn' />
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <AddTodo showAddModal={displayAddModal} hideAddModal={hideAddModal} setTitle={setTitle} setDescription={setDescription} confirmAdd={handleAdd} setTodos={setTodos} />
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
        </div>
    )
}

export default Home