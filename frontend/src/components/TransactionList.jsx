import API from "../api/axios";

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      onDelete();
    } catch (error) {
      alert("Failed to delete transaction");
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-5">Recent Transactions</h2>

      <div className="space-y-4">
        {transactions.length === 0 && (
          <p className="text-slate-400">No transactions yet.</p>
        )}

        {transactions.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-slate-800 p-4 rounded-xl"
          >
            <div>
              <h3 className="font-semibold">{item.category}</h3>
              <p className="text-sm text-slate-400">{item.note}</p>
              <p className="text-xs text-slate-500">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  item.type === "income" ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.type === "income" ? "+" : "-"} ₹{item.amount}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-xs text-red-300 hover:text-red-500"
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