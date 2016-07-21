import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import { Alert, FormGroup, FormControl, ControlLabel, InputGroup, Button } from 'react-bootstrap';

class W3ProviderComponent extends Component {
  constructor(props) {
    super(props);
    let { rpcProvider } = this.props.Web3Provider;
    this.state = {
      rpcProvider : rpcProvider,
      showSuccess : true
    }
  }

  componentDidMount() {
    const { dispatch, Web3Provider } = this.props;
    const { rpcProvider } = Web3Provider;

    dispatch(Actions.Web3Provider.setupEthereumProvider(rpcProvider));

  }

  connect() {
    let { dispatch } = this.props;
    let { rpcProvider } = this.state;
    dispatch(Actions.Web3Provider.setupEthereumProvider(rpcProvider));
  }

  handleAlertDismiss(){
    this.setState({showSuccess : false});
  }

  handleChange(e) {
    this.setState({rpcProvider : e.target.value});
  }

  providerForm(){
    return (
      <form>
        <FormGroup
          controlId="rpcProvider"
          validationState={null}
        >
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.rpcProvider}
              placeholder="Enter text"
              onChange={this.handleChange.bind(this)}
            />
            <InputGroup.Button>
              <Button bsStyle={'warning'} onClick={this.connect.bind(this)}>Connect</Button>
            </InputGroup.Button>

          </InputGroup>
        </FormGroup>
      </form>
    );
  }


  render(){

    let { Web3Provider } = this.props;
    let { showSuccess } = this.state;

    return (
      <div style={{
        marginRight : '33%',
        marginLeft : '33%',
        position: 'fixed',
        top: 10,
        zIndex:99
      }}>
        { Web3Provider.error ?
          <Alert bsStyle="warning">
            <h3>Warning! Error Connecting to Web3 Provider.</h3>
            <hr/>
            <h4>Please take one of the following actions:</h4>
            <h5>A) Download <a href="https://metamask.io/" target="_blank">MetaMask</a> and refresh the page once installed;</h5>
            <h5>B) Run a local Ethereum RPC provider with --rpc --rpccorsdomain flags set, see <a href="https://github.com/ethereum/wiki/wiki/JSON-RPC" target="_blank">instructions</a> ; or</h5>
            <h5>C) Connect to an Ethereum RPC provider below</h5>
            <br/>
            {this.providerForm()}
          </Alert> :
          <div>
            { showSuccess ?
              <Alert bsStyle="success" onDismiss={this.handleAlertDismiss.bind(this)}>
                <h3>Successfully connected to Ethereum RPC Provider!</h3>
                <br/>
                <h4>Provider: {Web3Provider.rpcProvider}</h4>
              </Alert> : null
            }
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    Web3Provider : state.Web3Provider,
  }
}

const W3Provider = connect(mapStateToProps)(W3ProviderComponent);

export default W3Provider;
