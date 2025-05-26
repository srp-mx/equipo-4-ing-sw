import { useState } from "react";
import UserData from "./UserData";
import PasswordData from "./PasswordData";
import DeleteAccount from "./DeleteAccount";

const SettingsPage = () => {
    return (
        <>
            <UserData/>
            <PasswordData/>
            <DeleteAccount/>
        </>
    );
}


  export default SettingsPage;