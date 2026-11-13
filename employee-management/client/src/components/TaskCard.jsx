import Rating from '.Rating'

function TaskCard({ task }){
    return (
        <li className={task.completed ? 'task-done' : 'task-notdone'}>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}

            <p className='meta'>
                Assigned to <strong>{task.assigned_to_name}</strong> by {task.created_by}
            </p>

            <div className='status'>
                {!task.completed ? (<span className='pending'>Pending</span>) : 
                task.rating === null ? (<span className='awaiting'>Completed, awaiting rating</span>) : (
                    <Rating value={task.rating}/>
                )}
            </div>
        </li>
    )
}

export default TaskCard