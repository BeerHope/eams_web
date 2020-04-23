/* 公共下拉提取为字典 */

/* 绑定状态，标识生产状态 */
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
  },
  {
    value: 3,
    label: '解绑'
  }
]

/* 工单状态 */
export const orderStates = [
  {
    value: 0,
    label: '未生产'
  },
  {
    value: 1,
    label: '生产中'
  },
  {
    value: 2,
    label: '已结案'
  }
]

/* 目标版本号 */
export const targetVersions = [
  {
    value: 1,
    label: 'boot'
  },
  {
    value: 2,
    label: 'recovery'
  },
  {
    value: 3,
    label: 'core'
  },
  {
    value: 4,
    label: 'test'
  }
]

/* 国内外标识，区分是否下载21号文 */
export const marksFor21 = [
  {
    value: 0, // 默认值
    label: '国内'
  },
  {
    value: 1,
    label: '国外'
  }
]