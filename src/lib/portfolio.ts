export type AccountKind = "PEA" | "CRYPTO";

export type Holding = {
  name: string;
  ticker: string;
  account: AccountKind;
  value: number;
  change: number;
};

export type PortfolioSummary = {
  total: number;
  byAccount: Record<AccountKind, number>;
  percentByAccount: Record<AccountKind, number>;
  percentByHolding: Record<string, number>;
};

export function calculatePortfolio(holdings: Holding[]): PortfolioSummary {
  const total = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const byAccount: Record<AccountKind, number> = {
    PEA: holdings.filter((holding) => holding.account === "PEA").reduce((sum, holding) => sum + holding.value, 0),
    CRYPTO: holdings.filter((holding) => holding.account === "CRYPTO").reduce((sum, holding) => sum + holding.value, 0),
  };

  const percent = (value: number) => (total === 0 ? 0 : Math.round((value / total) * 100));

  return {
    total,
    byAccount,
    percentByAccount: {
      PEA: percent(byAccount.PEA),
      CRYPTO: percent(byAccount.CRYPTO),
    },
    percentByHolding: Object.fromEntries(holdings.map((holding) => [holding.ticker, percent(holding.value)])),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
