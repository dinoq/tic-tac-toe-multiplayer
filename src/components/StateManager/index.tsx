import React, { Component } from "react";
import { GameType, MultiplayerType, Page } from "../../helpers/constants";
import GamePage from "../../pages/GamePage";
import MainMenuPage from "../../pages/MainMenuPage";
import NotImpementedPage from "../../pages/NotImpementedPage";
import SettingsPage from "../../pages/SettingsPage";

interface IStateManagerProps {

}

interface IStateManagerState {
    currentPage: Page, //menu / settings / game / not-implemented
    gameType: GameType, // tic-tac-toe / five-in-row
    multiplayerType: MultiplayerType, //internet / hotseat

}
class StateManager extends Component<IStateManagerProps, IStateManagerState> {
    constructor(props: IStateManagerProps) {
        super(props);
        this.state = {
            currentPage: Page.MENU,
            gameType: GameType.NONE, // tic-tac-toe / five-in-row
            multiplayerType: MultiplayerType.NONE, //internet / hotseat
        }
    }

    setGameType(gType: GameType) {
        this.setState({
            gameType: gType
        });
    }

    setMultiplayerType(mType: MultiplayerType) {
        this.setState({
            multiplayerType: mType,
            currentPage: Page.GAME
        });
    }

    setPage(page: Page) {
        this.setState({
            currentPage: page
        })
    }
    render() {

        let screen = null;
        console.log('this.state: ', this.state);
        switch (this.state.currentPage) {
            case Page.GAME:
                screen = <GamePage gameType={this.state.gameType} setCurrentPage={this.setPage.bind(this)} setGameType={this.setGameType.bind(this)} setMultiplayerType={this.setMultiplayerType.bind(this)}/>
                break;
            case Page.SETTINGS:
                screen = <SettingsPage setCurrentPage={this.setPage.bind(this)} />
                break;
            case Page.NOT_IMPLEMENTED:
                screen = <NotImpementedPage setCurrentPage={this.setPage.bind(this)} />
                break;
            case Page.MENU:
            default:
                screen = <MainMenuPage setGameType={this.setGameType.bind(this)} setMultiplayerType={this.setMultiplayerType.bind(this)} setCurrentPage={this.setPage.bind(this)} gameType={this.state.gameType} />
                break;

        }

        return (
            <div>{screen}</div>
        );
    }
}

export default StateManager;