import { Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const getColumns = (

) => ([
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },

  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
  },

  {
    title: '',
    dataIndex: 'controls',
    key: 'controls',
    render: (_: any, row: any) => (
      <Space>
        <Button
          type='primary'
          danger
          shape='circle'
          icon={<DeleteOutlined />}
          onClick={() => {
            console.log("test")
            //setDeleteIdHandler(row.id)
            //showDeleteHandler()
          }}
        />
      </Space>
    ),
  },
])

export default getColumns
