//侧边栏
module.exports = {
    '/views/': [
        '',
        {
            title:'算法类',
            collapsable: true,
            children: [
                'algorithm/clahe.md','algorithm/ImageProcessing.md','algorithm/otsu.md','algorithm/retinex.md',
                'algorithm/leetcode1.md'
                
            ]
        },
        {
            title:'计算机技术类',
            collapsable: true,
            children:[
                'cs/yolov4.md', 'cs/photo.md', 'cs/guiYolov4.md', 'cs/Imagesegmentation.md', 'cs/MFCbmp.md', 
                'cs/vueblog.md',
                'cs/OS/GlimmerOS.md',
            ]
        },
        {
            title:'硬件设计类',
            collapsable: true,
            children:[
                'ee/cubli.md','ee/debo.md','ee/star.md','ee/midbot.md',
                'ee/harmonyos/ohos0.md',
                'ee/tcostiny/tcos0.md',
                'ee/ARMcortex/nanopi0.md','ee/ARMcortex/armenv.md',
                'ee/riscv/gdf103.md',
                'ee/fpga/env'


            ]
        },
        {
            title:'AI及大数据类',
            collapsable: true,
            children:[
                'AI/detection.md','AI/aione.md','AI/2020baidustar.md','AI/TextClassification.md',
                'AI/tengine/ohosndk0.md',

            ]
        },
        {
            title:'小游戏设计类',
            collapsable: true,
            children:[
                'game/16'
            ]
        },
        {
            title:'笔记类',
            collapsable: true,
            children:[
                'notes/Googlebug.md','notes/Pythonbug.md','notes/aibug00.md','notes/bug00.md','notes/git.md',
                'notes/oamnote.md','notes/vim.md','notes/Edge.md'
            ]
        },
        {
            title:'杂谈',
            collapsable: true,
            children:[
                'freetalk/why','freetalk/wsl.md','freetalk/color.md','freetalk/Fourier.md','freetalk/android.md',
                'freetalk/ip0.md','freetalk/picgo.md','freetalk/docker00.md',
                
            ]
        },

    ]
}	