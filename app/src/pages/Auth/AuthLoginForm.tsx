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
import { AppRoutePathEnum } from "../../routes";
import { FormErrorsInterface, LocalesEnum } from "../../types";
import { SpinnerPopoutWrapper } from "../../popups/SpinnerPopoutWrapper";
import { useTranslation } from "react-i18next";
import { SelectRadioGroup } from "../../popups/Wrapper/SelectRadioGroup";
import { useSelector } from "react-redux";
import { selectAppLocale, setAppLocale } from "../../store/app.reducer";
import { glob_in_enum } from "../../globFuncs";


export const AuthLoginForm: FC<NavIdProps> = memo((props: NavIdProps) => {

  /**
   * GLOBAL CONST
   */
  const dispatch = useAppDispatch()
  const routeNavigator = useRouteNavigator()
  const { t} = useTranslation()
  const appLocale: string = useSelector(selectAppLocale)

  /**
   * LOCAL CONST
   */
  const [ formErrors, setFormErrors] = React.useState<FormErrorsInterface>( {
    errorMessage: '',
    errorFields: {},
  })
  const [ pullToRefreshIsFetching, setPullToRefreshIsFetching ] = React.useState<boolean>(false);
  const [ controlDisabled, setControlDisabled] = React.useState<boolean>(false)
  const [ userEmail, setUserEmail] = React.useState('admin')
  const [ userPass, setUserPass] = React.useState('Qwertyu1')

  const onSelectValue = (value: string) => {
    if (glob_in_enum(value, LocalesEnum)) {
      dispatch(setAppLocale(value));
      void routeNavigator.hidePopout();
    }
  }

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
            void routeNavigator.showPopout(
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
                onSelectValue={onSelectValue}
              />
            );
          }}>
            {t('LOCALE_NAME')}
          </Button>}>
            <Card
              mode="shadow"
            >
              {t('AUTH_LOGIN_FORM_HEADER')}
            </Card>
          </Header>
        </Group>
        <Group mode="card">
          <FormLayout>
            {formErrors.errorMessage &&
              (
                <FormStatus header={t('COMMON_ERROR_IN_FORM')} mode="error">
                  {t(formErrors.errorMessage)}
                </FormStatus>
              )
            }
            <FormItem
              htmlFor="email"
              top={t('FIELD_EMAIL')}
              status={formErrors.errorFields?.userEmail ? 'error' : 'valid'}
              bottomId="email-type"
              bottom={formErrors.errorFields?.userEmail ? t(formErrors.errorFields.userEmail) : t('FIELD_EMAIL_HELPER')}
            >
              <Input
                disabled={controlDisabled}
                aria-labelledby="email-type"
                id="userEmail"
                type="email"
                defaultValue={userEmail}
                placeholder={t('FIELD_EMAIL_PLACEHOLDER')}
                onChange={(event) => {
                  setUserEmail(event.currentTarget.value);
                }}
              />
            </FormItem>
            <FormItem
              top={t('FIELD_PASS')}
              status={formErrors.errorFields?.userPass ? 'error' : 'valid'}
              bottomId="userPassDescription"
              bottom={formErrors.errorFields?.userPass ? t(formErrors.errorFields.userPass) : t('FIELD_PASS_HELPER')}
            >
              <Input
                disabled={controlDisabled}
                id="userPass"
                type="password"
                placeholder={t('FIELD_PASS_PLACEHOLDER')}
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
                    errorMessage: undefined,
                    errorFields: {},
                  });

                  setTimeout(function(){
                    if (userEmail === 'admin' && userPass === 'Qwertyu1') {

                      dispatch(setIsAuthorized(true))
                      void routeNavigator.push(AppRoutePathEnum.PrivateHome);

                    } else {

                      setControlDisabled(false);
                      void routeNavigator.hidePopout();

                      setFormErrors({
                        errorMessage: 'AUTH_LOGIN_FORM_HEADER_ERROR_VALUE',
                        errorFields: {
                          'userEmail' : 'COMMON_INVALID_VALUE',
                          'userPass' : 'COMMON_INVALID_VALUE'
                        },
                      });

                    }
                  }, 2000);

                }}
              >
                {t('COMMON_BUTTON_LOGIN')}
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
