import React, {FC, memo} from 'react'
import {NavIdProps, Panel} from "@vkontakte/vkui";
import {useAppDispatch} from "../../store";
import './Home.css'
export const Home: FC<NavIdProps> = memo((props: NavIdProps) => {
  const dispatch = useAppDispatch()

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className={'Home'}>


      </div>
    </Panel>
  )
})

Home.displayName = 'Home'