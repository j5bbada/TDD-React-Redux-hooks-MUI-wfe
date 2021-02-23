import api from "./api"

const todoApi = {
  fetchTodos,
  toggleTodo,
  addTodo,
  removeTodo,
}

export default todoApi

function fetchTodos(filter = "all") {
  return api.get(`/api/todos?filter=${filter}`)
}

function toggleTodo(id) {
  return api.put(`/api/todos/${id}`)
}

function addTodo(text) {
  return api.post(`/api/todos`, {
    text,
  })
}
function removeTodo(id) {
  return api.delete(`/api/todos/${id}`)
}
