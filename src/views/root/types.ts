export interface RootStoreProps {
    data: any[];
    loading: boolean;
}

export interface RootDispatchProps {
    fetch: () => void;
}

export interface RootProps extends RootStoreProps, RootDispatchProps {}
