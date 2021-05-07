import React from "react";
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent,SidebarFooter} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Secretaire = ()=> {
    const user= JSON.parse(localStorage.getItem('profile'))

    return(
        <>
            <ProSidebar >
                <SidebarHeader>
                    {'hello '+user.result.firstName}
                </SidebarHeader>
                <SidebarContent>
                    {<Menu iconShape="square">
                        <MenuItem>Dashboard</MenuItem>
                        <SubMenu title="Components">
                            <MenuItem>Component 1</MenuItem>
                            <MenuItem>Component 2</MenuItem>
                        </SubMenu>
                    </Menu>}
                </SidebarContent>
                <SidebarFooter>
                    {'yo'}
                </SidebarFooter>

            </ProSidebar>
        </>
    )
}
export default Secretaire