export default _sfc_main;
declare namespace _sfc_main {
    const name: string;
    namespace props {
        namespace seed {
            export const type: NumberConstructor;
            const _default: number;
            export { _default as default };
        }
        namespace diameter {
            const type_1: NumberConstructor;
            export { type_1 as type };
            const _default_1: number;
            export { _default_1 as default };
        }
        namespace address {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default_2: null;
            export { _default_2 as default };
        }
        namespace shapeCount {
            const type_3: NumberConstructor;
            export { type_3 as type };
            const _default_3: number;
            export { _default_3 as default };
        }
        namespace colors {
            const type_4: ArrayConstructor;
            export { type_4 as type };
            function _default_4(): string[];
            export { _default_4 as default };
        }
    }
    function data(): {
        generator: null;
        svgns: string;
    };
    function data(): {
        generator: null;
        svgns: string;
    };
    namespace watch {
        export namespace seed_1 {
            function handler(): void;
            function handler(): void;
        }
        export { seed_1 as seed };
        export namespace address_1 {
            function handler(): void;
            function handler(): void;
        }
        export { address_1 as address };
        export namespace diameter_1 {
            function handler(): void;
            function handler(): void;
        }
        export { diameter_1 as diameter };
    }
    function mounted(): void;
    function mounted(): void;
    namespace methods {
        function addressToNumber(address: any): number;
        function addressToNumber(address: any): number;
        function icon(): Promise<void>;
        function icon(): Promise<void>;
        function newPaper(diameter: any, color: any): {
            container: HTMLDivElement;
        };
        function newPaper(diameter: any, color: any): {
            container: HTMLDivElement;
        };
        function generateIdenticon(diameter: any, seed: any): HTMLDivElement;
        function generateIdenticon(diameter: any, seed: any): HTMLDivElement;
        function genShape(remainingColors: any, diameter: any, i: any, total: any, svg: any): void;
        function genShape(remainingColors: any, diameter: any, i: any, total: any, svg: any): void;
        function genColor(colors: any): any;
        function genColor(colors: any): any;
        function hueShift(colors: any, generator: any): any;
        function hueShift(colors: any, generator: any): any;
    }
}
