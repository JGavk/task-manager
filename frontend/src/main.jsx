import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import TaskView from './pages/task/TaskView.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import './index.css'
import App from './App.jsx'
import Layout from './layout/layout.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="tasks" element={<TaskView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  </AuthProvider>
)