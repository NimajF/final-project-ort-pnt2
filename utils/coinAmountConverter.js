
export function coinAmountConverter(userCash, coinPrice) {
    return (userCash / coinPrice).toFixed(3);
}
