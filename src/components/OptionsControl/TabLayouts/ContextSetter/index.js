import React, { Component } from 'react'
import {Panel, FormGroup} from 'react-bootstrap'
import {Toggle} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ContextSetter extends Component {
    render() {
        const {context, toggleContextModel, deck} = this.props
        return (
            <MuiThemeProvider>
                <FormGroup style={{
                    overflow:'auto',
                    paddingTop: 10,
                    paddingLeft: 15,
                    paddingRight: 15}}>
                    <Panel>
                        <Toggle
                            disabled={deck == 0}
                            defaultToggled={context === '3d'}
                            onToggle={toggleContextModel}
                            label={`Контекст: ${context}`}/>
                    </Panel>
                </FormGroup>
            </MuiThemeProvider>
        );
    }
}