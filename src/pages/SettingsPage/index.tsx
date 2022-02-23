import React, { Component } from "react";
import { Page, setPage } from "../../helpers/constants";

interface ISettingsPageProps {
    setCurrentPage: typeof setPage
}
interface ISettingsPageState {

}
class SettingsPage extends Component<ISettingsPageProps, ISettingsPageState>{
    render() {
        return (
            <div className="flex-center">
                <div className="flex-column content-container">
                    <button onClick={() => this.props.setCurrentPage(Page.MENU)}>Uložit</button>
                </div>
            </div>
        )
    }
}

export default SettingsPage;
