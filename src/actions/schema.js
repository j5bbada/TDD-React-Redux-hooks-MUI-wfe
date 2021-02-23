import { schema } from "normalizr"

export const todo = new schema.Entity("todos")
export const arrayOfTodo = new schema.Array(todo)
