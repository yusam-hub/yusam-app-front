import React, {FC, memo} from 'react'
import {NavIdProps, Panel} from "@vkontakte/vkui";
import {useAppDispatch} from "../../store";
import './HomePage.css'

export const HomePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const dispatch = useAppDispatch()

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className={'HomePage'}>


      </div>
    </Panel>
  )
})

HomePage.displayName = 'HomePage'