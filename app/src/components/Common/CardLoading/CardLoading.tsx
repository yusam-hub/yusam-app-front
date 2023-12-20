import './CardLoading.css'
import React, {FC, memo} from "react";
import {
  Card,
  NavIdProps,
  Spacing, Spinner
} from "@vkontakte/vkui";
import {useTranslation} from "react-i18next";

export const CardLoading: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { t} = useTranslation()

  return (
    <Card mode="outline-tint" className={'CardLoading'}>
      <Spinner size="large"/>
      <Spacing size={20}/>
      <div className={'message'}>{t("LOADING_PLEASE_WAIT")}<br/>{t("LOADING_DATA_IS_LOADING")}</div>
    </Card>
  )
})

CardLoading.displayName = 'CardLoading'