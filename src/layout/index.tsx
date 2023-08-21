import Menu from "./Menu"
import Main from "./Main"
import { Routes, Route, Navigate } from "react-router"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { useLocation } from "react-router"
import { mainMenuRoutes } from "@/router/mainRouter"

export default function MainLayout() {
  const useLocationWrapper = () => useLocation()
  const location = useLocationWrapper()

  return (
    <div className="h-screen flex flex-col">
      <Menu></Menu>
      <Main>
        <TransitionGroup className="h-full overflow-hidden">
          <CSSTransition
            key={location.key}
            unmountOnExit
            timeout={1500}
            classNames="animate"
          >
            <Routes>
              {(
                mainMenuRoutes.map((router, index) => {
                  return <Route path={router.path} key={index} element={(router.Component as () => JSX.Element)()}></Route>
                })
              )}
              <Route path="/" element={<Navigate to='/Gpt/0'></Navigate>}></Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Main>
    </div>
  )
}

// const AnimatedSwitch = props => {
//   const { children } = props
//   return (
//       <Route
//           render={({ location }) => (
//               <TransitionGroup>
//                   <CSSTransition
//                       key={location.key}
//                       classNames={props.type || 'fade'} 
//                       timeout={props.duration || 300}
//                   >
//                       <Switch location={location}>{children}</Switch>
//                   </CSSTransition>
//               </TransitionGroup>
//           )}
//       />
//   )
// }