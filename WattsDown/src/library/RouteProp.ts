import { IStackScreenProps } from "./Stack.ScreenProps";


export interface IRouteProps {
    component: React.FunctionComponent<IStackScreenProps>;
    name: string;
}