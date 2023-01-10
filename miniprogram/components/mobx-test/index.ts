import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { test } from '../../store/index';

ComponentWithStore({
    properties: {
        title: {
            type: String,
            value: '',
        },
    },
    options: {
        styleIsolation: 'shared',
    },
    data: {
        someData: '...',
    },
    storeBindings: {
        store: test,
        fields: ['numA', 'numB', 'sum'],
        actions: {
            buttonTap: 'double_data',
        },
    },
});
