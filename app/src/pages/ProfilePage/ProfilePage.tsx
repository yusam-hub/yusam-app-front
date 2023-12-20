import React, {FC, memo} from 'react'
import { Group, NavIdProps, Panel} from "@vkontakte/vkui";

import './ProfilePage.css'

export const ProfilePage: FC<NavIdProps> = memo((props: NavIdProps) => {

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <Group className="ProfilePage">



      </Group>
    </Panel>
  )
})

ProfilePage.displayName = 'ProfilePage'