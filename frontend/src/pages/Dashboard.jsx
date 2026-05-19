import { useEffect, useState } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const currencies = {
  INR: { symbol: "₹", rate: 1, label: "INR" },
  USD: { symbol: "$", rate: 1 / 83, label: "USD" },
  CAD: { symbol: "C$", rate: 1 / 61, label: "CAD" },
  EUR: { symbol: "€", rate: 1 / 90, label: "EUR" },
  AED: { symbol: "د.إ", rate: 1 / 22.6, label: "AED" },
  GBP: { symbol: "£", rate: 1 / 105, label: "GBP" },
  AUD: { symbol: "A$", rate: 1 / 55, label: "AUD" },
  JPY: { symbol: "¥", rate: 1.8, label: "JPY" },
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("INR");

  const fetchTransactions = async () => {
    const { data } = await API.get("/transactions");
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
  const selectedCurrency = currencies[currency];

  const convertAmount = (amount) => {
    return (amount * selectedCurrency.rate).toFixed(2);
  };

  return (
    <div
      className="min-h-screen text-slate-900 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.18), rgba(255,255,255,0.30)), url('/finance-bg.png')",
      }}
    >
      <div className="grid lg:grid-cols-[280px_1fr] min-h-screen">
        <aside className="hidden lg:flex flex-col justify-between bg-white/25 backdrop-blur-2xl border-r border-white/40 p-6">
          <div>
            <div className="mb-10">
              <h1 className="text-4xl font-black text-emerald-950">
                SpendWise
              </h1>
              <p className="text-sm text-slate-700 mt-1">
                Track. Save. Thrive.
              </p>
            </div>

            <nav className="space-y-3">
              {[
                "Dashboard",
                "Transactions",
                "Categories",
                "Budgets",
                "Reports",
                "Wallets",
                "Settings",
              ].map((item, index) => (
                <button
                  key={item}
                  className={`w-full text-left px-5 py-3 rounded-2xl font-semibold transition-all ${
                    index === 0
                      ? "bg-emerald-900 text-white shadow-xl"
                      : "text-slate-700 hover:bg-white/40"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white/35 backdrop-blur-2xl rounded-3xl p-5 border border-white/40 shadow-xl">
            <p className="text-sm text-slate-700">
              Small steps today, big freedom tomorrow.
            </p>
            <button className="mt-5 w-full bg-emerald-900 hover:bg-emerald-950 text-white py-3 rounded-2xl">
              Add Transaction
            </button>
          </div>
        </aside>

        <main className="p-5 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <h2 className="text-5xl font-black text-slate-950">
                Good morning 👋
              </h2>
              <p className="text-slate-700 mt-2 text-lg">
                Welcome to SpendWise. Here’s your money snapshot.
              </p>
            </div>

            <div className="flex gap-3">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white/50 backdrop-blur-2xl border border-white/40 px-4 py-3 rounded-2xl shadow-lg outline-none"
              >
                {Object.entries(currencies).map(([code, item]) => (
                  <option key={code} value={code}>
                    {item.label} {item.symbol}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-6">
            <StatCard title="Total Income" value={`${selectedCurrency.symbol}${convertAmount(income)}`} color="text-emerald-700" />
            <StatCard title="Total Expenses" value={`${selectedCurrency.symbol}${convertAmount(expense)}`} color="text-red-500" />
            <StatCard title="Net Balance" value={`${selectedCurrency.symbol}${convertAmount(balance)}`} color="text-blue-600" />
            <StatCard title="Savings Rate" value={`${savingsRate}%`} color="text-amber-500" />
          </div>

          <div className="grid xl:grid-cols-[1fr_420px] gap-6">
            <div className="space-y-6">
              <TransactionForm onTransactionAdded={fetchTransactions} />
              <TransactionList
                transactions={transactions}
                onDelete={fetchTransactions}
                currencySymbol={selectedCurrency.symbol}
                convertAmount={convertAmount}
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white/45 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-white/40 p-6">
                <h3 className="text-xl font-black mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["Add Budget", "Scan Receipt", "Export Report", "Set Goal"].map(
                    (item) => (
                      <button
                        key={item}
                        className="bg-white/45 hover:bg-white/65 transition-all border border-white/40 rounded-2xl p-5 text-sm font-bold text-emerald-950 shadow-sm"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="bg-emerald-950/90 backdrop-blur-xl text-white rounded-[2rem] p-6 shadow-xl">
                <h3 className="text-xl font-black">Money Tip</h3>
                <p className="text-emerald-100 mt-3">
                  A budget is telling your money where to go instead of wondering where it went.
                </p>
              </div>

              <div className="bg-white/45 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-white/40 p-6">
                <h3 className="text-xl font-black mb-4">Monthly Summary</h3>
                <div className="space-y-3 text-sm">
                  <SummaryRow label="Transactions" value={transactions.length} />
                  <SummaryRow
                    label="Income Entries"
                    value={transactions.filter((t) => t.type === "income").length}
                  />
                  <SummaryRow
                    label="Expense Entries"
                    value={transactions.filter((t) => t.type === "expense").length}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-white/45 backdrop-blur-2xl p-6 rounded-[2rem] shadow-xl border border-white/40">
    <p className="text-slate-700 font-medium">{title}</p>
    <h3 className={`text-3xl font-black mt-2 ${color}`}>{value}</h3>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between bg-white/35 border border-white/30 rounded-2xl px-4 py-3">
    <span>{label}</span>
    <span className="font-black">{value}</span>
  </div>
);

export default Dashboard;