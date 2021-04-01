<template>
  <div id="selectList">
    <div class="zsl-transform">
      <template v-for="item in tabList" v-key="item.id">
        <list-table v-if="type == item.key" ref="tableData"
                    :params="param"
                    :api="item.api"
                    :listable="true"
                    :temp-data="tempList"
                    :multi="multi"
                    :id="id"
                    :if-load="ifLoad"
                    @getTableData="getTableData"
                    @getAllSelect="getAllSelect"
                    @getRowSelect="getRowSelect"
                    @getChangeSelect="getChangeSelect">
          <!--@handleSelectionChange="handleSelectionChange"-->
          <el-table-column :reserve-selection="true" :row-key="item.id" fixed="left" type="selection" class="selection" :prop="item.id" width="50" align="center"/>
          <template v-for="listItem in item.table" v-key="">
            <el-table-column v-if="listItem.prop == 'customerName' && listItem.clickable" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label">
              <template slot-scope="scope"><div style="font-size: 13px; font-weight: bold;" @click="clickCustomer(scope.row)">{{scope.row.customerName}}</div></template>
            </el-table-column>
            <el-table-column v-else-if="listItem.prop == 'authcStatId'" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row.authcStatId | authcStatIdFilter }}</div></template>
            </el-table-column>
            <el-table-column v-else-if="listItem.prop == 'isPublic'" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row.isPublic | isPublicFilter }}</div></template>
            </el-table-column>
            <el-table-column v-else-if="listItem.prop == 'nodeId'|| listItem.prop == 'lifeCycleNodeId'" :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row[listItem.prop] | nodeIdFilter }}</div></template>
            </el-table-column>
            <el-table-column v-else :prop="listItem.prop" :min-width="listItem.width || 150" sortable :label="listItem.label" show-overflow-tooltip>
              <template slot-scope="scope"><div class="overflow-text-ellipsis">{{ scope.row[listItem.prop]}}</div></template>
            </el-table-column>
          </template>
        </list-table>
      </template>
    </div>
    <div class="selectedList">
      <div class="selectedHead">
        <div class="title">已选择列表</div>
        <div class="btn-group">
          <el-button type="primary" icon="el-icon-circle-check" @click="handleChoose" size="mini">选定退出</el-button>
          <el-button plain icon="el-icon-close" @click="cancelChoose" size="mini">取消</el-button>
        </div>
      </div>
      <div class="list">
        <div class="list-item" v-if="tempList.length == 0">暂无选择</div>
        <div class="list-item" v-for="key in tempList" :key="">
          <div class="list-item-txt overflow-text-ellipsis">{{ selectedList[key][name] }}</div>
          <i class="child el-icon-close" @click="del(key)"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
  import listTable from '@/components/common/ListTable/index'
  import { deepClone } from '../../../../../public/js/util'

  export default {
    name: 'ZydSearch',
    components: { listTable },
    props: {
      type: {
        type: String,
        default: "person"
      },
      multi: {
        type: Boolean,
        default: true
      },
      selectedData: {
        type: Object,
        default() {
          return {}
        }
      },
      tempData: {
        type: Array,
        default() {
          return []
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
    activated() {
      this.selectedList = {};
      this.tempList = [];
    },

    data() {
      return {
        // selectedList: this.selectedData,
        // tempList: this.tempData,
        param: JSON.parse(JSON.stringify(this.query)),
        tableList: [],
        multipleSelection: []
      }
    },
    computed: {
      /*selectedList() {
        return this.selectedData;
      },
      tempList() {
        return this.tempData;
      },*/
      selectedList: {
        get() {
          return this.selectedData;
        },
        set(val) {

        }
      },
      tempList: {
        get() {
          return this.tempData;
        },
        set(val) {

        }
      },
      id() {
        var id = '';
        for(let i = 0;i<this.tabList.length; i++) {
          let item = this.tabList[i];
          if(item.key == this.type) {
            id = item.id;
          }
        }
        return id;
      },
      name() {
        var name = '';
        for(let i = 0;i<this.tabList.length; i++) {
          let item = this.tabList[i];
          if(item.key == this.type) {
            name = item.name;
          }
        }
        return name;
      }
    },
    mounted() {
      this.reloadTable();
    },
    methods: {
      del(key) {
        var temp = this.tempList;
        let index = temp.findIndex(item => item == key)
        temp.splice(index, 1);
        delete this.selectedList[key];
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
      handleSelectionChange(row) {
        var temp = [];
        var selectedList = {};
        for(let i=0;i<row.length;i++) {
          let item = row[i]
          let index = item[this.id]
          temp.push(index);
          selectedList[index] = item;
        }
        this.tempList = deepClone(temp)
        this.selectedList = deepClone(selectedList)
      },
      getRowSelect(row, column, event) {
        var temp = this.tempList;
        let index = temp.findIndex(item => item == row[this.id]);
        let i_index = row[this.id]
        if(index>=0) {
          temp.splice(index, 1);
          delete this.selectedList[i_index]
        } else {
          temp.push(i_index);
          this.selectedList[i_index] = row;
        }
        this.tempList = deepClone(temp)
      },
      getChangeSelect(selectItem,changItem){
        var temp = this.tempList;
        let i_index = changItem[this.id]
        if(selectItem.indexOfObj(changItem,this.id) >= 0) {
          let index = temp.findIndex(k => k == i_index)
          if(index>=0) {

          }else {
            temp.push(i_index)
            this.selectedList[i_index] = changItem;
          }
        } else {
          let index = temp.findIndex(k => k == i_index)
          if(index >= 0) {
              temp.splice(index, 1)
              delete this.selectedList[i_index]
          } else {}
        }
        this.tempList = deepClone(temp)
      },
      getAllSelect(val) {
        var temp = this.tempList;
        if (val.length > 0) {
          for (let i = 0; i < val.length; i++) {
            let item = val[i];
            let i_index = item[this.id];
            if (temp.findIndex(i_item => i_item == i_index) < 0) {
              temp.push(i_index);
              this.selectedList[i_index] = item;
            } else {}
          }
        }else {
          for (let i = 0; i < this.tableList.length; i++) {
            let item = this.tableList[i]
            let i_index = item[this.id]
            let index = temp.findIndex(i_item => i_item == i_index);
            if (index >= 0) {
              temp.splice(index, 1);
              delete this.selectedList[i_index];
            } else {}
          }
        }
        this.tempList = deepClone(temp)
      },
      handleChoose() {
        this.$emit('handleChoose', this.selectedList)
      },
      cancelChoose() {
        this.tempList = []
        for(let k in this.selectedList) {
          delete this.selectedList[k]
        }
        this.selectedList = {};
        this.$emit('handleChoose', this.selectedList)
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
        overflow: auto;
        max-height: 580px;
        /*height: 500px;*/
        /*min-height: 440px;*/
        /*max-height: 550px;*/
      }
    }
  }
</style>
<style lang="scss" scoped>
  #selectList {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .zsl-transform {
      flex: 0 1 auto;
      width: 70%;
      /*height: 550px;*/
    }
    .selectedList {
      flex: 0 1 auto;
      width: 28%;

      /*min-height: 365px;*/
      min-height: inherit;
      margin-left: 20px;
      border: 1px solid #E9E9E9;
      color: #999;
      .selectedHead {
        position: relative;
        .title {
          font-size: 14px;
          font-weight: bold;
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding-left: 5px;
          border: 1px solid #00428e;
          text-align: left;
          box-shadow: 0px 1px 2px 0px rgba(0,66,142,.4);
        }
        .btn-group {
          /*height: 55px;*/
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          /*padding-left: 10px;*/
        }
      }
      .list {
        box-shadow: 0px 2px 3px 0px rgba(153, 153, 153, 0.86);
        .list-item {
          font-size: 14px;
          /*padding: 5px;*/
          height: 30px;
          line-height: 30px;
          text-indent: 1em;
          width: 100%;
          display: flex;
          align-items: center;
          .list-item-txt {
            width: 90%;
            flex: 0 1 auto;
          }
          .child {
            margin-right: 10px;
            flex: 0 1 auto;
            visibility: hidden;
          }
        }
        .list-item:hover {
          .child {
            margin-right: 10px;
            flex: 0 1 auto;
            visibility: visible;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

