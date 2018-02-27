# Aether

Sometimes you want to have an ability to emit a custom event from one component and react on this event in another component. It can be implemented with passing callback function throught all of your components' hierarchy, for example:

```typescript
// ./App.tsx
import * as React from 'react';
import CustomButton from './CustomButton';
import Counter from './Counter';

export interface State {
    count: number;
}

export default class extends React.PureComponent<{}, State> {
    state = { count: 0 };

    render() { return (
        <CustomButton onClick={ () => this.handleCounterButtonClick() }>Click Me!</CustomButton>
        <Counter count={ this.state.count }/>

    handleCounterButtonClick() {
        this.setState({ count: this.state.count + 1 })
    }
```

```typescript
// ./CustomButton.tsx
import * as React from 'react';

export interface Props {
    onClick?: (event?: any) => void;
}

export default class extends React.PureComponent<Props, {}> {
    render() { return (
        <button onClick={(event) => this.handleClick(event) }>
            { this.props.children }
        </button>
    )}

    handleClick(event?: any) {
        if (this.props.onClick) { this.props.onClick(event) }
    }
}
```

```typescript
// ./Counter.tsx
import * as React from 'react';

export interface Props {
    count: number;
}

export default class extends React.PureComponent<Props, {}> {
    render() { return (
        <div> { this.props.count } </div>
    )}
}
```

In the example above, we should store count state inside our app. It leads to the situation when the component doesn't responsible for it own state. This situation can be changed if we start to treat our components as a first-class citizens inside our app and decouple them from each other using events.

```typescript
// ./App.tsx
import * as React from 'react';
import CustomButton from './CustomButton';
import Counter from './Counter';

export default class extends React.PureComponent<{}, State> {
    render() { return (
        <CustomButton>Click Me!</CustomButton>
        <Counter/>
    )}
```

```typescript
// ./CustomButton.tsx
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
```


```typescript
// ./Counter.tsx
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
        this.setState({ count: this.state.count + 1 })
    }
}
```