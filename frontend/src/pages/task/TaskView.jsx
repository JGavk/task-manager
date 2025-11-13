import { useTasks } from "../../context/TaskContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTasks, createTask, deleteTask, updateTask } from "../../services/path";

const TaskView = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending'
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const taskData = {
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                user_Id: user.id
            };

            const createdTask = await createTask(taskData);
            setTasks(prev => [...prev, createdTask]);
            setNewTask({ title: '', description: '', status: 'pending' });
            setShowAddModal(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    const handleEditTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const taskData = {
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status
            };

            const updatedTask = await updateTask(editingTask.id, taskData);
            setTasks(prev => prev.map(task => 
                task.id === editingTask.id ? updatedTask : task
            ));
            setShowEditModal(false);
            setEditingTask(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (taskId) => {
        setTaskToDelete(taskId);
        setShowDeleteModal(true);
    };

    const handleDeleteTask = async () => {
        try {
            await deleteTask(taskToDelete);
            setTasks(prev => prev.filter(task => task.id !== taskToDelete));
            setShowDeleteModal(false);
            setTaskToDelete(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const openEditModal = (task) => {
        setEditingTask({ ...task });
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const tasksByStatus = {
        pending: tasks.filter(task => task.status === 'pending'),
        in_progress: tasks.filter(task => task.status === 'in_progress'),
        done: tasks.filter(task => task.status === 'done')
    };

    if (loading && tasks.length === 0) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">My Tasks</h2>
                            <div>
                                <button 
                                    className="btn btn-light btn-sm me-2"
                                    onClick={fetchTasks}
                                    disabled={loading}
                                >
                                    {loading ? 'Refreshing...' : 'Refresh'}
                                </button>
                                <button 
                                    className="btn btn-success btn-sm"
                                    onClick={() => setShowAddModal(true)}
                                >
                                    Add New Task
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {tasks.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-muted">No tasks found. Create your first task!</p>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        Create Your First Task
                                    </button>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-md-4 mb-4">
                                        <div className="card border-warning">
                                            <div className="card-header bg-warning text-dark">
                                                <h6 className="mb-0">
                                                    Pending
                                                    <span className="badge bg-light text-dark ms-2">
                                                        {tasksByStatus.pending.length}
                                                    </span>
                                                </h6>
                                            </div>
                                            <div className="card-body" style={{minHeight: '200px'}}>
                                                {tasksByStatus.pending.map(task => (
                                                    <TaskCard 
                                                        key={task.id} 
                                                        task={task} 
                                                        onRemove={confirmDelete}
                                                        onEdit={openEditModal}
                                                    />
                                                ))}
                                                {tasksByStatus.pending.length === 0 && (
                                                    <p className="text-muted text-center small">No tasks</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-4">
                                        <div className="card border-info">
                                            <div className="card-header bg-info text-white">
                                                <h6 className="mb-0">
                                                    In Progress
                                                    <span className="badge bg-light text-dark ms-2">
                                                        {tasksByStatus.in_progress.length}
                                                    </span>
                                                </h6>
                                            </div>
                                            <div className="card-body" style={{minHeight: '200px'}}>
                                                {tasksByStatus.in_progress.map(task => (
                                                    <TaskCard 
                                                        key={task.id} 
                                                        task={task} 
                                                        onRemove={confirmDelete}
                                                        onEdit={openEditModal}
                                                    />
                                                ))}
                                                {tasksByStatus.in_progress.length === 0 && (
                                                    <p className="text-muted text-center small">No tasks</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-4">
                                        <div className="card border-success">
                                            <div className="card-header bg-success text-white">
                                                <h6 className="mb-0">
                                                    Done
                                                    <span className="badge bg-light text-dark ms-2">
                                                        {tasksByStatus.done.length}
                                                    </span>
                                                </h6>
                                            </div>
                                            <div className="card-body" style={{minHeight: '200px'}}>
                                                {tasksByStatus.done.map(task => (
                                                    <TaskCard 
                                                        key={task.id} 
                                                        task={task} 
                                                        onRemove={confirmDelete}
                                                        onEdit={openEditModal}
                                                    />
                                                ))}
                                                {tasksByStatus.done.length === 0 && (
                                                    <p className="text-muted text-center small">No tasks</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showAddModal && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Task</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowAddModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <form onSubmit={handleAddTask}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="taskTitle" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="taskTitle"
                                            name="title"
                                            value={newTask.title}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter task title"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="taskDescription" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="taskDescription"
                                            name="description"
                                            rows="3"
                                            value={newTask.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter task description"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="taskStatus" className="form-label">Status</label>
                                        <select
                                            className="form-select"
                                            id="taskStatus"
                                            name="status"
                                            value={newTask.status}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={() => setShowAddModal(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading || !newTask.title.trim()}
                                    >
                                        {loading ? 'Creating...' : 'Create Task'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editingTask && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Task</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowEditModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <form onSubmit={handleEditTask}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="editTaskTitle" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editTaskTitle"
                                            name="title"
                                            value={editingTask.title}
                                            onChange={handleEditInputChange}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editTaskDescription" className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="editTaskDescription"
                                            name="description"
                                            rows="3"
                                            value={editingTask.description}
                                            onChange={handleEditInputChange}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editTaskStatus" className="form-label">Status</label>
                                        <select
                                            className="form-select"
                                            id="editTaskStatus"
                                            name="status"
                                            value={editingTask.status}
                                            onChange={handleEditInputChange}
                                            disabled={loading}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={() => setShowEditModal(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading || !editingTask.title.trim()}
                                    >
                                        {loading ? 'Updating...' : 'Update Task'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this task?</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={handleDeleteTask}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TaskCard = ({ task, onRemove, onEdit }) => {
    return (
        <div className="card mb-3 shadow-sm position-relative">
            <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-1"
                style={{zIndex: 1}}
                onClick={() => onRemove(task.id)}
            ></button>
            
            <div 
                className="card-body p-3" 
                style={{cursor: 'pointer'}}
                onClick={() => onEdit(task)}
            >
                <h6 className="card-title mb-2 fw-bold">{task.title}</h6>
                {task.description && (
                    <p className="card-text small text-muted mb-2">
                        {task.description}
                    </p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                        {getStatusLabel(task.status)}
                    </span>
                    <small className="text-muted">#{task.id}</small>
                </div>
            </div>
        </div>
    );
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'pending': return 'bg-warning text-dark';
        case 'in_progress': return 'bg-info text-white';
        case 'done': return 'bg-success text-white';
        default: return 'bg-secondary';
    }
};

const getStatusLabel = (status) => {
    const labels = {
        pending: 'Pending',
        in_progress: 'In Progress',
        done: 'Done'
    };
    return labels[status] || status;
};

export default TaskView;