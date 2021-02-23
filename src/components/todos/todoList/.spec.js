import { shallow } from "enzyme"
import { TodoList } from "components"
import { findByTestAttr, checkProps } from "utils"

const setup = (props = {}) => {
  const component = shallow(<TodoList {...props} />)
  return component
}

describe("TodoList Component", () => {
  describe("Checking propTypes", () => {
    it("Should not throw a waring", () => {
      const expectedProps = { data: [] }
      const propErr = checkProps(TodoList, expectedProps)
      expect(propErr).toBeUndefined()
    })
    it("Should throw a waring", () => {
      const expectedProps = { data: {} }
      const propErr = checkProps(TodoList, expectedProps)
      expect(propErr).not.toBeUndefined()
    })
  })
  describe("Have No props", () => {
    let component
    beforeEach(() => {
      component = setup()
    })
    it("Should render without error", () => {
      const wrapper = findByTestAttr(component, "todoListComponent")
      //   console.log(wrapper.debug())
      expect(wrapper).toHaveLength(1)
    })
    it("Should render a empty listItem", () => {
      const emptyListItem = findByTestAttr(component, "componentEmpty")
      //   console.log(emptyListItem.debug())
      //   console.log(emptyListItem.children().debug())
      expect(emptyListItem).toHaveLength(1)
      expect(emptyListItem.children().text()).toBe("할 일을 등록해주세요")
    })
  })

  describe("Have props", () => {
    let component
    beforeEach(() => {
      const props = {
        data: [
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
        ],
      }
      component = setup(props)
    })
    it("Should render without error", () => {
      const wrapper = findByTestAttr(component, "todoListComponent")
      expect(wrapper).toHaveLength(1)
    })
    it("Should render listItems", () => {
      const wrapper = findByTestAttr(component, "todoListComponent")
      expect(wrapper.children().length).toBe(2)
      //   console.log(wrapper.children().at(0).debug())
      expect(wrapper.children().at(0).props().text).toBe("test todo 1")
    })
  })
})
