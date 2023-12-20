import React, {FC, memo} from 'react'
import {CellButton, Group, NavIdProps, Panel} from "@vkontakte/vkui";
import {useAppDispatch} from "../../store";
import './MenuPage.css'
import {LeftMenu} from "../../components/Common/LeftMenu/LeftMenu";

export const MenuPage: FC<NavIdProps> = memo((props: NavIdProps) => {

  const data: any[] = [];

  for(let i=1; i <= 1000; i++) {
    data.push({
      id: 'id_' + i,
      title: 'Home Page ' + i
    })
  }

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="MenuPage">

        <LeftMenu/>

      </Group>
    </Panel>
  )
})

MenuPage.displayName = 'MenuPage'