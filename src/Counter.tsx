import * as React from 'react';
import { CounterButtonWasClicked } from './CustomButton';
import { listen } from './Aether';

export interface State {
    count: number;
}

export default class extends React.PureComponent<{}, State> {
    state = { count: 0 };

    render() { return (
        <div> { this.state.count } </div>
    )}

    componentDidMount() {
        listen(CounterButtonWasClicked, () => this.handleCounterButtonClick())
    }

    handleCounterButtonClick() {
        this.setState({...this.state, count: this.state.count + 1})
    }
}