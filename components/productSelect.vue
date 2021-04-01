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
            <el-tab-pane v-for="item in tabOptions" :label="item.label" :key="item.key" :name="item.key">
                <list v-if="multi && active==item.key && refresh" :query="query" :tab-list="tabList" :type="item.key" :selected-data="selectedList" :temp-data="tempList" @handleChoose="submit" />
                <single-list v-if="!multi && active==item.key && refresh" :query="query" :tab-list="tabList" :type="item.key" :selected-data="selectedList" @handleChoose="submit" />
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
  import { getProductList } from '@/api/customer/selectList/product'
  import {deepClone, encryption} from '../../../../public/js/util'
  export default {
    name: 'ProductSelect',
    components: { list, singleList },

    props: {
      activeName: {
        type: String,
        default: '5'
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
        // 定义tab页信息，传到选择组件中
        userInfo: this.$store.getters.userInfo,
        // userInfo: JSON.parse(localStorage.getItem('userInfo')),
        tabList: [
          {
            label: '产品品牌',
            key: '20',
            api: getProductList,
            id: 'typeId',
            name: 'classTypeValue',
            table: [
              { prop: 'classTypeValue', label:'产品品牌'},
            ]
          }, {
            label: '产品名称',
            key: '30',
            api: getProductList,
            id: 'typeId',
            name: 'classTypeValue',
            table: [
              { prop: 'classTypeValue', label:'产品名称'},
            ]
          }, {
            label: '业务对象',
            key: '40',
            api: getProductList,
            id: 'typeId',
            name: 'classTypeValue',
            table: [
              { prop: 'classTypeValue', label:'业务对象'},
            ]
          }],
        tableList: [],
        row: null, //单选
        loading: false,
        selectedList: deepClone(this.selectedData),
        tempList: deepClone(this.tempData),
        refresh: true,
        name: ''
      }
    },
    computed: {
      tabOptions() {
        if(this.activeName == '20') {
          return [{ label: '产品品牌', key: '20'}]
        }else if(this.activeName == '30') {
          return [{ label: '产品名称', key: '30'}]
        }else {
          return [{ label: '业务对象', key: '40'}]
        }
      },

      query() {
        var obj = {
          companyId: this.userInfo['defaultCompanyId'],
          classTypeId: this.active,
          name: this.name
        }
        return obj;
      }
    },
    created() {

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
        if(this.multi) {
          this.tempList = [];
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
    position: relative;
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
      }
    }
  }

</style>
