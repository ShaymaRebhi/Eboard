import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const friendOptions = [
  {
    key: 1,
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png' },
  },{
      key:2,
      text:'Profile'
  }
]

const DropdownExampleInline = () => (
  <span>
   
    <Dropdown
      inline
      direction='left'
      options={friendOptions}
      defaultValue={friendOptions[0].value}
    />
  </span>
)

export default DropdownExampleInline