export type AddProductToBasketResponse ={
    isSuccess: true;
    id: string;
} | {
    isSuccess: false;
}
export interface RemoveProductFromBasketResponse{
    isSuccess: boolean;
}
export type GetTotalPriceResponse = number | {};
export interface GetBasketStatsResponse{
    itemInBasketAvgPrice: number;
    basketAvgTotalPrice: number;
}