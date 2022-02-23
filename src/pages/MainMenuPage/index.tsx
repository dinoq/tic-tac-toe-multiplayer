import React, { Component } from "react"
import { GameType, MultiplayerType, Page, setGameType, setMultiplayerType, setPage } from "../../helpers/constants";

interface IMainMenuPageProps {
    setGameType: typeof setGameType,
    setMultiplayerType: typeof setMultiplayerType,
    setCurrentPage: typeof setPage
    gameType: GameType, // tic-tac-toe / five-in-row
}
interface IMainMenuPageState {

}
class MainMenuPage extends Component<IMainMenuPageProps, IMainMenuPageState>{
    constructor(props: IMainMenuPageProps) {
        super(props);
    }

    render() {
        let screen = null;
        if (this.props.gameType === GameType.TIC_TAC_TOE) {

            screen = (<div className="flex-column content-container">
                <button onClick={(e) => this.props.setMultiplayerType(MultiplayerType.HOT_SEAT)}>hot seat</button>
                <button onClick={(e) => this.props.setCurrentPage(Page.NOT_IMPLEMENTED)}>Internet</button>
                <button onClick={() => this.props.setGameType(GameType.NONE)}>Zpět</button>
            </div>)
        } else if (this.props.gameType === GameType.FIVE_IN_A_ROW) {

            screen = (<div className="flex-column content-container">
                <button onClick={(e) => this.props.setCurrentPage(Page.NOT_IMPLEMENTED)}>hot seat</button>
                <button onClick={(e) => this.props.setCurrentPage(Page.NOT_IMPLEMENTED)}>Internet</button>
                <button onClick={() => this.props.setGameType(GameType.NONE)}>Zpět</button>
            </div>)
        } else {
            screen = (<div className="flex-column content-container">
                <button onClick={() => this.props.setGameType(GameType.TIC_TAC_TOE)}>Tic Tac Toe</button>
                <button onClick={() => this.props.setGameType(GameType.FIVE_IN_A_ROW)}>Piškvorky</button>
                <button onClick={() => this.props.setCurrentPage(Page.SETTINGS)}>Nastavení</button>
            </div>)
        }
        return (
            <div className="flex-center">{screen}</div>
        )
    }
}

export default MainMenuPage;