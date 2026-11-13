import TaskList from './TaskCard'

function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return (<p className="no-tasks">No tasks yet.</p>)
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task}/>
            ))}
        </ul>
    )
}



//   return (
//     <ul className="task-list">
//       {tasks.map((task) => (
//         <TaskCard key={task.id} task={task} />
//       ))}
//     </ul>
//   )
