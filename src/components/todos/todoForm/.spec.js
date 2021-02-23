import { shallow } from "enzyme"
import { TodoForm } from "components"
import { TextField } from "components/elements"
import { findByTestAttr, checkProps } from "utils"
import { act, renderHook } from "@testing-library/react-hooks"
import { useTodoForm } from "."

const setUp = (props = {}) => {
  const component = shallow(<TodoForm {...props} />)
  return component
}

describe("TodoForm Component", () => {
  describe("Checking propTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        title: "todo title",
        onSubmit: () => {},
      }
      const propsErr = checkProps(TodoForm, expectedProps)
      expect(propsErr).toBeUndefined()
    })
  })
  describe("Renders", () => {
    describe("Have props", () => {
      let wrapper
      beforeEach(() => {
        const props = { title: "todo title", onSubmit: () => {} }
        wrapper = setUp(props)
      })

      it("Should render without errors", () => {
        const component = findByTestAttr(wrapper, "todoFormComponent")
        expect(component).toHaveLength(1)
      })

      it("Should render a input as 'todo title'", () => {
        const input = wrapper.find(TextField)
        expect(input).toHaveLength(1)
        expect(input.props().value).toBe("todo title")
        expect(input.props().placeholder).toBe("오늘의 할 일 적어보기")
      })

      it("Should render a update button", () => {
        // const button = wrapper.find(Button)
        const button = wrapper.find('[type="submit"]')
        expect(button).toHaveLength(1)
        expect(button.dive().text()).toEqual("Update Todo")
      })
    })

    describe("Have NO props", () => {
      let wrapper
      beforeEach(() => {
        const props = { onSubmit: () => {} }
        wrapper = setUp(props)
      })

      it("Should render without errors", () => {
        const component = findByTestAttr(wrapper, "todoFormComponent")
        expect(component).toHaveLength(1)
      })

      it("Should render a empty input", () => {
        const input = wrapper.find(TextField)
        expect(input).toHaveLength(1)
        expect(input.props().value).toBe("")
        expect(input.props().placeholder).toBe("오늘의 할 일 적어보기")
      })

      it("Should render a add button", () => {
        // const button = wrapper.find(Button)
        const button = wrapper.find('[type="submit"]')
        expect(button).toHaveLength(1)
        expect(button.dive().text()).toEqual("Add Todo")
      })
    })
  })
  describe("Simulate", () => {
    let wrapper
    let mockFunc
    beforeEach(() => {
      mockFunc = jest.fn()
      const props = { onSubmit: mockFunc }
      wrapper = setUp(props)
    })

    it("Should be reflected on changed input value", () => {
      let input = wrapper.find(TextField)
      //   console.log(input.props())
      input.simulate("change", {
        target: { name: "todo-title", value: "new todo" },
      })
      input = wrapper.find(TextField)
      //   console.log(input.debug())
      //   console.log(input.props())
      expect(input.props().value).toBe("new todo")
    })

    it("Should emit calllback in form submit event", () => {
      const input = wrapper.find(TextField)
      input.simulate("change", {
        target: { name: "todo-title", value: "new todo" },
      })
      const form = wrapper.find("form")
      form.simulate("submit", {
        preventDefault: () => {},
      })
      const callback = mockFunc.mock.calls.length
      expect(callback).toBe(1)
    })

    it("Initialize after submitting the form", () => {
      let input = wrapper.find(TextField)
      input.simulate("change", {
        target: { name: "todo-title", value: "new todo" },
      })
      const form = wrapper.find("form")
      form.simulate("submit", {
        preventDefault: () => {},
      })

      input = wrapper.find(TextField)
      expect(input).toHaveLength(1)
      expect(input.props().value).toBe("")

      const button = wrapper.find('[type="submit"]')
      expect(button.props().disabled).toBe(true)
    })
  })
  describe("Methods", () => {
    it("Have No props, Method should update value as expected", () => {
      const props = { onSubmit: () => {} }
      const { result } = renderHook(() => useTodoForm(props))
      //   console.log(result.current)
      const { isUpdateMode, isDisabled, value } = result.current
      expect(value).toBe("")
      expect(isUpdateMode).toBe(false)
      expect(isDisabled).toBe(true)
    })
    it("Have props, Method should update value as expected", () => {
      const props = { title: "todo1", onSubmit: () => {} }
      const { result } = renderHook(() => useTodoForm(props))
      const { isUpdateMode, isDisabled, value } = result.current
      expect(value).toBe("todo1")
      expect(isUpdateMode).toBe(true)
      expect(isDisabled).toBe(false)
    })
    it("handleChange Method should update value as expected", () => {
      const props = { onSubmit: () => {} }
      const { result } = renderHook(() => useTodoForm(props))
      const { handleChange, isDisabled } = result.current
      expect(isDisabled).toBe(true)
      act(() => {
        handleChange({ target: { value: "change todo" } })
      })
      expect(result.current.value).toBe("change todo")
      expect(result.current.isDisabled).toBe(false)
    })
    it("handleSubmit Method should update value as expected", () => {
      const props = { onSubmit: () => {} }
      const { result } = renderHook(() => useTodoForm(props))
      const { handleSubmit } = result.current
      act(() => {
        handleSubmit({ preventDefault: () => {} })
      })
      expect(result.current.value).toBe("")
      expect(result.current.isDisabled).toBe(true)
    })
  })
})
