import { observable, runInAction } from 'mobx-miniprogram';

export const test = observable({
    numA: 1000,
    numB: 1000,

    get sum() {
        return this.numA + this.numB;
    },

    double_data: function () {
        runInAction(() => {
            this.numA = this.numA * 2;
            this.numB = this.numB * 2;
        });
    },
});
