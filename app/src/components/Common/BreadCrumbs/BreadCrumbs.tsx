import './BreadCrumbs.css'
import React, {FC, memo} from "react";
import {
  Card, CardGrid, CellButton, HorizontalCell, HorizontalScroll,
  NavIdProps,
  Spacing, Spinner
} from "@vkontakte/vkui";
import {useTranslation} from "react-i18next";

export const BreadCrumbs: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { t} = useTranslation()

  const data: any[] = [];

  for(let i=1; i <= 20; i++) {
    data.push({
      id: 'id_' + i,
      title: 'Bread Crumb ' + i
    })
  }

  return (
    <Card mode="outline" style={{padding: 10, margin: 10, fontSize: 10}}>
      {
        data.map(({ id, title }) => (
          <button key={id}>{title}</button>
        ))
      }

    </Card>
  )
})

BreadCrumbs.displayName = 'BreadCrumbs'