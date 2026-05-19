import { useEffect, useState } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="w-full px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Expense Dashboard</h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-500 px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-slate-400">Total Income</p>
            <h2 className="text-3xl font-bold mt-2 text-green-400">
              ₹{income}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-slate-400">Total Expenses</p>
            <h2 className="text-3xl font-bold mt-2 text-red-400">
              ₹{expense}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <p className="text-slate-400">Balance</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              ₹{balance}
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <TransactionForm onTransactionAdded={fetchTransactions} />
          <TransactionList
            transactions={transactions}
            onDelete={fetchTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;