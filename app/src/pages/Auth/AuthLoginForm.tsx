import React, { FC, memo } from 'react'
import {
  Button,
  CellButton,
  Checkbox,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group, Header,
  Input,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  SegmentedControl,
  Select,
  Textarea,
  useAdaptivityWithJSMediaQueries
} from '@vkontakte/vkui'

/**
 * CSS IMPORT
 */
import './AuthLoginForm.css'
import {Filters} from "../../components";

export const AuthLoginForm: FC<NavIdProps> = memo((props: NavIdProps) => {

  const { isDesktop } = useAdaptivityWithJSMediaQueries()
  const [ userEmail, setUserEmail] = React.useState('')
  const [ userPass, setUserPass] = React.useState('')

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className="AuthLoginFormCenter">
        <Group mode="card">
          <>
            <Header>Авторизация</Header>
          </>
            <FormLayout>
                <FormItem
                    htmlFor="email"
                    top="E-mail"
                    status={userEmail ? 'valid' : 'error'}
                    bottom={
                      userEmail ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'
                    }
                    bottomId="email-type"
                >
                    <Input
                        aria-labelledby="email-type"
                        id="userEmail"
                        type="email"
                        defaultValue={userEmail}
                        onChange={(event) => {
                          setUserEmail(event.currentTarget.value);
                        }}
                    />
                </FormItem>

                <FormItem
                    top="Пароль"
                    bottom="Пароль может содержать только латинские буквы и цифры."
                    bottomId="userPassDescription"
                >
                    <Input
                        id="userPass"
                        type="password"
                        placeholder="введите пароль"
                        aria-labelledby="userPassDescription"
                        onChange={(event) => {
                          setUserPass(event.currentTarget.value);
                        }}
                    />
                </FormItem>
                <FormItem>
                    <Button
                      size="l"
                      stretched
                      onClick={() => {
                        console.log(userEmail, userPass);
                      }}
                    >
                        Войти
                    </Button>
                </FormItem>
            </FormLayout>
        </Group>
      </div>
    </Panel>
  )
})

AuthLoginForm.displayName = 'AuthLoginForm'
