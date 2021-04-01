<template>
  <div class="zsl-table">
    <el-table
      v-loading="queryLoading"
      :data="list"
      v-bind="$attrs"
      :default-sort="sort"
      highlight-current-row
      :row-key="getRowKeys"
      stripe
      fit
      border
      use-virtual
      :span-method="objectSpanMethod"
      ref="listTableObject"
      @current-change="getCurrentChange"
      @row-click="getRowSelect"
      @select="getChangeSelect"
      @select-all="getAllSelect"
      @selection-change="handleSelectionChange">
      <slot/>
    </el-table>
    <div class="zsl-table-pagination">
      <pagination :page="page" @paging="pages" />
    </div>
  </div>
</template>

<script>
  import pagination from '@/components/common/Pagination'
  import { defaultPage } from '@/components/common/default'
  import { deepClone } from '../../../../public/js/util'
  export default {
    name: 'ListTable',
    components: {
      pagination
    },

    props: {
      multi: {
        type: Boolean,
        default: true
      },
      id: {
        type: String,
        default: 'id'
      },
      api: {
        type: Function,
        // required: true
      },
      params: {
        type: Object,
        default () {
          return {}
        }
      },
      sort: {
        type: Object,
        default () {
          return {}
        }
      },
      listable: {
        type: Boolean,
        default () {
          return false;
        }
      },
      tempData: {
        type: Array,
        default() {
          return []
        }
      },
      objectSpanMethod:{
        type: Function
      },
      useApi: {
        type: Boolean,
        default() {
          return true
        }
      },
      ifLoad: {
        type: Boolean,
        default() {
          return true;
        }
      }
    },
    computed: {
      change() {
        return this.tempList.length || this.tempData.length;
      },
      // currentRow() {
      //   return this.list.find(item => item[this.id] == this.tempData[0]) || null;
      //   // let row = this.list.find(item => item[this.id] == this.tempData[0]);
      //   // if (row) {
      //   //   return row;
      //   // } else {
      //   //   return null
      //   // }
      // },
      tempList() {
        return this.tempData || [];
      }
    },
    data() {
      return {
        queryLoading: false,
        list: [],
        page: defaultPage(),
        currentRow: null,
        selectionRow: []
      }
    },
    activated() {
      this.ifChooseData();
    },
    mounted() {
      if(this.ifLoad) {
        this.getList();
      }
      this.ifChooseData();
     //重新布局table，防止错位
     // setTimeout(()=> {
     //   this.$refs.listTableObject.doLayout()
     // },1200)
    },
    watch: {
      change() {
        this.currentRow = this.list.find(item => item[this.id] == this.tempData[0]);
        this.ifChooseData();
      }
    },
    methods: {
      getRowKeys(row) {
        // return row.index
        return row[this.id]
      },
      async getList() {
        try {
          this.queryLoading = true
          const params = { ...this.params, ...this.page }

          if (typeof this.api !== 'function') {
            // throw new Error('api应该传入一个方法')
            this.queryLoading = false;
            this.list = [{id: 1, name: '我'},{id: 2, name: '我的下属'}];
            this.page= {pageNum: 1,pageSize: 10,total: 2}
            this.$emit('getTableData', this.list)
          } else {
            const res = await this.api(params);
            let data = res.data.data
            if (this.listable) {
              this.list = data.datas;
              this.page = {
                pageNum: data.pageNum,
                pageSize: data.pageSize,
                total: data.total,
                pages: data.pages
              }
              this.$emit('getTableData', data.datas)
            } else {
              this.list = data
            }
          }
          this.ifChooseData();
        } catch (e) {
          // throw new Error('处理异常')
          throw e
        }
        this.queryLoading = false;
      },
      // 判断是否为选中状态
      ifChooseData(){
        if(this.multi) {
          this.$refs['listTableObject'].clearSelection();
          var tempList = this.tempList || this.tempData;
          for(let j=0; j<tempList.length; j++) {
            this.$nextTick(() => {
              this.list.forEach(item => {
                if(item[this.id] == tempList[j]) {
                  this.$refs['listTableObject'].toggleRowSelection(item,true)
                } else {
                  // this.$refs['listTableObject'].toggleRowSelection(item,false)
                }
              })
            })
          }
        }
      },
      pages(newPage) {
        this.page = newPage;
        this.getList()
      },
      _resetPage() {
        this.page = defaultPage(this.page)
      },
      reload() {
        this.$nextTick(() => {
          this._resetPage()
          this.getList()
        })
      },
      // 暴露获取选中的方法
      get_listTableObject() {
        console.debug(this.$refs.listTableObject)
      },
      getCurrentChange(val) {
        this.currentRow = val;
        this.$emit('getCurrentChange',val)
      },
      getRowSelect(row,column,event) {
        this.$refs['listTableObject'].toggleRowSelection(row)
        this.$emit('getRowSelect',row,column,event)
      },
      getChangeSelect(selectItem,changItem){
        this.$emit('getChangeSelect',selectItem,changItem)
      },
      handleSelectionChange(val) {
        // this.$refs['listTableObject'].toggleRowSelection(val)
        this.$emit('handleSelectionChange', val)
      },
      getAllSelect(val) {
        this.$emit('getAllSelect', val)
      }
    }
  }
</script>

<style lang="scss">
  .zsl-table {
    .el-table {
      .cell{
        a{
          color: #3670b4;
        }
      }
      th {
        font-size: 12px;
        color: #666;
        font-weight: bold;
        background-color: #F5F5F5;
      }

      tr {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    z-index : 1;
  }
  ::-webkit-scrollbar
  {
    width: 12px;
  }
</style>
