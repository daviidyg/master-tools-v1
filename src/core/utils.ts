export const rxConditional = (condition: boolean) => (elementA: () => JSX.Element) => (elementB: () => JSX.Element) =>
    condition ? elementA() : elementB();

export const rxIf = (condition: boolean) => (elementA: () => JSX.Element) =>
    rxConditional(condition)(elementA)(() => null);

export const random = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

