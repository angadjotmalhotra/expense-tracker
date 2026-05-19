const Dashboard = () => {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <h1 className="text-4xl font-bold mb-6">Expense Dashboard</h1>
  
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400">Total Income</p>
            <h2 className="text-3xl font-bold mt-2">₹0</h2>
          </div>
  
          <div className="bg-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400">Total Expenses</p>
            <h2 className="text-3xl font-bold mt-2">₹0</h2>
          </div>
  
          <div className="bg-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400">Balance</p>
            <h2 className="text-3xl font-bold mt-2">₹0</h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;