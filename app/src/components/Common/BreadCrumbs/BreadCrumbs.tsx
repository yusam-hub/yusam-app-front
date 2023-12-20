import './BreadCrumbs.css'
import React, {FC, memo} from "react";
import {
  Card, CardGrid, HorizontalCell, HorizontalScroll,
  NavIdProps,
  Spacing, Spinner
} from "@vkontakte/vkui";
import {useTranslation} from "react-i18next";

export const BreadCrumbs: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { t} = useTranslation()

  return (
    <Card mode="outline" style={{padding: 10, margin: 10, fontSize: 10}}>
      <HorizontalScroll>
        <div style={{ display: 'flex' }}>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
          <HorizontalCell
            onClick={() => {
              console.log("test")
            }}
            key={'test1'}
            size="s"
            header={'header'}
            subtitle={`subtitle`}
          >
            <img width={100} height={0} src="#" alt={''}/>
          </HorizontalCell>
        </div>
      </HorizontalScroll>

    </Card>
  )
})

BreadCrumbs.displayName = 'BreadCrumbs'