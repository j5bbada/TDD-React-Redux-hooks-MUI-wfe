import { shallow } from "enzyme"
import { Nav } from "components"
import { List, ListItem } from "components/elements"
import { findByTestAttr } from "utils"

const setup = (props = {}) => {
  const component = shallow(<Nav {...props} />)
  return component
}

describe("Nav Component", () => {
  let component
  beforeEach(() => {
    component = setup()
  })
  it("Should render without errors using the classname", () => {
    // const component = shallow(<Nav />)
    // console.log(component.debug())
    const wrapper = component.find(".navComponent")
    expect(wrapper.length).toBe(1)
    expect(wrapper).toHaveLength(1)
  })
  it("Should render a List/ListItem Components using the classname", () => {
    // const component = shallow(<Nav />)
    expect(component.exists(List)).toBe(true)
    expect(component.exists(ListItem)).toBeTruthy
  })

  it("[recommend] Should render without errors using the data-test", () => {
    // const wrapper = component.find(`[data-test='${attr}']`)
    const wrapper = findByTestAttr(component, "navComponent")
    expect(wrapper.length).toBe(1)
  })

  it("[recommend] Should render a first listItem using the data-test", () => {
    const wrapper = findByTestAttr(component, "navComponent")
    const listItem = wrapper.childAt(0)
    expect(listItem.length).toBe(1)
    expect(listItem.props().to).toEqual("/about")
  })
})
