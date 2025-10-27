import fetch from "node-fetch";

export async function getTonTransactions(address) {
  try {
    const res = await fetch(
      `https://tonapi.io/v2/blockchain/accounts/${address}/transactions`
    );
    const data = await res.json();

    if (!data.transactions) return [];

    const txs = data.transactions.map((tx) => {
      const from = tx.in_msg?.source?.address || "Noma’lum manba";
      const to = tx.in_msg?.destination?.address || "Noma’lum qabulchi";
      const value = tx.in_msg?.value ? tx.in_msg.value / 1e9 : 0; // nanotondan TON ga
      const date = new Date(tx.in_msg?.created_at * 1000).toLocaleString("uz-UZ");
      return { from, to, value, date };
    });

    return txs;
  } catch (err) {
    console.error("TON API xato:", err);
    return [];
  }
}
