import React from 'react';
import caver from '../klaytn/caver';

// Step 4
// demonstrating child -> parent call propagation via props
class PrivateKeyInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            privateKey: e.target.value
        });
    }

    render() {
        const { privateKey } = this.state;
        return (
            <div>
                <form>
                    <div class='form-group'>
                        <label for='inputKey'>Private Key</label>
                        <input
                            type='text'
                            placeholder="your private key starting with 0x"
                            onChange={this.handleChange}
                            id="inputKey"
                            class='form-control'
                        />
                    </div>
                    <button type='button' class="btn btn-primary" onClick={() => this.props.export(privateKey)}>Set</button>
                </form>
            </div>
        );
    }
}

// export default PrivateKeyInput

// Step 5
// demonstrating the use of child components in a user created component
// demonstrating the use of passing functions to a child component
class KeyAndAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: '',
            address: ''
        };
    }

    reloadAddress = (key) => {
        let account;
        try {
            account = caver.klay.accounts.privateKeyToAccount(key);
        } catch (e) {
            console.error(e);
        }
        if (account) {
            this.setState({
                privateKey: key,
                address: account.address
            });
            this.props.propagateKey(key);
        } else {
            this.setState({
                privateKey: '',
                address: ''
            });
            this.props.propagateKey(false);
        }
    }

    render() {
        const { address } = this.state;
        return (
            <div>
                <PrivateKeyInput export={this.reloadAddress} />
                <hr />
                <form>
                    <div class='form-group'>
                        <label for='addressField'>My Address</label>
                        <input
                            id='addressField'
                            type='text'
                            class='form-control'
                            disabled
                            value={address}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default KeyAndAddress