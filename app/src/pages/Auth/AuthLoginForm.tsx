import './AuthLoginForm.css'
import React, {FC, memo} from 'react'
import {
  Button, Card,
  FormItem,
  FormLayout,
  FormStatus,
  Group, Header,
  Input,
  NavIdProps,
  Panel, PullToRefresh, usePlatform,
} from '@vkontakte/vkui'
import { useAppDispatch } from "../../store";
import { setIsAuthorized } from "../../store/auth.reducer";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { AppRoutePath } from "../../routes";
import { IFormErrors, LocalesEnum } from "../../types";
import { SpinnerPopoutWrapper } from "../../popups/SpinnerPopoutWrapper";
import { useTranslation } from "react-i18next";
import { SelectRadioGroup } from "../../popups/Wrapper/SelectRadioGroup";
import { useSelector } from "react-redux";
import { selectAppLocale, setAppLocale } from "../../store/app.reducer";


export const AuthLoginForm: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()
  const { t} = useTranslation()
  const platform = usePlatform()
  const appLocale: string = useSelector(selectAppLocale)
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
              <SelectRadioGroup
                radioItems={[
                  {
                    id: LocalesEnum.EN,
                    title : t('LOCALE_'+LocalesEnum.EN.toUpperCase()),
                    defaultChecked: appLocale === LocalesEnum.EN
                  },
                  {
                    id: LocalesEnum.RU,
                    title : t('LOCALE_'+LocalesEnum.RU.toUpperCase()),
                    defaultChecked: appLocale === LocalesEnum.RU
                  },
                ]}
                onSelectValue={(value: string)=>{
                  dispatch(setAppLocale(value));
                  void routeNavigator.hidePopout();
                }}
              />
            );
          }}>
            {t('LOCALE_'+appLocale.toUpperCase())}
          </Button>}>
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
