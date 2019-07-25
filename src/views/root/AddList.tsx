import * as React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

class ModalExampleDimmer extends React.Component {
    state = { open: false };

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {
        const { open } = this.state;

        return (
            <div>
                <Button onClick={this.show}>Add List</Button>
                <Modal open={open} onClose={this.close}>
                    <Modal.Header>Create New List</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black" onClick={this.close}>
                            Cancel
                        </Button>
                        <Button positive icon="plus" labelPosition="right" content="Create" onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default ModalExampleDimmer;
