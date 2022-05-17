declare const _sfc_main: import("vue").DefineComponent<{
    txnCount: {
        type: NumberConstructor;
        default: number;
    };
    address: {
        type: StringConstructor;
        required: true;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        txnCount: {
            type: NumberConstructor;
            default: number;
        };
        address: {
            type: StringConstructor;
            required: true;
        };
        dark: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
    }>>;
    connected: import("vue").ComputedRef<boolean | "">;
    Spinner: import("vue").DefineComponent<{}, {}, any, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    AddressButton: import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>;
    Jazzicon: {
        name: string;
        props: {
            seed: {
                type: NumberConstructor;
                default: number;
            };
            diameter: {
                type: NumberConstructor;
                default: number;
            };
            address: {
                type: StringConstructor;
                default: null;
            };
            shapeCount: {
                type: NumberConstructor;
                default: number;
            };
            colors: {
                type: ArrayConstructor;
                default: () => string[];
            };
        };
        data(): {
            generator: null;
            svgns: string;
        };
        watch: {
            seed: {
                handler(): void;
            };
            address: {
                handler(): void;
            };
            diameter: {
                handler(): void;
            };
        };
        mounted(): void;
        methods: {
            addressToNumber(address: any): number;
            icon(): Promise<void>;
            newPaper(diameter: any, color: any): {
                container: HTMLDivElement;
            };
            generateIdenticon(diameter: any, seed: any): HTMLDivElement;
            genShape(remainingColors: any, diameter: any, i: any, total: any, svg: any): void;
            genColor(colors: any): any;
            hueShift(colors: any, generator: any): any;
        };
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    txnCount: {
        type: NumberConstructor;
        default: number;
    };
    address: {
        type: StringConstructor;
        required: true;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    txnCount: number;
    dark: boolean;
}>;
export default _sfc_main;
