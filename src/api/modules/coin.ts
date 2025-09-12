// 头是1，字是0，维护一个数组就行了
type CoinResult = 0 | 1;
function getCoin() {
  return uni.getStorageSync("myCoins") || [];
}

function clearCoin() {
  uni.removeStorageSync("myCoins");
}

function addCoin(coin: CoinResult) {
  const coins = getCoin();
  coins.push(coin);
  uni.setStorageSync("myCoins", coins);
}

export { getCoin, addCoin, clearCoin };
