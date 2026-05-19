import API from "../api/axios";

const TransactionList = ({
  transactions,
  onDelete,
  currencySymbol = "₹",
  convertAmount = (amount) => Number(amount).toFixed(2),
}) => {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      onDelete();
    } catch (error) {
      alert("Failed to delete transaction");
    }
  };

  return (
    <div className="bg-white/45 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-white/40 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black text-slate-950">
            Recent Transactions
          </h2>
          <p className="text-sm text-slate-600">
            Your latest financial activity
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 && (
          <div className="bg-white/40 border border-white/30 rounded-3xl p-8 text-center">
            <p className="text-slate-600 font-medium">No transactions yet.</p>
          </div>
        )}

        {transactions.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white/45 hover:bg-white/65 transition-all border border-white/40 p-4 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-white ${
                  item.type === "income" ? "bg-emerald-700" : "bg-red-500"
                }`}
              >
                {item.type === "income" ? "+" : "-"}
              </div>

              <div>
                <h3 className="font-black text-slate-950">{item.category}</h3>
                <p className="text-sm text-slate-600">
                  {item.note || "No notes added"}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`text-lg font-black ${
                  item.type === "income" ? "text-emerald-700" : "text-red-500"
                }`}
              >
                {item.type === "income" ? "+" : "-"} {currencySymbol}
                {convertAmount(item.amount)}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-xs text-red-500 hover:text-red-700 font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;