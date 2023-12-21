import './BreadCrumbs.css'
import React, {FC, memo} from "react";
import {
  NavIdProps,
} from "@vkontakte/vkui";
import {useTranslation} from "react-i18next";
import {Breadcrumb} from "antd";

export const BreadCrumbs: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { t} = useTranslation()

  return (
    <div style={{padding: 10, margin: 10, fontSize: 10}}>
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: <a href="#">Application Center</a>,
          },
          {
            title: <a href="#">Application List</a>,
          },
          {
            title: 'An Application',
          },
        ]}
      />

    </div>
  )
})

BreadCrumbs.displayName = 'BreadCrumbs'