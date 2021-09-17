/*
 * @Author: linglingling
 * @Date: 2021-09-17 09:34:53
 * @LastEditTime: 2021-09-17 10:26:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\plugins\lib\protoFun.js
 */
import { deepClone } from '~/plugins/lib/util'


// 递归方法实现 数组转树形结构
Array.prototype.toTree = function (
  parentKey = 'parentId',
  childrenKey = 'children',
  rootId = -1,
) {
  let _this = deepClone(this)
  let arrayToTree = (data, parentId) => {
    //  arr 是返回的数据  parendId 父id
    let temp = [];
    let treeArr = data;
    treeArr.forEach((item, index) => {
      if (item[parentKey] === parentId) {
        let arrayToTree1 = arrayToTree(treeArr, treeArr[index].id);
        if (arrayToTree1.length > 0) {
          // 递归调用此函数
          treeArr[index].children = arrayToTree1;
        }
        temp.push(treeArr[index]);
      }
    });
    return temp;
  }

  return arrayToTree(_this, rootId);
}
// flat方法实现 数组扁平化
Array.prototype.flattern = function (
        arr
) {
        return arr.flat(Infinity);
}

// 树形结构转 扁平化数组
Array.prototype.treeToArray = function (
        source,
        childrenKey = "children"
) {
        let res = []
        source.forEach(item=>{
            res.push(item)
            item[childrenKey] && res.push(...treeToArray(item[childrenKey], childrenKey))
        })
        return res.map((item) => {
            if (item[childrenKey]) {
                delete item[childrenKey]
            }
            return item
        })
}

// 筛选符合条件的树结构
Array.prototype.filterTreeByFunc = function (
  tree,
  func = (item) => { return item.show === true; },
  childrenKey = 'children'
) {
  if (!Array.isArray(tree) || tree.length === 0) {
      return []
  }
  return tree.filter(item => {
      item[childrenKey] = item[childrenKey] && filterTreeByFunc(item[childrenKey], func, childrenKey)
      return func(item) || (item[childrenKey] && item[childrenKey].length)
  })
}


// 给树节点增加属性
Array.prototype.addAttrToNodes = function (
  tree,
  addKey = 'attr',
  addVal = true,
  childrenKey = 'children'
) {
  tree.forEach(item => {
    item[addKey] = addVal;
    if(item[childrenKey] && item[childrenKey].length > 0) {
      addAttrToNodes(item[childrenKey], addKey, addVal, childrenKey)
    }
  })
  return tree;
}

// 给树节点删除属性
Array.prototype.removeAttrFromNodes = function (
  tree,
  removeKey = 'attr',
  childrenKey = 'children'
) {
  tree.forEach(item => {
    delete item[removeKey];
    if(item[childrenKey] && item[childrenKey].length > 0) {
      removeAttrFromNodes(item[childrenKey], removeKey, childrenKey)
    }
  })
  return tree;
}

// 删除树中的空children
Array.prototype.removeEmptyChildren = function (
  tree,
  childrenKey = 'children'
) {
  tree.forEach(item => {
    if (item[childrenKey] && item[childrenKey].length ===0) {
        delete item[childrenKey]
    } else if (item[childrenKey] && item[childrenKey].length > 0) {
        removeEmptyChildren(item[childrenKey], childrenKey)
    }
  })
  return tree;
}

// 获取叶子节点
Array.prototype.getAllLeaf = function (
  tree,
  childrenKey = 'children'
) {
  const result = []
  const getLeaf = (tree) => {
      tree.forEach((item) => {
          if (!item[childrenKey]) {
              result.push(item)
          } else {
              getLeaf(item[childrenKey])
          }
      })
  }
  getLeaf(tree)
  return result
}