import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import './AddTodo.css'

function AddTodo({displayAddModal, hideAddModal, handleAdd }) {
    const [localTitle, setLocalTitle] = useState('')
    const [localDes, setLocalDes] = useState('')
    const [localStat, setLocalStat] = useState(false)

    const handleSubmit = () => {
        const newTodo = {title: localTitle, description: localDes, completed: localStat}
        handleAdd(newTodo)

        setLocalTitle('');
        setLocalDes('');
        setLocalStat(false);

        hideAddModal();
    }
    

  return (
    <div>
        <Modal show={displayAddModal} onHide={hideAddModal}>
            <Modal.Title className='d-flex justify-content-center'>
                <input className='todo-title mt-3' onChange={(e) => {setLocalTitle(e.target.value)}} type="text" placeholder='Title' />
            </Modal.Title>
            <Modal.Body className='d-flex justify-content-center flex-column'>
                <textarea className='todo-des' onChange={(e) => {setLocalDes(e.target.value)}} name="todo-text" placeholder='Description' cols="30" rows="10"></textarea>
                <input type="checkbox" onClick={(e) => setLocalStat(e.target.checked)} />
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