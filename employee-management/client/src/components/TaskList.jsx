import TaskCard from './TaskCard'

function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return <p className="empty">No tasks yet.</p>
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </ul>
    )
}

export default TaskList