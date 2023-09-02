import Menu from "./Menu"
import Main from "./Main"
import { useMatches, useOutlet } from "react-router"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { mainMenuRoutes } from "@/router/mainRouter"

export default function MainLayout() {
  const matches = useMatches()
  const matche = matches.find(matche => {
    return mainMenuRoutes.some(router => {
      return matche.pathname === '/main/' + router.path
    })
  })
  const currentOutlet = useOutlet()
  
  return (
    <div className="h-screen flex flex-col">
      <Menu></Menu>
      <Main>
        <SwitchTransition>
          <CSSTransition
            key={matche?.pathname}
            appear
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {() => (
              <div className="h-full">
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Main>
    </div>
  )
}