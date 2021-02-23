import todosReducers, { getVisibleTodos, getIsFetching } from "reducers/todos"
import * as actions from "actions/todos"
import { normalize } from "normalizr"
import * as schema from "actions/schema"

describe("todos reducers", () => {
  describe("initialState", () => {
    it("Should render default state", () => {
      // given
      const prevState = undefined
      const action = {}
      // when
      const newState = todosReducers(prevState, action)
      //   console.log(newState)
      // then
      const expectedState = {
        byId: {},
        listByFilter: {
          active: { errorMessage: null, ids: [], isFetching: false },
          all: { errorMessage: null, ids: [], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      expect(newState).toStrictEqual(expectedState)
    })
  })
  describe("fetchTodos", () => {
    it("FETCH_TODOS_REQUEST", () => {
      // given
      const filter = "all"
      const prevState = undefined
      // when
      const newState = todosReducers(prevState, {
        type: actions.FETCH_TODOS_REQUEST,
        filter,
      })
      // then
      const expectedState = {
        byId: {},
        listByFilter: {
          active: { errorMessage: null, ids: [], isFetching: false },
          all: { errorMessage: null, ids: [], isFetching: true },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      expect(newState).toStrictEqual(expectedState)
    })

    it("FETCH_TODOS_SUCCESS", () => {
      // given
      const prevState = undefined
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
      // when
      const newState = todosReducers(prevState, {
        type: actions.FETCH_TODOS_SUCCESS,
        filter,
        response: normalize(response, schema.arrayOfTodo),
      })
      // then
      // 요청한 filter에 데이터만 쌓이는 버그
      const expectedState = {
        byId: {
          1: {
            completed: false,
            createDate: "2020-12-29T00:15:07.318+00:00",
            id: 1,
            text: "test todo 1",
          },
          2: {
            completed: false,
            createDate: "2020-12-29T04:45:55.780+00:00",
            id: 2,
            text: "test todo 2",
          },
        },
        listByFilter: {
          active: { errorMessage: null, ids: [1, 2], isFetching: false },
          all: { errorMessage: null, ids: [1, 2], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      expect(newState).toStrictEqual(expectedState)
    })

    it("FETCH_TODOS_FAILURE", () => {
      // given
      const prevState = undefined
      const filter = "all"
      const error = { message: "Error Message." }
      // when
      const newState = todosReducers(prevState, {
        type: actions.FETCH_TODOS_FAILURE,
        filter,
        message: error ? error.message : "Something went wrong.",
      })
      // then
      const expectedState = {
        byId: {},
        listByFilter: {
          active: { errorMessage: null, ids: [], isFetching: false },
          all: { errorMessage: "Error Message.", ids: [], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      expect(newState).toStrictEqual(expectedState)
    })
  })

  describe("addTodo", () => {
    it("ADD_TODO_SUCCESS", () => {
      // given
      const prevState = undefined
      const response = {
        id: 1,
        text: "test todo 1",
        completed: false,
        createDate: "2020-12-29T00:15:07.318+00:00",
      }
      // when
      const newState = todosReducers(prevState, {
        type: actions.ADD_TODO_SUCCESS,
        response: normalize(response, schema.todo),
      })
      // then
      const expectedState = {
        byId: {
          1: {
            ...response,
          },
        },
        listByFilter: {
          active: { errorMessage: null, ids: [1], isFetching: false },
          all: { errorMessage: null, ids: [1], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      expect(newState).toEqual(expectedState)
    })
  })

  describe("removeTodo", () => {
    it("REMOVE_TODO_SUCCESS", () => {
      // given
      const prevState = {
        byId: {
          1: {
            id: 1,
            text: "test todo 1",
            completed: false,
            createDate: "2020-12-29T00:15:07.318+00:00",
          },
          2: {
            id: 2,
            text: "test todo 2",
            completed: false,
            createDate: "2020-12-29T04:45:55.780+00:00",
          },
        },
        listByFilter: {
          active: { errorMessage: null, ids: [1, 2], isFetching: false },
          all: { errorMessage: null, ids: [1, 2], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      const response = {
        id: 1,
        text: "test todo 1",
        completed: false,
        createDate: "2020-12-29T00:15:07.318+00:00",
      }
      // when
      const newState = todosReducers(prevState, {
        type: actions.REMOVE_TODO_SUCCESS,
        response: normalize(response, schema.todo),
      })
      // then
      const expectedState = {
        byId: {
          1: {
            id: 1,
            text: "test todo 1",
            completed: false,
            createDate: "2020-12-29T00:15:07.318+00:00",
          },
          2: {
            id: 2,
            text: "test todo 2",
            completed: false,
            createDate: "2020-12-29T04:45:55.780+00:00",
          },
        },
        listByFilter: {
          active: { errorMessage: null, ids: [2], isFetching: false },
          all: { errorMessage: null, ids: [2], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      expect(newState).toEqual(expectedState)
    })
  })

  describe("toggleTodo", () => {
    describe("TOGGLE_TODO_SUCCESS", () => {
      it("To do complete, (from false to true)", () => {
        // given
        const prevState = {
          byId: {
            1: {
              id: 1,
              text: "test todo 1",
              completed: false,
              createDate: "2020-12-29T00:15:07.318+00:00",
            },
            2: {
              id: 2,
              text: "test todo 2",
              completed: false,
              createDate: "2020-12-29T04:45:55.780+00:00",
            },
          },
          listByFilter: {
            active: { errorMessage: null, ids: [1, 2], isFetching: false },
            all: { errorMessage: null, ids: [1, 2], isFetching: false },
            completed: { errorMessage: null, ids: [], isFetching: false },
          },
        }
        const response = {
          id: 1,
          text: "test todo 1",
          completed: true,
          createDate: "2020-12-29T00:15:07.318+00:00",
        }
        // when
        const newState = todosReducers(prevState, {
          type: actions.TOGGLE_TODO_SUCCESS,
          id: 1,
          response: normalize(response, schema.todo),
        })
        // then
        const expectedState = {
          byId: {
            1: {
              id: 1,
              text: "test todo 1",
              completed: true,
              createDate: "2020-12-29T00:15:07.318+00:00",
            },
            2: {
              id: 2,
              text: "test todo 2",
              completed: false,
              createDate: "2020-12-29T04:45:55.780+00:00",
            },
          },
          listByFilter: {
            active: { errorMessage: null, ids: [2], isFetching: false },
            all: { errorMessage: null, ids: [1, 2], isFetching: false },
            completed: { errorMessage: null, ids: [1], isFetching: false },
          },
        }
        expect(newState).toEqual(expectedState)
      })

      it("Not complete to do, (from true to false)", () => {
        // given
        const prevState = {
          byId: {
            1: {
              id: 1,
              text: "test todo 1",
              completed: true,
              createDate: "2020-12-29T00:15:07.318+00:00",
            },
            2: {
              id: 2,
              text: "test todo 2",
              completed: false,
              createDate: "2020-12-29T04:45:55.780+00:00",
            },
          },
          listByFilter: {
            active: { errorMessage: null, ids: [2], isFetching: false },
            all: { errorMessage: null, ids: [1, 2], isFetching: false },
            completed: { errorMessage: null, ids: [1], isFetching: false },
          },
        }
        const response = {
          id: 1,
          text: "test todo 1",
          completed: false,
          createDate: "2020-12-29T00:15:07.318+00:00",
        }
        // when
        const newState = todosReducers(prevState, {
          type: actions.TOGGLE_TODO_SUCCESS,
          id: 1,
          response: normalize(response, schema.todo),
        })
        // then
        const expectedState = {
          byId: {
            1: {
              id: 1,
              text: "test todo 1",
              completed: false,
              createDate: "2020-12-29T00:15:07.318+00:00",
            },
            2: {
              id: 2,
              text: "test todo 2",
              completed: false,
              createDate: "2020-12-29T04:45:55.780+00:00",
            },
          },
          listByFilter: {
            active: { errorMessage: null, ids: [1, 2], isFetching: false },
            all: { errorMessage: null, ids: [1, 2], isFetching: false },
            completed: { errorMessage: null, ids: [], isFetching: false },
          },
        }
        expect(newState).toEqual(expectedState)
      })
    })
  })
  describe("useSelector", () => {
    it("getIsFetching", () => {
      // given
      const prevState = {
        byId: {
          1: {
            id: 1,
            text: "test todo 1",
            completed: false,
            createDate: "2020-12-29T00:15:07.318+00:00",
          },
          2: {
            id: 2,
            text: "test todo 2",
            completed: false,
            createDate: "2020-12-29T04:45:55.780+00:00",
          },
        },
        listByFilter: {
          active: { errorMessage: null, ids: [1, 2], isFetching: true },
          all: { errorMessage: null, ids: [1, 2], isFetching: false },
          completed: { errorMessage: null, ids: [], isFetching: false },
        },
      }
      // when
      const newState = todosReducers(prevState, {}) // 생략 가능
      // then
      const isAllFetching = getIsFetching({ todos: newState }, "all")
      expect(isAllFetching).toBe(false)
      const isActiveFetching = getIsFetching({ todos: newState }, "active")
      expect(isActiveFetching).toBe(true)
      const isCompletedFetching = getIsFetching({ todos: newState }, "completed")
      expect(isCompletedFetching).toBe(false)
    })

    it("getVisibleTodos", () => {
      // given
      const prevState = {
        byId: {
          1: {
            id: 1,
            text: "test todo 1",
            completed: false,
            createDate: "2020-12-29T00:15:07.318+00:00",
          },
          2: {
            id: 2,
            text: "test todo 2",
            completed: false,
            createDate: "2020-12-29T04:45:55.780+00:00",
          },
        },
        listByFilter: {
          active: { errorMessage: null, ids: [2], isFetching: true },
          all: { errorMessage: null, ids: [1, 2], isFetching: false },
          completed: { errorMessage: null, ids: [1], isFetching: false },
        },
      }
      // when
      const newState = todosReducers(prevState, {}) // 생략 가능
      // then
      const allTodos = getVisibleTodos({ todos: newState }, "all")
      expect(allTodos.length).toEqual(2)
      const activeTodos = getVisibleTodos({ todos: newState }, "active")
      expect(activeTodos.length).toEqual(1)
      const completedTodos = getVisibleTodos({ todos: newState }, "completed")
      expect(completedTodos.length).toEqual(1)
    })
  })
})
