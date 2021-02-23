import { shallow } from "enzyme"
import { Header } from "components"
import { findByTestAttr, checkProps } from "utils"
import { Delete } from "@material-ui/icons"
// import checkPropTypes from "check-prop-types"

const setup = (props = {}) => {
  const component = shallow(<Header {...props} />)
  return component
}

describe("Header Component", () => {
  describe("Checking propTypes", () => {
    it("Should not throw a waring", () => {
      const expectedProps = {
        title: "Todos",
        leftMenu: <Delete />,
        rightMenu: "rightMenu",
      }
      //   const propErr = checkPropTypes(Header.propTypes, expectedProps, "props")
      const propErr = checkProps(Header, expectedProps)
      expect(propErr).toBeUndefined()
    })
    it("Should throw a waring", () => {
      const expectedProps = {
        title: 1,
        leftMenu: <Delete />,
        rightMenu: "rightMenu",
      }
      //   const propErr = checkPropTypes(Header.propTypes, expectedProps, "props")
      const propErr = checkProps(Header, expectedProps)
      expect(propErr).not.toBeUndefined()
    })
  })
  describe("Have No props", () => {
    let component
    beforeEach(() => {
      component = setup()
    })
    it("Should render without error", () => {
      const wrapper = findByTestAttr(component, "headerComponent")
      expect(wrapper).toHaveLength(1)
    })

    it("Should render the exact title", () => {
      const title = findByTestAttr(component, "componentTitle")
      expect(title.length).toBe(1)
      // console.log(title.children().debug())
      expect(title.children().text()).toBe("pageTitle")
    })

    it("Should not render a leftMenu", () => {
      const leftMenu = findByTestAttr(component, "componentLeftMenu")
      expect(leftMenu.length).toBe(0)
    })

    it("Should not render a rightMenu", () => {
      const rightMenu = findByTestAttr(component, "componentRightMenu")
      expect(rightMenu.length).toBe(0)
    })
  })
  describe("Have props", () => {
    let component
    beforeEach(() => {
      const props = {
        title: "Todos",
        leftMenu: <Delete />,
        rightMenu: "rightMenu",
      }
      component = setup(props)
    })
    it("Should render without error", () => {
      const wrapper = findByTestAttr(component, "headerComponent")
      expect(wrapper).toHaveLength(1)
    })

    it("Should render the exact title", () => {
      const title = findByTestAttr(component, "componentTitle")
      expect(title.length).toBe(1)
      // console.log(title.children().debug())
      expect(title.children().text()).toBe("Todos")
    })

    it("Should render a leftMenu", () => {
      const leftMenu = findByTestAttr(component, "componentLeftMenu")
      expect(leftMenu.length).toBe(1)
      //   console.log(leftMenu.debug())
      expect(leftMenu.exists(Delete)).toBe(true)
    })

    it("Should render a rightMenu", () => {
      const rightMenu = findByTestAttr(component, "componentRightMenu")
      expect(rightMenu.length).toBe(1)
    })
  })
})
