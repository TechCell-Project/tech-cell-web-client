export interface IMenu {
    name?: string;
    menu?: IMenuOptions[];
}

export interface IMenuOptions {
    label?: string;
    value?: number;
    to?: string;
}
