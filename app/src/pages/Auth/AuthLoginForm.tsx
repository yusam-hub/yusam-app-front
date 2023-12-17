import './AuthLoginForm.css'
import React, {FC, memo, useEffect} from 'react'
import {
  Button, Card,
  FormItem,
  FormLayout,
  FormStatus,
  Group, Header,
  Input,
  NavIdProps,
  Panel, PopoutWrapper, PullToRefresh, Spacing, Spinner,
  useAdaptivityWithJSMediaQueries
} from '@vkontakte/vkui'
import { useAppDispatch } from "../../store";
import { setIsAuthorized } from "../../store/auth.reducer";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { AppRoutePath } from "../../routes";
import { IFormErrors } from "../../types";
import { SpinnerPopoutWrapper } from "../../popups/SpinnerPopoutWrapper";
import { useTranslation } from "react-i18next";
import {BasePopoutWrapper, BasePopoutWrapperProps} from "../../components/React/Popout/Wrapper/BasePopoutWrapper";
import {MessageInfoPopoutWrapper} from "../../components/React/Popout/Wrapper/MessageInfoPopoutWrapper";


export const AuthLoginForm: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()
  const { t} = useTranslation();

  /**
   * LOCAL CONST
   */
  const [ formErrors, setFormErrors] = React.useState<IFormErrors>( {
    errorMessage: '',
    errorFields: {},
  })
  const [ pullToRefreshIsFetching, setPullToRefreshIsFetching ] = React.useState<boolean>(false);
  const [ controlDisabled, setControlDisabled] = React.useState<boolean>(false)
  const [ userEmail, setUserEmail] = React.useState('admin')
  const [ userPass, setUserPass] = React.useState('Qwertyu1')

  /**
   * RETURN CONTENT
   */
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PullToRefresh onRefresh={() => {
        setPullToRefreshIsFetching(true);

        setTimeout(function (){

          setPullToRefreshIsFetching(false);
          window.location.reload();

        }, 1000);

      }} isFetching={pullToRefreshIsFetching}>
      <div className="AuthLoginFormCenter">
        <Group mode="card">
          <Header className="AuthLoginHeader" aside={<Button mode={"tertiary"} onClick={() => {
            routeNavigator.showPopout(
              <MessageInfoPopoutWrapper
                message="TEST"
              />
            );
          }}>Lang</Button>}>
            <Card
              mode="shadow"
            >
              {t('AuthLoginForm.header')}
            </Card>
          </Header>
        </Group>
        <Group mode="card">
          <FormLayout>
            {formErrors.errorMessage &&
              (
                <FormStatus header={t('form.formStatusHeader.errorInForm')} mode="error">
                  {formErrors.errorMessage}
                </FormStatus>
              )
            }
            <FormItem
              htmlFor="email"
              top={t('AuthLoginForm.fieldEmailTop')}
              status={formErrors.errorFields?.userEmail ? 'error' : 'valid'}
              bottomId="email-type"
              bottom={formErrors.errorFields?.userEmail ??  t('AuthLoginForm.fieldEmailBottom')}
            >
              <Input
                disabled={controlDisabled}
                aria-labelledby="email-type"
                id="userEmail"
                type="email"
                defaultValue={userEmail}
                placeholder={t('AuthLoginForm.fieldEmailPlaceHolder')}
                onChange={(event) => {
                  setUserEmail(event.currentTarget.value);
                }}
              />
            </FormItem>
            <FormItem
              top={t('AuthLoginForm.fieldPassTop')}
              status={formErrors.errorFields?.userPass ? 'error' : 'valid'}
              bottomId="userPassDescription"
              bottom={formErrors.errorFields?.userPass ?? t('AuthLoginForm.fieldPassBottom')}
            >
              <Input
                disabled={controlDisabled}
                id="userPass"
                type="password"
                placeholder={t('AuthLoginForm.fieldPassPlaceHolder')}
                aria-labelledby="userPassDescription"
                onChange={(event) => {
                  setUserPass(event.currentTarget.value);
                }}
              />
            </FormItem>
            <FormItem>
              <Button
                mode={controlDisabled ? 'secondary' : 'primary'}
                disabled={controlDisabled}
                size="l"
                stretched
                onClick={() =>
                {
                  void routeNavigator.showPopout(
                    <SpinnerPopoutWrapper/>
                  );
                  setControlDisabled(true);

                  setFormErrors({
                    errorMessage: '',
                    errorFields: {},
                  });

                  setTimeout(function(){
                    if (userEmail === 'admin' && userPass === 'Qwertyu1') {

                      dispatch(setIsAuthorized(true))
                      void routeNavigator.push(AppRoutePath.PrivateHome);

                    } else {

                      setControlDisabled(false);
                      void routeNavigator.hidePopout();

                      setFormErrors({
                        errorMessage: t('AuthLoginForm.form.formStatusHeader.value'),
                        errorFields: {
                          'userEmail' : t('form.field.invalidValue'),
                          'userPass' : t('form.field.invalidValue')
                        },
                      });

                    }
                  }, 2000);

                }}
              >
                {t('AuthLoginForm.buttonLogin')}
              </Button>
            </FormItem>
          </FormLayout>
        </Group>
      </div>
      </PullToRefresh>
    </Panel>
  )
})

AuthLoginForm.displayName = 'AuthLoginForm'
