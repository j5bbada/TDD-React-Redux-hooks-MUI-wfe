import React from "react"
import { mount } from "enzyme"
import { TodoForm } from "components"
import { Provider } from "react-redux"
import configureStore, { history } from "stores"
import { act, renderHook } from "@testing-library/react-hooks"
import { useAddTodoForm } from "."
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import api from "apis/todo.api"
import * as actions from "actions/todos"

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

const setUp = (initialState = {}, props) => {
  const store = configureStore(initialState)
  const component = mount(
    <Provider store={store} history={history}>
      <TodoForm {...props} />
    </Provider>
  )
  return component
}

describe("AddTodoForm Components", () => {
  describe("Renders", () => {
    let wrapper
    beforeEach(() => {
      const props = { onSubmit: () => {} }
      wrapper = setUp({}, props)
    })

    it("Should render a TodoForm without errors", () => {
      //   console.log(wrapper.debug())
      const component = wrapper.find(TodoForm)
      expect(component).toHaveLength(1)
    })
  })
  describe("Methods", () => {
    beforeEach(() => {
      store.clearActions()
    })

    it("Execute dispatch(addTodo(value)) when calling handleSubmit Method", async () => {
      /**
       * hooks 사용한 container component 는
       * setUp 에 Provider 추가
       * Method 테스트는 "Step17. Methods" 에서 자세히 다루겠습니다
       */
      //given
      const response = {
        id: 3,
        text: "test todo 3",
        completed: false,
        createDate: "2020-12-29T00:15:07.318+00:00",
      }
      jest.spyOn(api, "addTodo").mockImplementation(() => Promise.resolve(response))
      const { result } = renderHook(() => useAddTodoForm(store.dispatch))

      // when
      await act(async () => await result.current.handleSubmit("submit todo"))

      // then
      const actionResult = store.getActions()
      //   console.log(actionResult)
      expect(actionResult[0].type).toEqual(actions.ADD_TODO_SUCCESS)
      expect(actionResult[0].text).toBe("submit todo")
    })
  })
})
