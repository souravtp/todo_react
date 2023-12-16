import { Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import './AddTodo.css'

function AddTodo({ showAddModal, hideAddModal, handleAdd, editTodo, existingTodo, handleUpdate }) {
    const [localTitle, setLocalTitle] = useState('')
    const [localDes, setLocalDes] = useState('')
    const [localStat, setLocalStat] = useState(false)


    useEffect(() => {
        if (editTodo && existingTodo) {
            setLocalTitle(existingTodo.title);
            setLocalDes(existingTodo.description);
            setLocalStat(existingTodo.completed);
        } else {
            // Reset the fields when not in edit mode
            setLocalTitle('');
            setLocalDes('');
            setLocalStat(false);
        }
    }, [editTodo, existingTodo]);


    const handleSubmit = () => {
        if (editTodo) {
            const updatedTodo = { id: existingTodo.id }
            if (localTitle !== existingTodo.title) {
                updatedTodo.title = localTitle
            }

            if (localDes !== existingTodo.description) {
                updatedTodo.description = localDes
            }

            if (localStat !== existingTodo.completed) {
                updatedTodo.completed = localStat
            }

            const completeTodo = { id: existingTodo.id, title: localTitle, description: localDes, completed: localStat }

            // Call the update handler if editTodo is true
            handleUpdate({ updatedTodo: updatedTodo, completeTodo: completeTodo });

        } else {
            const newTodo = { title: localTitle, description: localDes, completed: localStat }
            handleAdd(newTodo)
            setLocalTitle('');
            setLocalDes('');
            setLocalStat(false);

            hideAddModal();
        }
    }

    const handleCancel = () => {
        setLocalTitle(existingTodo.title);
        setLocalDes(existingTodo.description);
        setLocalStat(existingTodo.completed);

        hideAddModal()
    }

    return (
        <div>
            <Modal show={showAddModal} onHide={hideAddModal}>
                <Modal.Title className='d-flex justify-content-center'>
                    <input className='todo-title mt-3' onChange={(e) => { setLocalTitle(e.target.value) }} type="text" placeholder='Title' value={localTitle} />
                </Modal.Title>
                <Modal.Body className='d-flex justify-content-center flex-column'>
                    <textarea className='todo-des' onChange={(e) => { setLocalDes(e.target.value) }} name="todo-text" placeholder='Description' cols="30" rows="10" value={localDes}></textarea>
                    <div className='checkbox-container'>
                        <label htmlFor="iscomplete">Completed</label>
                        <input id='iscomplete' type="checkbox" onChange={(e) => setLocalStat(e.target.checked)} checked={localStat} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} >Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTodo