import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';

function AddTodo({showAddModal, hideAddModal, setTitle, setDescription, confirmAdd, setTodos  }) {
    const [localTitle, setLocalTitle] = useState('');
    const [localDescription, setLocalDescription] = useState('');

    const handleAddTodo = () => {
        if (localTitle.trim() !== '') {

        setTitle(localTitle);
        setDescription(localDescription);

        setTodos((prevTodos) => [...prevTodos, { title: localTitle, description: localDescription }]);
    }
    }

  return (
    <div>
        <Modal show={showAddModal}>
            <Modal.Title className='d-flex justify-content-center'>
                <input onChange={(e) => {setLocalTitle(e.target.value)}} className='mt-3' type="text" placeholder='Title' />
            </Modal.Title>
            <Modal.Body className='d-flex justify-content-center'>
                <textarea onChange={(e) => {setLocalDescription(e.target.value)}} name="todo-text" placeholder='Description' cols="30" rows="10"></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>handleAddTodo}>Save</Button>
                <Button onClick={hideAddModal()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default AddTodo