import Menu from "./Menu"
import Main from "./Main"
import { Suspense } from "react"
import { Route, Routes } from "react-router"
import { mainMenuRoutes } from "@/router/mainRouter"


export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Menu></Menu>
      <Main>
        <Suspense>
          <Routes>
            {
              mainMenuRoutes.map((route, index) => {
                return (
                  <Route path={route.path} element={ (route.Component as () => JSX.Element)() } key={index}>
                  </Route>
                )
              })
            }
          </Routes>
        </Suspense>

        
        {/* <Suspense>
          <SwitchTransition mode="out-in">
            <CSSTransition key={location.href} timeout={300} classNames="fade" nodeRef={null}>
              <Outlet></Outlet>
            </CSSTransition>
          </SwitchTransition>
        </Suspense> */}
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