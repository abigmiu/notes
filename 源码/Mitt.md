https://github.dev/developit/mitt

类型声明有点绕

```TypeScript
export type EventType = string | symbol;

// 事件处理器
export type Handler<T = unknown> = (event: T) => void;
// 通配符事件处理器
export type WildcardHandler<T = Record<string, unknown>> = (
    type: keyof T,
    event: T[keyof T]
) => void;

// 一个 type 已注册的事件列表
export type EventHandlerList<T = unknown> = Array<Handler<T>>
export type WildcardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>

// 事件类型及其相应事件处理程序的映射。
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
    keyof Events | '*',
    EventHandlerList<Events[keyof Events]> | WildcardEventHandlerList<Events>
>

export interface Emitter<Events extends Record<EventType, unknown>> {
    all: EventHandlerMap<Events>;

    on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
    on(type: '*', handler: WildcardHandler<Events>): void;

    off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void
    off(type: '*', handler: WildcardHandler<Events>): void;

    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
    emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}

export default function mitt<Events extends Record<EventType, unknown>>(
    all?: EventHandlerMap<Events>
): Emitter<Events> {
    type GenericEventHandler = Handler<Events[keyof Events]> | WildcardHandler<Events>

    all = all || new Map();

    return {
        all,
        on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
            const handlers: Array<GenericEventHandler> | undefined = all!.get(type)

            if (handlers) {
                handlers.push(handler)
            } else {
                all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>)
            }

        },
        off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
            const handlers: Array<GenericEventHandler> | undefined = all!.get(type)

            if (handlers) {
                if (handler) {
                    // 在搜索的事件监听函数不存在时，会返回一个极大的正数，传入 splice 后，并不会删除已有的函数监听器
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1)
                } else {
                    all!.set(type, [])
                }
            }
        },
        emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
            let handlers = all!.get(type)

            if (handlers) {
                (handlers as EventHandlerList<Events[keyof Events]>)
                    .slice()
                    .map((handler) => {
                        handler(evt!)
                    })
            }

            handlers = all!.get('*')
            if (handlers) {
                (handlers as WildcardEventHandlerList<Events>)
                    .slice()
                    .map((handler) => {
                        handler(type, evt!)
                    })
            }

         },
    }
}
```