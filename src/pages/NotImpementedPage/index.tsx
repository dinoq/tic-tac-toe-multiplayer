import React, { Component } from "react";
import { Page, setPage } from "../../helpers/constants";

interface INotImpementedPageProps {
    setCurrentPage: typeof setPage
}
interface INotImpementedPageState {

}
class NotImpementedPage extends Component<INotImpementedPageProps, INotImpementedPageState>{
    render() {
        return (
            <div className="flex-center">
                <div className="flex-column content-container">
                    <h1>NOT IMPLEMENTED YET!</h1>
                    <button onClick={() => this.props.setCurrentPage(Page.MENU)}>Zpět</button>
                </div>
            </div>
        )
    }
}

export default NotImpementedPage;
