export interface IOption {
    value: string;
    label: string;
}
export interface IProps {
    options: IOption[];
    setValue: (e: IOption | IOption[]) => void;
    className?: string;
    placeholder?: string;
    value?: IOption | IOption[]
    multiple?: boolean
}

