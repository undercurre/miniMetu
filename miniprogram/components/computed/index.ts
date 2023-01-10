import { ComponentWithComputed } from 'miniprogram-computed';

ComponentWithComputed({
    data: {
        a: 1,
        b: 1,
        c: 1,
        sum: 2,
    },
    watch: {
        'a, b': function (a, b) {
            this.setData({
                c: a + b,
            });
        },
    },
    computed: {
        sum(data) {
            // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
            // 这个函数的返回值会被设置到 this.data.sum 字段中
            return data.a + data.b + data.c; // data.c 为自定义 behavior 数据段
        },
    },
    methods: {
        onTapa() {
            this.setData({
                a: this.data.a + 1,
            });
        },
        onTapb() {
            this.setData({
                b: this.data.b + 2,
            });
        },
    },
});
