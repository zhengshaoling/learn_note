
# components

vue-element 最近开发总结
=============================

element滚动条宽高的设置
-----------------------------------------------
::webkit-scrollbar {
	width: 12px;
	height: 12px;
}

vue-element 实现一个带选择框，table表格，单选或多选框
-----------------------------------------------------
1. 在开发过程中，有踩到很多坑，写在前面吧，下次看的时候能一下子看到
    * props 传回来的数据是不允许修改的，只能监听。
    * 修改this中对象数组的值时，最好先复制一份temp出来，对temp进行push，pop等操作完之后，再把整个temp赋到data中。在开发过程中，我就是因为直接对data进行push等操作，最后发现页面显示的一直是改变之前的数据，在chrome中用vue的devtool工具查看，数据是已经修改成功的了，但页面就是监听不到没有渲染出来~只有对整个data进行重新布局才可以。
    * element dialog有个问题，我原本是用dialog，里面嵌套table啥的，当table列数太多，width太大的时候，选中数据的时候整个dialog都会跟着抖动了下，查了方法，改了很久，最后也……还是会。很心累，所以，我换成了element的抽屉组件。
    * 在写其他模块的时候，有过一个问题，原本我想的是：列表页->编辑页，使用弹框跳转，跳转的时候直接把data对象传过去，在编辑页通过computed属性重新赋值到data中，之后我在编辑页有加下面写的搜索选择组件，选择完之后通过validate校验，可是校验不通过，其他的form-item都是可以的，唯独这个通过弹框选择组件选择的没办法。最后发现原因是，form表单的自动校验要一开始就把data定义好，给个空值就好。试了很多种方法之后，决定采用，进入编辑页的时候传个id过来，通过调接口获取到form表单数据。
    * 有一个问题是这样子的，关于滚动的问题，问题出现的场景是，弹框页面form提交表单，点击提交，校验失败之后回滚到失败的位置去。一开始一直没成功的原因是，我点击弹框，他的滚动条是加在el-scrollbar上面的，我一直获取不到容器，后面我把滚动条加在了form上，再设置scrollTop就能滚动了。  
    * 关于计算属性的问题，computed属性里默认只有getter，没有setter。在该组件的list.vue中，我一开始在data里面定义selectedList和tempList,把父组件传过来的赋给他们，但是这有一个问题，当我选择框选择数据之后，再去搜索table表格数据，这个时候selectedList数据会有丢失的情况。于是我改成了用computed来定义selectedList和tempData,但这又会报错，原因是computed默认是只有get方法让你获取到值，没有set方法来支持你改变他的值，所以需要自己手动定义一下set方法，就不会报错了。
        get方法 是取，即给变量值赋值
        set方法 当变量值发生改变后会出发set方法。
    * 记一个困扰了我1个多小时的bug~~~~~~我一个页面，调用了多个组件，其中有2个组件的name是一样的，导致我整个页面白屏，一直在重复请求一个接口。一开始以为是我哪里写了死循环，后面同事发现了是这个问题，以后一定要注意每个组件的name值都设成唯一的值，不要重复。
    * 另外，还有一个问题，关于select框的回显，我从接口已经拿到select的id了，select选择列表也已经有了，但是渲染出来的就始终是id，没有显示name值，排除了：
        1. 设置setTimeout,确保列表数据已经拿到再来给选择赋值
        2. 用v-if，让数据全部拿到之后重新渲染
        3. 用this.$nextTick(()=>{}),同1原理相似
        用了以上3个方法，仍然不行，最后用typeof 发现，列表里的id类型是number,接口获取到的选择值是stirng,~~~~晕死。
        
2. 实现逻辑
    * 封装el-table组件，命名为list-table：
        * 组件中传递api(function)，查询参数(object)，是否为单选||多选(boolean),已选择的唯一ID数组(array),后续的再根据需求增加
        * 通过$emit定义选择框的方法,并将选择的数据传回给父组件（含有点击行选择，点击checkbox多选，点击radio单选，全选，手动选择）
        * 需要实现跨页选择，即点击页面跳转之后勾选数据，选择的列表要往上叠加，不能丢失。需要el-table-column中添加```:reserve-selection="true"```,定义type ```type="selection"```,如下： 

    * 封装el-table组件，命名为list-table：
        ** 组件中传递api(function)，查询参数(object)，是否为单选||多选(boolean),已选择的唯一ID数组(array),后续的再根据需求增加
        ** 通过$emit定义选择框的方法,并将选择的数据传回给父组件（含有点击行选择，点击checkbox多选，点击radio单选，全选，手动选择）
        ** 需要实现跨页选择，即点击页面跳转之后勾选数据，选择的列表要往上叠加，不能丢失。需要el-table-column中添加```:reserve-selection="true"```,定义type ```type="selection"```,如下： 

        ```vue
          <el-table-column :reserve-selection="true" :row-key="item.id" fixed="left" type="selection" class="selection" :prop="item.id" width="50" align="center"/>
        ```
        在el-table中添加```:row-key="getRowKeys```,
        getRowKeys方法：```getRowKeys(row) { return row[this.id] },```

        * 根据传过来的已选择的唯一ID数组，循环列表勾选上

        ```javascript
          // 判断是否为选中状态
            ifChooseData() {
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
            }
        ```

        * 通过slot插槽，在父组件中自定义table列数据。
        * 添加分页组件。
        * 具体代码如下： 

        ```vue
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
        ```
        methods方法：
        ```javascript
           getRowKeys(row) {
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
        ```
    
    * 封装多选组件：

        * 调用list-table组件
        * 布局方面，用flex布局，左边70%的table，右边30%的选择列表，将选择的列表存到selectedList对象中，唯一ID存在tempList数组中，tempList用于遍历渲染选择列表框。点击选定退出或取消的时候，把selectedList传回给父组件。
        * methods方法里，将list-table选择返回来的对象，进行判断，如果不存在则push进数组，存在则用splice方法去除项
        * 关键代码如下：

        methods方法： 
       ```javascript
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
          }
          ```    
    * 封装单选组件：
        * 就类似与多选组件，只是不需要定义那么多方法，只需要行点击方法，以及radio点击方法即可，并且不需要多加一个选择列的框框，在template中，把type='checkbox'的el-table-column改成用template自定义成radio，代码跟上一个类似就不贴了。
    * 封装tab切换页，其实谈不上封装了，这个以后有时间再来改改吧。
3. 贴下代码，把代码直接抽出来放文件夹里上传的，不能运行的。

vue深度监听的方法
-----------------------------------------------------
1. 具体例子，代码如下
    ```vue.js
     watch:{
        deep: true,
        'searchMapParam.custMapKeyword':{
          handler(n){
            if(!n) return
            this.getAddrSeletList(n)
          }  
        }
     }
    ```
2. 当监听的数据是对象或者数组时，就无所谓newVal和oldVal,因为两者指向的都是同一个数据。

vue 中keep-alive 组件和activated、deactivated 生命周期
--------------------------------------------------------
1. keep-alive 是个抽象组件，跟template一样，自身不会渲染成DOM元素，它用于将整个组件缓存起来。
    该组件的写法可以直接在template中包在组件的外层，也可以直接在路由中定义meta:{keepAlive: true/false}。
    它的属性有max,include,exclude(这两个可以传入一个字符串也可以是数组，并且是组件定义的name值，定义是否会被缓存的组件)
2. activated和deactivated 生命周期是在设置了keep-alive缓存组件当中，每当切换组件的时候会执行一次：
    第一次进入缓存组件：beforeRouterEnter -> created -> ... -> activated -> deactivated
    后续再进入： beforeRouterEnter -> activated -> deactivated
3. 使用场景，在上面的实现一个带选择框，table表格，单选或多选框的组件中，用于切换tab页的时候缓存数据，具体代码如下：
    ```html
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
    ```
    因为带有查询功能，当点击查询的时候，通过v-if和exclude让组件重新渲染，同样也可用include来代替exclude实现。
    ```javascript
     // 查询功能
      onSubmit() {
        this.refresh = false;
        this.exclude = 'ZydSearch,ZydSingleSearch'
        this.$nextTick(() => {
          this.exclude = null;
          this.refresh = true;
        })
      }
    ```
    在 ZydSearch 和 ZydSingleSearch 中，通过activated生命周期函数定义方法，获取数据
    ```javascript
     activated() {
       this.selectedList = {};
       this.tempList = [];
     }
    ```
    