import React from "react"
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core"
import { ResponsiveLayout } from "components"
import theme from "components/elements/theme"

function GlobalThemeProvider({ children }) {
  const themeConfig = createMuiTheme(theme)
  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <ResponsiveLayout>{children}</ResponsiveLayout>
    </ThemeProvider>
  )
}

export default GlobalThemeProvider
