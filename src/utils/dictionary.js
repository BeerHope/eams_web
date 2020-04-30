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

/* 国内外标识，区分是否下载21号文 */
export const marksFor21 = [
  {
    value: 0, // 默认值(是)
    label: '国内'
  },
  {
    value: 1, // 否
    label: '国外'
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
    label: '成功',
  },
  {
    value: 1,
    label: '失败'
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

/* 注册秘钥标识 */
export const registerKeyStates = [
  {
    value: 0,
    label: '未注册'
  },
  {
    value: 1,
    label: '已注册'
  }
]