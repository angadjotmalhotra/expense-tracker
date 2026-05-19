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
    <form
      onSubmit={handleSubmit}
      className="bg-white/45 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-white/40 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Add Transaction
          </h2>
          <p className="text-sm text-slate-600">
            Record your income or expense
          </p>
        </div>

        <div className="h-12 w-12 rounded-2xl bg-emerald-900 text-white flex items-center justify-center text-2xl">
          +
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          className="input-style"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <select
          value={form.type}
          className="input-style"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={form.category}
          className="input-style"
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
          className="input-style"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <textarea
        placeholder="Description / Notes"
        value={form.note}
        className="input-style mt-4 min-h-[110px]"
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <button className="mt-5 w-full bg-emerald-900 hover:bg-emerald-950 transition-all text-white py-4 rounded-2xl font-black shadow-lg">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;