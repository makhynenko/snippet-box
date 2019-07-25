import { RootStore } from './root/duck';
import { GlobalStore } from './duck';

export interface Store {
    root: RootStore;
    global: GlobalStore;
}
