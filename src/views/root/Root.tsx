import * as React from 'react';
import AddList from './AddList';
import { RootProps } from './types';
import { Container, Header, Content } from './styled';
import { Icon } from 'semantic-ui-react';

export default class Root extends React.Component<RootProps> {
    public componentDidMount() {
        this.props.fetch();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Icon name="code" size="huge" />
                </Header>
                <Content>
                    <AddList />
                </Content>
            </Container>
        );
    }
}
