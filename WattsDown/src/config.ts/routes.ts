import { IRouteProps } from "../library/RouteProp";
import HomePage from "../pages/homePage/HomePage";
import CreateTask from "../pages/createTask/CreateTask";

/*
 * used to specify routes
 * components needs to be of type: React.FunctionComponent<IStackScreenProps>
*/
const routes: IRouteProps[] = [
    {
        name: 'Home',
        component: HomePage
    },
    {
        name: 'New Task',
        component: CreateTask
    }
]

export default routes;