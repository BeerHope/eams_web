/* 公共下拉提取为字典 */

/* 绑定状态，标识生产状态 */
/* 暂时没有解绑操作，因此暂时屏蔽解绑状态 */
export const bindStates = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 1,
    label: '绑定'
  },
  {
    value: 2,
    label: '未绑定'
  }
]

/* 工单状态 */
export const orderStates = [
  {
    value: '',
    label: '全部状态'
  },
  {
    value: 0,
    label: '未生效'
  },
  {
    value: 1,
    label: '未开始'
  },
  {
    value: 2,
    label: '进行中'
  },
  {
    value: 3,
    label: '已完成'
  },
  {
    value: 4,
    label: '已废弃'
  }
]

/* 生产状态: 成功、失败 */
export const logTypes = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 0,
    label: '失败',
  },
  {
    value: 1,
    label: '成功'
  }
]

/* 插入sim卡的标识 */
export const simStates = [
  {
    value: 0,
    label: '否',
  },
  {
    value: 1,
    label: '是'
  }
]

/* 角色状态 */
export const roleStates = [
  {
    value: 1,
    label: '启用'
  },
  {
    value: 2,
    label: '禁用'
  }
]
/* 角色类型 */
export const roleTypes = [
  {
    value: 1,
    label: '系统角色'
  },
  {
    value: 2,
    label: '外协厂角色'
  }
]

/* 菜单状态 */
export const menuStates = [
  {
    value: 1,
    label: '启用'
  },
  {
    value: 2,
    label: '禁用'
  }
]

/* 菜单类型 */
export const menuTypes = [
  {
    value: 1,
    label: '目录'
  },
  {
    value: 2,
    label: '菜单'
  },
  {
    value: 3,
    label: '功能'
  }
]