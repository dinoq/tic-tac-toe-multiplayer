export enum GameType{
    TIC_TAC_TOE,
    FIVE_IN_A_ROW,
    NONE
}
export enum MultiplayerType{
    HOT_SEAT,
    INTERNET,
    NONE
}
export enum Page{
    MENU,
    SETTINGS,
    GAME,
    NOT_IMPLEMENTED
}

export const setGameType = (gType: GameType)=>{};
export const setMultiplayerType = (mType: MultiplayerType)=>{};
export const setPage = (page: Page)=>{};