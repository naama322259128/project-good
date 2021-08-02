import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import './Login.scss';

function exampleReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default:
            throw new Error()
    }
}
const Login = () => {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
      })
    const { open, dimmer } = state

    return (
        <div>
             <Button onClick={() => dispatch({ type: 'OPEN_MODAL', size: 'mini' })}>
        Mini
      </Button>
            <Modal dimmer={dimmer} open={open} onClose={() => dispatch({ type: 'CLOSE_MODAL' })} className="modal">
                <input type="button" className="signInBtn" value="SIGN IN" />
                <input type="button" className="signUpBtn" value="SIGN UP" />
               {/* <Modal.Content className="img">  </Modal.Content> */}
                {/* <Modal.Header>Use Google's location service?</Modal.Header> */}
                {/* <Modal.Content>
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
        </Modal.Content> */}
                {/* <Modal.Actions>
                    <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        Disagree
          </Button>
                    <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        Agree
          </Button>
                </Modal.Actions> */}
            </Modal>
        </div>
    )
}

export default Login;