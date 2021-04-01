<template>
  <div id="selectList" >
    <div class="zsl-container">
      <div class="zsl-form basic-container">
        <el-input v-model.trim="query.customerName" placeholder="请输入查询内容" class="filter-item" clearable @change="changeSubmit"/>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </div>

      <div class="tabs basic-container">
        <div class="tab-container">
          <el-tabs v-model="active" style="margin-top:15px;" type="card">
            <el-tab-pane v-for="item in tabOptions" :label="item.label" :key="item.key" :name="item.key">
              <keep-alive :exclude="exclude">
                <list v-if="multi && active==item.key && refresh" :if-load="ifLoad" :tab-list="tabList" :query="query" :type="item.key" :selected-data="selectedList" :temp-data="tempList" @handleChoose="submit" />
              </keep-alive>
              <keep-alive :exclude="exclude">
                <single-list v-if="!multi && active==item.key && refresh" :if-load="ifLoad" :tab-list="tabList" :query="query" :type="item.key" :selected-data="selectedList" @handleChoose="submit" />
              </keep-alive>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="right-btn">
          <div class="btn-status">{{ multi ? '多选': '单选'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import list from '@/components/common/selectList/component/list'
  import singleList from '@/components/common/selectList/component/singleList'
  import { getFormalList, getPotentialList } from '@/api/customer/selectList/client'
  import { deepClone } from "../../../../public/js/util";

  export default {
    name: 'ClientSelectList',
    components: { list, singleList },

    props: {
      activeName: {
        type: String,
        default: 'formal'
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
      }
    },

    data() {
      return {
        active: this.activeName,
        refresh: true,
        // 定义tab页信息，传到选择组件中
        tabList: [
          {
            label: '正式客户',
            key: 'formal',
            api: getFormalList,
            id: 'erpCustomerId',
            name: 'customerName',
            table: [
              { prop: 'erpBm', label:'ERP编码', width: 110 },
              { prop: 'crmBm', label:'CRM编码', width: 110 },
              { prop: 'customerName', label:'客户名称', width: 360, clickable: true },
              { prop: 'typeName', label:'客户类型', width: 100 },
              { prop: 'industryName', label:'客户行业', width: 100 },
              { prop: 'identifyNumber', label:'税号', width: 130 },
              { prop: 'isPublic', label:'公海标识', width: 100 },
              { prop: '', label:'风控属性', width: 100 },
              { prop: 'nodeId', label:'生命周期', width: 100 },
              { prop: 'finalDealTime', label:'最后成交时间', width: 140  },
              { prop: 'createTime', label:'创建时间', width: 140  }
            ]
          }, {
            label: '潜在客户',
            key: 'potential',
            api: getPotentialList,
            id: 'crmCustomerId',
            name: 'customerName',
            table: [
              { prop: 'crmBm', label:'CRM编码', width: 110 },
              { prop: 'erpBm', label:'ERP编码', width: 110 },
              { prop: 'customerName', label:'客户名称', width: 360, clickable: true},
              { prop: 'identifyNumber', label:'税号', width: 130},
              { prop: 'isPublic', label:'公海标识', width: 100 },
              { prop: 'lifeCycleNodeId', label:'生命周期', width: 100 },
              { prop: 'website', label:'网址', width: 100 },
              { prop: 'createTime', label:'创建时间', width: 140 }
            ]
          }],
        tableList: [],
        row: null, //单选
        loading: false,
        tabOptions: [
          { label: '正式客户', key: 'formal'},
          { label: '潜在客户', key: 'potential'}
        ],
        query: {
          customerName: ''
        },
        selectedList: deepClone(this.selectedData),
        tempList: deepClone(this.tempData),
        exclude: null,
        ifLoad: false
      }
    },
    // computed: {
    //   ifLoad() {
    //     return this.query.customerName != '' ? true : false;
    //   }
    // },
    watch: {
      active(val) {
        // if(this.multi) {
          this.selectedList = {};
          this.tempList = [];
        // }
      },
      'query.customerName': {
        handler(val) {
          if(val) {
            this.ifLoad = true;
          }
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      if(this.multi) {
        if(this.tempData.length) {
          this.onSubmit();
        }
      }else {
        if(Object.keys(this.selectedList).length > 1) {
          this.onSubmit();
        }
      }
    },
    methods: {
      changeSubmit() {
        this.ifLoad = true;
        setTimeout(this.onSubmit, 500)
      },
      // 查询功能
      onSubmit() {
        this.ifLoad = true;
        this.refresh = false;
        this.exclude = 'ZydSearch,ZydSingleSearch'
        this.$nextTick(() => {
          this.exclude = null;
          this.refresh = true;
        })
      },
      submit(data) {
        this.tempList = [];
        if(this.multi) {
          for (let key in data) {
            this.tempList.push(key);
          }
        }
        this.selectedList = data;
        this.$emit('choosePeople', data)
      }
    }
  }
</script>
<style lang="scss">
  .zsl-container {
    .tabs{
      .tab-container {
        .el-table {
          min-height: 420px;
        }
      }
    }
  }
  .zsl-form {
    .filter-item {
      width: 800px;
      height: 35px;
    }
    .el-button {
      margin: 0 20px;
    }
  }
  .el-tabs__item.is-disabled {
    color: #C0C4CC !important;
    cursor: not-allowed !important;
  }
</style>
<style lang="scss" scoped>
  #selectList {
    margin: 20px;
  }
  .zsl-container{
    .zsl-form {
      position: relative;
      .btn-group {
        /*height: 55px;*/
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 1px solid #D7D7D7;
        padding-left: 10px;
      }
    }
    .tabs {
      position: relative;
      .right-btn {
        position: absolute;
        top: 5px;
        right: 20px;
        .btn-status {
          color: #fff;
          background: #00428e;
          border: none;
          text-align: center;
          border-radius: 4px;
          display: inline-block;
          height: 30px;
          line-height: 29px;
          padding: 0 30px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 14px;
          vertical-align: middle;
        }
        .btn-status::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: #00428e;
          left: -8px;
          top: 5px;
          transform: rotate(45deg);
        }
      }
    }
  }

</style>
