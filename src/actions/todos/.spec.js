import * as actions from "."
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import api from "../../apis/todo.api"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initialState = {
  byId: {},
  listByFilter: {
    active: { errorMessage: null, ids: [], isFetching: false },
    all: { errorMessage: null, ids: [], isFetching: false },
    completed: { errorMessage: null, ids: [], isFetching: false },
  },
}
const store = mockStore({ todos: initialState })

describe("todos actions", () => {
  beforeEach(() => {
    store.clearActions()
  })

  describe("fetchTodos", () => {
    it("Have an Empty array of data", async () => {
      // given
      const filter = "all"
      const mockResponse = []
      jest.spyOn(api, "fetchTodos").mockImplementation(() => Promise.resolve(mockResponse))
      // when
      const result = await store.dispatch(actions.fetchTodos(filter))
      //   console.log("result")
      //   console.log(result)
      // then
      expect(result.type).toBe(actions.FETCH_TODOS_SUCCESS)
      expect(result.response.result).toStrictEqual([])
    })

    it("Have an array of data", async () => {
      // given
      const filter = "all"
      const response = [
        {
          id: 1,
          text: "test todo 1",
          completed: false,
          createDate: "2020-12-29T00:15:07.318+00:00",
        },
        {
          id: 2,
          text: "test todo 2",
          completed: false,
          createDate: "2020-12-29T04:45:55.780+00:00",
        },
      ]
      jest.spyOn(api, "fetchTodos").mockImplementation(() => Promise.resolve(response))
      // when
      const result = await store.dispatch(actions.fetchTodos(filter))
      //   console.log("result")
      //   console.log(result)
      // then
      expect(result.type).toBe(actions.FETCH_TODOS_SUCCESS)
      expect(result.response.result).toStrictEqual([1, 2])
    })
  })

  it("addTodo", async () => {
    //given
    const response = {
      id: 3,
      text: "test todo 3",
      completed: false,
      createDate: "2020-12-29T00:15:07.318+00:00",
    }

    // when
    jest.spyOn(api, "addTodo").mockImplementation(() => Promise.resolve(response))

    // then
    const result = await store.dispatch(actions.addTodo("test todo 3"))
    expect(result.type).toEqual(actions.ADD_TODO_SUCCESS)
    expect(result.response.result).toStrictEqual(3)
  })

  it("toggleTodo", async () => {
    // given
    const response = {
      id: 2,
      text: "test todo 2",
      completed: true,
      createDate: "2020-12-29T00:15:07.318+00:00",
    }
    // when
    jest.spyOn(api, "toggleTodo").mockImplementation(() => Promise.resolve(response))

    // then
    const result = await store.dispatch(actions.toggleTodo(2))
    expect(result.type).toEqual(actions.TOGGLE_TODO_SUCCESS)
    expect(result.response.result).toStrictEqual(2)
  })

  it("removeTodo", async () => {
    // given
    const response = {
      id: 2,
      text: "test todo 2",
      completed: true,
      createDate: "2020-12-29T00:15:07.318+00:00",
    }
    // when
    jest.spyOn(api, "removeTodo").mockImplementation(() => Promise.resolve(response))

    // then
    const result = await store.dispatch(actions.removeTodo(2))
    expect(result.type).toEqual(actions.REMOVE_TODO_SUCCESS)
    expect(result.response.result).toStrictEqual(2)
  })
})
