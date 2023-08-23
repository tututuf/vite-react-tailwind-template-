import Menu from "./Menu"
import Main from "./Main"
import { Outlet } from "react-router"
import { Fade } from "@mui/material"
// import { TransitionGroup, CSSTransition } from "react-transition-group"
// import { useLocation } from "react-router"

export default function MainLayout() {
  // const useLocationWrapper = () => useLocation()
  // const location = useLocationWrapper()
  
  return (
    <div className="h-screen flex flex-col">
      <Menu></Menu>
      <Main>
        <Fade>
          <Outlet></Outlet>
        </Fade>
        {/* <TransitionGroup className="h-full overflow-hidden">
          <CSSTransition
            key={location.key}
            unmountOnExit
            timeout={1500}
            classNames="animate"
          > */}
            
          {/* </CSSTransition>
        </TransitionGroup> */}
      </Main>
    </div>
  )
}