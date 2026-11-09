import { useState } from 'react'
import Login from './components/Login'
import TaskList from './components/TaskList'

// ...keep your sampleTasks array here...
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
  const [auth, setAuth] = useState(null) // null, or { token, user }

  if (!auth) {
    return (
      <div className="app">
        <h1>Team Tasks</h1>
        <Login onLogin={setAuth} />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="top-bar">
        <h1>Team Tasks</h1>
        <div>
          <span>
            {auth.user.username} <em>({auth.user.role})</em>
          </span>
          <button onClick={() => setAuth(null)}>Log out</button>
        </div>
      </header>

      <TaskList tasks={sampleTasks} />
    </div>
  )
}

export default App

