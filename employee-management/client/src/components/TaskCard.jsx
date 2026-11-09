import Rating from './Rating'

function TaskCard({ task }) {
    return (
        <li className={task.completed ? 'task-card done' : 'task-card'}>
            <h3>{task.title}</h3>
            {task.description && <p></p>} //this will only display task description paragraph is task description exists

            <p className='meta'>
                Assigned to <strong>{task.assigned_to_name}</strong> by {task.created_by_name}

                <div className='status'>
                    {!task.completed ? (
                        <span className='badge pending'>Pending</span>
                    ) : task.rating === null ? (
                        <span className="badge awaiting">Completed, awaiting rating</span>
                    ) : (
                        <Rating value={task.rating}/>
                    )}
                </div>
            </p>
        </li>
    )
}