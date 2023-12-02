import { Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import './AddTodo.css'

function AddTodo({ displayAddModal, hideAddModal, handleAdd, editTodo, existingTodo, handleUpdate }) {
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
            // Call the update handler if editTodo is true
            handleUpdate({ id: existingTodo.id, title: localTitle, description: localDes, completed: localStat });
        } else {
            const newTodo = { title: localTitle, description: localDes, completed: localStat }
            handleAdd(newTodo)
            setLocalTitle('');
            setLocalDes('');
            setLocalStat(false);

            hideAddModal();
        }
    }

        return (
            <div>
                <Modal show={displayAddModal} onHide={hideAddModal}>
                    <Modal.Title className='d-flex justify-content-center'>
                        <input className='todo-title mt-3' onChange={(e) => { setLocalTitle(e.target.value) }} type="text" placeholder='Title' value={localTitle} />
                    </Modal.Title>
                    <Modal.Body className='d-flex justify-content-center flex-column'>
                        <textarea className='todo-des' onChange={(e) => { setLocalDes(e.target.value) }} name="todo-text" placeholder='Description' cols="30" rows="10" value={localDes}></textarea>
                        <input type="checkbox" onClick={(e) => setLocalStat(e.target.checked)} defaultChecked={localStat} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleSubmit} >Save</Button>
                        <Button onClick={hideAddModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    export default AddTodo