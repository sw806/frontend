import { IRouteProps } from "../library/RouteProp";
import HomePage from "../pages/homePage/HomePage";
import EditTask from "../pages/editTask/EditTask";
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
    },
    {
        name: "Edit Task",
        component: EditTask
    }
]

export default routes;