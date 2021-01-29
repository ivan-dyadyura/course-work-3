import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks'
import Task from '../views/Task'
import New from '../views/New'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
    alias: '/tasks'
  },
  {
    path: '/tasks/:taskId',
    name: 'Task',
    component: Task,
    props: true
    // children: [
    //   { path: ':taskId', component: Task, props: true }
    // ]
  },
  {
    path: '/new',
    name: 'New',
    component: New
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
