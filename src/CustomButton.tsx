import * as React from 'react';
import { AetherEvent, emit } from './Aether';


export default class extends React.PureComponent<{}, {}> {
    render() { return (
        <button onClick={() => emit(new CounterButtonWasClicked())}>
            { this.props.children }
        </button>
    )}
}


export class CounterButtonWasClicked extends AetherEvent {}