import { useState } from "react";
import API from "../api/axios";

const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Salary",
  "Entertainment",
];

const TransactionForm = ({ onTransactionAdded }) => {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "Food",
    note: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", {
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        amount: "",
        type: "expense",
        category: "Food",
        note: "",
        date: "",
      });

      onTransactionAdded();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-5">Add Transaction</h2>

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        className="w-full p-3 rounded-lg mb-4 text-black"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />

      <select
        value={form.type}
        className="w-full p-3 rounded-lg mb-4 text-black"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={form.category}
        className="w-full p-3 rounded-lg mb-4 text-black"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={form.date}
        className="w-full p-3 rounded-lg mb-4 text-black"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <textarea
        placeholder="Description / Notes"
        value={form.note}
        className="w-full p-3 rounded-lg mb-4 text-black"
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;