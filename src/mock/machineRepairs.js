import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 23

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@first',
    customerPhone:'17722643901',
    customerName:'张三',
    serviceType:'商户服务',
    operationType:'财务问题',
    level:'高',
    zone:'上海市浦东区',
    callTime:'2019/01/16 20:18',
    entryTime:'2018/01/16 20:18',
    updateTime:'2019/01/17 20:18',
    operation:'操作1'


  }))
}


export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,

      data:{
        rows: pageList,
        totalRecord: mockList.length

      },
      code:200
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
