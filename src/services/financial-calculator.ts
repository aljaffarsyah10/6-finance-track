/**
 * FINANCIAL CALCULATION ENGINE
 * Critical Core Logic - PRD Section 12.7
 * Strictly guarantees integer precision and prevents zero-division errors.
 */

export interface BudgetCalculationResult {
  remaining: bigint;
  percentage: number;
  isOver: boolean;
  isWarning: boolean;
}

/**
 * Formula: CurrentBalance = InitialBalance + TotalIncome - TotalExpense
 */
export function calculateAccountBalance(
  initialBalance: bigint | number,
  totalIncome: bigint | number,
  totalExpense: bigint | number
): bigint {
  const init = BigInt(initialBalance);
  const inc = BigInt(totalIncome);
  const exp = BigInt(totalExpense);

  return init + inc - exp;
}

/**
 * Formula: NetCashFlow = TotalIncome - TotalExpense
 */
export function calculateNetCashFlow(
  totalIncome: bigint | number,
  totalExpense: bigint | number
): bigint {
  const inc = BigInt(totalIncome);
  const exp = BigInt(totalExpense);

  return inc - exp;
}

/**
 * Formula: RemainingBudget = BudgetAmount - TotalExpense
 * Formula: Usage% = (TotalExpense / BudgetAmount) * 100
 * Safety: Division by zero is safeguarded (returns 0% if budget <= 0).
 */
export function calculateBudgetUsage(
  totalExpense: bigint | number,
  budgetAmount: bigint | number
): BudgetCalculationResult {
  const exp = BigInt(totalExpense);
  const bgt = BigInt(budgetAmount);

  const remaining = bgt - exp;

  if (bgt <= BigInt(0)) {
    return {
      remaining: -exp,
      percentage: exp > BigInt(0) ? 100 : 0,
      isOver: exp > BigInt(0),
      isWarning: false,
    };
  }

  // Calculate percentage multiplied by 100 with 1 decimal precision
  // (exp * BigInt(1000)) / bgt gives tenths of percentage
  const tenths = Number((exp * BigInt(1000)) / bgt);
  const percentage = Math.round(tenths) / 10;

  return {
    remaining,
    percentage,
    isOver: remaining < BigInt(0) || percentage >= 100,
    isWarning: percentage >= 80 && remaining >= BigInt(0) && percentage < 100,
  };
}

/**
 * Serializes BigInt fields to numbers/strings safe for JSON response transmission.
 */
export function serializeBigInt<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint"
        ? value <= BigInt(Number.MAX_SAFE_INTEGER)
          ? Number(value)
          : value.toString()
        : value
    )
  );
}
