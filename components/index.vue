<template>
  <div id="selectList" >
    <div class="zsl-container">
      <div class="zsl-form basic-container">
        <el-input v-model.trim="name" placeholder="请输入查询内容" class="filter-item" clearable @change="changeSubmit"/>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </div>

      <div class="tabs basic-container">
        <div class="tab-container">
          <el-tabs v-model="active" style="margin-top:15px;" type="card">
            <!--:disabled="item.key != active"-->
            <el-tab-pane v-for="item in tabOptions" :label="item.label" :key="item.key" :name="item.key">
              <list v-if="multi && active==item.key && refresh" :tab-list="tabList" :query="query" :type="item.key" :selected-data="selectedList" :temp-data="tempList" @handleChoose="submit" />
              <single-list v-if="!multi && active==item.key && refresh" :query="query" :tab-list="tabList" :type="item.key" :selected-data="selectedList" @handleChoose="submit" />
            </el-tab-pane>

          </el-tabs>
        </div>
        <div class="right-btn">
          <!--<el-button type="primary">{{ multi ? '多选': '单选'}}</el-button>-->
          <div class="btn-status" type="primary">{{ multi ? '多选': '单选'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import list from './component/list'
  import singleList from './component/singleList'
  import {getPersonList, getAgencyList, getCompanyList, getDepartmentList} from '@/api/customer/selectList'
  import { deepClone } from '../../../../public/js/util'
  export default {
    name: 'SelectList',
    components: { list, singleList },

    props: {
      activeName: {
        type: String,
        default: 'person'
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
        tabList: [
          {
            label: '人员',
            key: 'person',
            api: getPersonList,
            id: 'id',
            name: 'name',
            table: [
              { prop: 'name', label:'姓名', width: 80},
              { prop: 'id', label:'员工号', width: 80},
              { prop: 'mobile', label:'联系值', width: 100},
              { prop: 'companyName', label:'所属公司', width: 150},
              { prop: 'departmentName', label:'部门', width: 100},
              { prop: 'agencyName', label:'办事处', width: 100},
              { prop: 'mobile', label:'联系方式', width: 100},
              { prop: 'userId', label:'人员ID', width: 80}
            ]
          }, {
            label: '公司',
            key: 'company',
            api: getCompanyList,
            id: 'id',
            name: 'name',
            table: [
              { prop: 'companyBm', label: '公司编码', width: 50},
              { prop: 'companyId', label: 'IFS编码', width: 50},
              { prop: 'name', label: '公司名称', width: 150},
              { prop: 'id', label: '公司ID', width: 50}
            ]
          }, {
            label: '部门',
            key: 'department',
            api: getDepartmentList,
            id: 'id',
            name: 'name',
            table: [
              { prop: 'companyName', label: '公司名称'},
              { prop: 'name', label: '部门名称'}
            ]
          }, {
            label: '办事处',
            key: 'office',
            api: getAgencyList,
            id: 'id',
            name: 'name',
            table: [
              { prop: 'companyName', label: '公司名称'},
              { prop: 'name', label: '办事处名称'}
            ]
          }, {
            label: '人员范围',
            key: 'scope',
            id: 'id',
            name: 'name',
            table: [
              { prop: 'name', label: '人员范围'},
            ]
          }],
        tableList: [],
        row: null, //单选
        loading: false,
        name: "", //搜索字段
        selectedList: deepClone(this.selectedData),
        tempList: deepClone(this.tempData),
        refresh: true
      }
    },
    computed: {
      tabOptions() {
        if(this.activeName == 'person') {
          return [{ label: '人员', key: 'person'}]
        }else if(this.activeName == 'company') {
          return [{ label: '公司', key: 'company'}]
        }else if(this.activeName == 'department') {
          return [{ label: '部门', key: 'department'}]
        }else if(this.activeName == 'office') {
          return [{ label: '办事处', key: 'office'}]
        }else {
          return [{ label: '人员范围', key: 'scope'}]
        }
      },
      query() {
        var obj = {
          name: this.name
        }
        return obj;
      },
    },
    methods: {
      changeSubmit() {
        setTimeout(this.onSubmit, 500)
      },
      // 查询功能
      onSubmit() {
        this.refresh = false;
        this.$nextTick(() => {
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
        this.$emit('choosePeople', data||{})
      }
    }
  }
</script>
<style lang="scss">
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
  .zsl-container{
    margin: 20px;
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
      }
    }
  }

</style>
