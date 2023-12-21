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
import {CommonHeader} from "../../components/Common/CommonHeader/CommonHeader";
import {FilterForm} from "../../components/Common/FilterForm/FilterForm";
import {Button, Col, Row, Table} from "antd";
import getColumns from "./columns";
import {Icon20ListPlusOutline} from "@vkontakte/icons";

export const HomePage: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { isDesktop } = useAdaptivityWithJSMediaQueries()

  const dataSource: any[] = [
    {
      id: 1,
      title: 'title 1'
    },
    {
      id: 2,
      title: 'title 2'
    }
  ];

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="HomePage">
        <CommonHeader>Title of page</CommonHeader>

        <BreadCrumbs/>

        <FilterForm/>

        <Table
          dataSource={dataSource}
          columns={getColumns()}
          rowKey='id'
        />
      </Group>
    </Panel>
  )
})

HomePage.displayName = 'HomePage'