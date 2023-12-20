import React, {FC, memo} from 'react'
import {
  Card,
  CellButton,
  Group,
  NavIdProps,
  Panel,
} from "@vkontakte/vkui";

import './HomePage.css'
import {BreadCrumbs} from "../../components/Common/BreadCrumbs/BreadCrumbs";

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
        <Card style={{backgroundColor: "lightgrey", padding: 10, margin: 10}}>
          Title of Page
        </Card>
        <BreadCrumbs/>
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