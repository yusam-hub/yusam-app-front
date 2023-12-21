import React, {FC, memo} from 'react'
import {
  Card,
  CellButton,
  Group, Header, InfoRow,
  NavIdProps,
  Panel, PanelHeader, Separator, Spacing, useAdaptivityWithJSMediaQueries,
} from "@vkontakte/vkui";

import './HomePage.css'
import {BreadCrumbs} from "../../components/Common/BreadCrumbs/BreadCrumbs";
import {DesktopHeader} from "../../components/Common/DesktopHeader/DesktopHeader";

export const HomePage: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { isDesktop } = useAdaptivityWithJSMediaQueries()

  const data: any[] = [];

  for(let i=1; i <= 10; i++) {
    data.push({
      id: 'id_' + i,
      title: 'Home Page ' + i
    })
  }

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="HomePage">
        {isDesktop && (
          <DesktopHeader>Title of page</DesktopHeader>
        )}
        {!isDesktop && (
          <PanelHeader>Title of page</PanelHeader>
        )}

        <BreadCrumbs/>


      </Group>
    </Panel>
  )
})

HomePage.displayName = 'HomePage'