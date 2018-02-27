export class AetherEvent {}


export function emit(event: AetherEvent) {
    eventBroker.dispatch(event);
}

export function listen(event: { new(...args: any[]): AetherEvent }, handler: (event?: AetherEvent) => void) {
    eventBroker.addListener(event, handler);
}

class AetherEventBroker {
    listeners: { [eventName: string]: ((event?: AetherEvent) => void)[] };

    constructor() {
        this.listeners = {}
    }

    dispatch(event: AetherEvent) {
        const eventClass: any = event.constructor;
        for (const handler of this.listeners[eventClass.name] || []) {
            handler(event)
        }
    }

    addListener(event: { new(...args: any[]): AetherEvent, name?: any }, handler: (event?: AetherEvent) => void) {
        if (!this.listeners[event.name]) { this.listeners[event.name] = [] }
        this.listeners[event.name].push(handler);
    }
}


const eventBroker = new AetherEventBroker;