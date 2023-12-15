import React, { FC, memo } from 'react'
import {
  NavIdProps,
  Panel,
} from '@vkontakte/vkui'

/**
 * CSS IMPORT
 */
import './Login.css'

export const Login: FC<NavIdProps> = memo((props: NavIdProps) => {

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <div className={'Login'}>
        Login
      </div>
    </Panel>
  )
})

Login.displayName = 'Login'
