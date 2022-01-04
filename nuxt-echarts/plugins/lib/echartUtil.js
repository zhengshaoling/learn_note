/*
 * @Author: linglingling
 * echarts 公用方法封装
 */

// 渐变色
export const getLinearGradientColor = (colors, defalultColor) => {
        if (typeof colors == "string") return colors;
        if (Array.isArray(colors)) {
                return {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0, color: '#28cccc' // 0% 处的颜色
                }, {
                        offset: 1, color: '#00428e' // 100% 处的颜色
                }],
                global: true
                }
        }
        return defalultColor;
}  

