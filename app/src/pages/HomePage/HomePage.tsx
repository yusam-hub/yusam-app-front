import React, {FC, memo} from 'react'
import {CellButton, Group, NavIdProps, Panel} from "@vkontakte/vkui";
import {useAppDispatch} from "../../store";
import './HomePage.css'

export const HomePage: FC<NavIdProps> = memo((props: NavIdProps) => {

  const data: any[] = [];

  for(let i=1; i <= 1000; i++) {
    data.push({
      id: 'id_' + i,
      title: 'Home Page ' + i
    })
  }

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="HomePage">

        {
          data.map(({ id, title }) => (
            <CellButton
              key={id}
              multiline={true}
              onClick={() => {
                console.log("test")
              }}
            >
              {title}
            </CellButton>
          ))
        }

      </Group>
    </Panel>
  )
})

HomePage.displayName = 'HomePage'