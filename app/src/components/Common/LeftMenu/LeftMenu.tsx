import './LeftMenu.css'
import React, {FC, memo} from "react";
import {
  CellButton,
  Group,
  NavIdProps,
} from "@vkontakte/vkui";

export const LeftMenu: FC<NavIdProps> = memo((props: NavIdProps) => {

  const data: any[] = [];

  for(let i=1; i <= 100; i++) {
    data.push({
      id: 'id_' + i,
      title: 'Left Menu ' + i
    })
  }

  return (
    <Group className="LeftMenu" {...props}>

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
  )
})

LeftMenu.displayName = 'LeftMenu'