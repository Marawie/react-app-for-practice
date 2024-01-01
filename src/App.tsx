import React, { useState } from 'react';
import styles from './App.module.css';

interface Task {
    name: string;
    description: string;
    id: number;
}

const App: React.FC = () => {
    const [addInput, setAddInput] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [list, setList] = useState<Task[]>([]);
    const [id, setId] = useState(1);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    function isInputAdded(): void {
        setAddInput(!addInput);
        setEditingTask(null);
    }

    function addNewTask(): void {
        if (name && description && id) {
            const newTask = { name, description, id };
            setList([...list, newTask]);
            setName('');
            setDescription('');
            setId((prevId) => prevId + 1);
            setEditingTask(null);
        }
    }

    function removeTask(taskId: number): void {
        const updatedList = list.filter((task) => task.id !== taskId);
        setList(updatedList);
        setEditingTask(null);
    }

    function editTask(taskId: number): void {
        const taskToEdit = list.find((task) => task.id === taskId);

        if (taskToEdit) {
            setEditingTask(taskToEdit);
            setAddInput(true);
        }
    }

    function saveEditedTask(): void {
        if (editingTask) {
            const updatedList = list.map((task) =>
                task.id === editingTask.id ? { ...task, name, description } : task
            );
            setList(updatedList);
            setEditingTask(null);
            setAddInput(false);
            setName('');
            setDescription('');
        }
    }

    return (
        <>
            <div className={styles.AddTaskButton}>
                <button onClick={isInputAdded}>
                    {editingTask ? 'Anuluj edycję' : 'Dodaj nowe zadanie'}
                </button>
                {addInput && (
                    <div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                        />

                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="description"
                        />
                        <button
                            onClick={editingTask ? saveEditedTask : addNewTask}
                            disabled={!name || !description}
                        >
                            {editingTask ? 'Zapisz zmiany' : '+'}
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.TaskList}>
                {list.map((task, index) => (
                    <div key={index} className={styles.Task}>
                        <h3>Name: {task.name}</h3>
                        <p>Description: {task.description}</p>
                        <button onClick={() => editTask(task.id)}>Edit</button>
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;
