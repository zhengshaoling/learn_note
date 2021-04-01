q<template>
  <div id="selectList">
    <div class="zsl-transform">
      <template v-for="item in tabList" v-key="item">
        <list-table v-if="type == item.key" ref="tableData"
                    :params="param"
                    :api="item.api"
                    :listable="true"
                    :multi="multi"
                    :temp-data="tempList"
                    :if-load="ifLoad"
                    @getTableData="getTableData"
                    @getRowSelect="getRowChange"
                    @getCurrentChange="getCurrentChange">
          <el-table-column fixed="left" :prop="item.id" width="50" align="center">
            <template scope="scope">
              <el-radio :label="scope.row[item.id]" class="radio" v-model="tempList[0]">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <template v-for="listItem in item.table" :key="">
            <el-table-column v-if="listItem.prop == 'customerName' && listItem.clickable" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label">
              <template slot-scope="scope"><div style="font-weight: bold; font-size: 13px;" click="clickCustomer(scope.row)">{{scope.row.customerName}}</div></template>
            </el-table-column>
            <el-table-column v-else-if="listItem.prop == 'authcStatId'" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis"></div>{{ scope.row.authcStatId | authcStatIdFilter }}</template>
            </el-table-column>
            <el-table-column v-else-if="listItem.prop == 'isPublic'" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row.isPublic | isPublicFilter }}</div></template>
            </el-table-column>
            <el-table-column v-else-if="listItem.prop == 'nodeId'|| listItem.prop == 'lifeCycleNodeId'" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row[listItem.prop] | nodeIdFilter }}</div></template>
            </el-table-column>
            <el-table-column v-else :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row[listItem.prop] }}</div></template>
            </el-table-column>
          </template>
        </list-table>
      </template>
    </div>
    <div class="btn-group">
      <el-button type="primary" icon="el-icon-circle-check" @click="handleChoose" size="mini">选定退出</el-button>
      <el-button plain icon="el-icon-close" @click="cancelChoose" size="mini">取消</el-button>
    </div>
  </div>
</template>
<script>
  import listTable from '@/components/common/ListTable/index'

  import { deepClone } from '../../../../../public/js/util'
  export default {
    name: 'ZydSingleSearch',
    components: { listTable },
    props: {
      type: {
        type: String,
        default: "person"
      },
      multi: {
        type: Boolean,
        default: false
      },
      selectedData: {
        type: Object,
        default() {
          return {}
        }
      },
      tabList: {
        type: Array,
        default() {
          return []
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      },
      ifLoad: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        param: this.query,
        sort: { prop: 'name', order: 'descending' }, // 默认排序方法
        tableList: [],
        selectedRow: this.selectedData,
        tempList: []
      }
    },
    computed: {
      id() {
        var id = '';
        for(let i = 0;i<this.tabList.length; i++) {
          let item = this.tabList[i];
          if(item.key == this.type) {
            id = item.id;
          }
        }
        return id;
      }
    },
    mounted() {
      this.ifChoose();
      this.reloadTable();
    },
    activated() {
      this.selectedList = {};
      this.tempList = [];
    },
    watch: {
      query() {
        this.reloadTable();
      },
      selectedRow() {
        var temp = [];
        temp.push(this.selectedRow[this.id])
        this.tempList = temp;
      }
    },
    methods: {
      ifChoose() {
        var temp = [];
        temp.push(this.selectedData[this.id])
        this.$nextTick(() => {
          this.tempList = temp;
        })

      },
      /*********************** table操作 ********************/
      getTableData(data) {
        this.tableList = data;
      },
      reloadTable() {
        this.$refs.tableData.reload();
      },
      resetQuery() {
        this.param = this.query;
        this.reloadTable();
      },
      // 单选
      getCurrentChange(val) {
        this.tempList = [];
        this.selectedRow = val;
        this.tempList.push(val[this.id])
      },
      // 点击行单选
      getRowChange(row, column, event) {
        this.tempList = [];
        this.selectedRow = row;
        this.tempList.push(row[this.id])
      },
      handleChoose() {
        this.$emit('handleChoose', this.selectedRow)
      },
      cancelChoose() {
        this.selectedRow = {};
        this.$emit('handleChoose', this.selectedRow)
      },
      clickCustomer(data) {
        this.$emit('clickCustomer', data)
      }
    }
  }
</script>
<style lang="scss">
  .zsl-transform {
    .zsl-table {
      .el-table {
        /*min-height: 440px;*/
        /*max-height: 650px;*/
        /*width: 99.9% !important;*/
      }
    }
  }
</style>
<style lang="scss" scoped>
  .btn-group {
    /*margin: 0 auto;*/
    text-align: center !important;
  }
</style>

