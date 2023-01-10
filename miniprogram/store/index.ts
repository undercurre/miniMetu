import { configure } from 'mobx-miniprogram';
export { test } from './test';

// mobx配置
// 在严格模式下，不允许在 action 外更改任何状态。
configure({ enforceActions: 'observed' });
