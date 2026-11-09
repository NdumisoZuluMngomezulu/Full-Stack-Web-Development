import TaskList from './components/TaskList'

const sampleTasks = [
  {
    id: 1,
    title: 'Write weekly report',
    description: 'Cover sales and support',
    completed: 0,
    rating: null,
    assigned_to: 2,
    assigned_to_name: 'alice',
    created_by: 1,
    created_by_name: 'boss',
  },
  {
    id: 2,
    title: 'Update onboarding docs',
    description: '',
    completed: 1,
    rating: null,
    assigned_to: 3,
    assigned_to_name: 'bob',
    created_by: 1,
    created_by_name: 'boss',
  },
  {
    id: 3,
    title: 'Fix login page bug',
    description: 'Button misaligned on mobile',
    completed: 1,
    rating: 4,
    assigned_to: 2,
    assigned_to_name: 'alice',
    created_by: 1,
    created_by_name: 'boss',
  },
]

function App() {
  return (
    <div className='app'>
      <h1>Team Tasks</h1>
      <TaskList tasks={sampleTasks}/>
    </div>
  )
}

export default App