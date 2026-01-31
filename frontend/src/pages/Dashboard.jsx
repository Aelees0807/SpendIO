import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from '../assets/spendio-logo.png';
import { Wallet, TrendingUp, TrendingDown, LogOut, Download, Trash2, Plus, PenSquare } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ThemeToggle from "../components/ThemeToggle";
import API_URL from "../config/api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [formData, setFormData] = useState({ title: "", amount: "", type: "income", category: "Salary", paymentMethod: "offline", date: "" });
  const [editMode, setEditMode] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, income, expense
  const [filterMonth, setFilterMonth] = useState("all"); // all, or month-year like "2026-01"
  const [filterPaymentMode, setFilterPaymentMode] = useState("all"); // all, online, offline
  const navigate = useNavigate();

  // Fetch transactions from DB
  const getAllTransactions = async () => {
    try {
      if (!user) return;
      const userid = user._id;
      const res = await axios.post(`${API_URL}/transactions/get-transaction`, { userid });
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getAllTransactions();
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.post(`${API_URL}/transactions/edit-transaction`, {
          payload: {
            ...formData,
            userid: user._id,
          },
          transactionId: editableId
        });
        setEditMode(false);
        setEditableId(null);
      } else {
        await axios.post(`${API_URL}/transactions/add-transaction`, {
          ...formData,
          userid: user._id,
          reference: formData.title
        });
      }
      setFormData({ title: "", amount: "", type: "income", category: "Salary", paymentMethod: "offline", date: "" });
      getAllTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleEdit = (item) => {
    setEditMode(true);
    setEditableId(item._id);
    setFormData({
      title: item.reference,
      amount: item.amount,
      type: item.type,
      category: item.category,
      paymentMethod: item.paymentMethod || "offline",
      date: new Date(item.date).toISOString().split('T')[0]
    });
  };

  const deleteTransaction = async (recordId) => {
    // Show confirmation popup before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    
    if (confirmDelete) {
      try {
         await axios.post(`${API_URL}/transactions/delete-transaction`, {transacationId: recordId});
         getAllTransactions();
      } catch (error) {
          console.log(error);
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("hasVisited"); // Clear first-visit flag on logout
    navigate("/login");
  };
  
  // Filter transactions based on type, month, and payment mode
  const filteredTransactions = transactions.filter(t => {
    const typeMatch = filterType === "all" || t.type === filterType;
    const monthMatch = filterMonth === "all" || 
      new Date(t.date).toISOString().slice(0, 7) === filterMonth;
    const paymentMatch = filterPaymentMode === "all" || (t.paymentMethod || "offline") === filterPaymentMode;
    return typeMatch && monthMatch && paymentMatch;
  });

  // Get unique months from transactions for the dropdown
  const uniqueMonths = [...new Set(transactions.map(t => 
    new Date(t.date).toISOString().slice(0, 7)
  ))].sort().reverse();
  
  // Totals Calculation (using filtered transactions)
  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  // PDF Download Logic
  const generatePDF = () => {
     const doc = new jsPDF();
     doc.text("SpendIO Expense Report", 20, 10);
     autoTable(doc, {
        head: [['Date', 'Title', 'Type', 'Category', 'Payment', 'Amount']],
        body: filteredTransactions.map(t => [
          new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
          t.reference,
          t.type,
          t.category,
          t.paymentMethod === 'online' ? 'Online' : 'Offline',
          t.amount
        ])
     })
     doc.save("report.pdf");
  }

  const data = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  return (
    <div className="container fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logo} alt="SpendIO Logo" style={{ height: '50px' }} />
          <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>SpendIO</span>
        </div>
        <div className="user-profile">
           <span className="user-name" onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}>Hello, {user?.name}</span>
           <button onClick={handleLogout} className="btn btn-outline" style={{ border: 'none', color: 'var(--danger)' }}>
             <LogOut size={20} />
           </button>
           <ThemeToggle />
        </div>
      </header>

      <div className="summary-grid">
        <div className="summary-card balance">
          <h3>Total Balance</h3>
          <div className="amount">₹{totalIncome - totalExpense}</div>
          <Wallet className="absolute top-4 right-4 opacity-10" size={48} color="var(--primary)" style={{position: 'absolute', top: 20, right: 20, opacity: 0.1}} />
        </div>
        <div className="summary-card income">
          <h3>Total Income</h3>
          <div className="amount">₹{totalIncome}</div>
          <TrendingUp className="absolute top-4 right-4 opacity-10" size={48} color="var(--success)" style={{position: 'absolute', top: 20, right: 20, opacity: 0.1}} />
        </div>
        <div className="summary-card expense">
          <h3>Total Expense</h3>
          <div className="amount">₹{totalExpense}</div>
          <TrendingDown className="absolute top-4 right-4 opacity-10" size={48} color="var(--danger)" style={{position: 'absolute', top: 20, right: 20, opacity: 0.1}} />
        </div>
      </div>

      <div className="dashboard-col-2">
        <div className="form-card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>{editMode ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <form className="form-row" style={{ gridTemplateColumns: '1fr', gap: '1rem' }} onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Title" 
              className="input-field"
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required
            />
            <input 
              type="number" 
              placeholder="Amount" 
              className="input-field"
              value={formData.amount} 
              onChange={(e) => setFormData({...formData, amount: e.target.value})} 
              required
            />
            <select 
              className="input-field"
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value, category: e.target.value === 'income' ? 'Salary' : 'Food'})}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            
            <select 
              className="input-field"
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {formData.type === 'income' ? (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>

            <select 
              className="input-field"
              value={formData.paymentMethod} 
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            >
              <option value="offline">💵 Offline (Cash)</option>
              <option value="online">💳 Online (Digital)</option>
            </select>

            <input 
              type="date" 
              className="input-field"
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
              required
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Plus size={20} style={{ marginRight: 5 }} /> {editMode ? 'Update' : 'Add'} Transaction
            </button>
          </form>
        </div>

        <div className="summary-card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Overview</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Recent Transactions</h3>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Type Filter */}
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>

          {/* Month Filter */}
          <select 
            value={filterMonth} 
            onChange={(e) => setFilterMonth(e.target.value)}
            className="input-field"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
          >
            <option value="all">All Months</option>
            {uniqueMonths.map(month => (
              <option key={month} value={month}>
                {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>

          {/* Payment Mode Filter */}
          <select 
            value={filterPaymentMode} 
            onChange={(e) => setFilterPaymentMode(e.target.value)}
            className="input-field"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
          >
            <option value="all">All Payments</option>
            <option value="online">💳 Online Only</option>
            <option value="offline">💵 Offline Only</option>
          </select>

          <button className="btn btn-outline" onClick={generatePDF}>
            <Download size={18} style={{ marginRight: 8 }} /> Export PDF
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Type</th>
              <th>Category</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(t => (
                <tr key={t._id}>
                  <td>{new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')}</td>
                  <td>{t.reference}</td>
                  <td>
                    <span className={`badge ${t.type}`}>
                      {t.type}
                    </span>
                  </td>
                  <td>{t.category}</td>
                  <td>
                    <span className={`badge ${t.type}`} style={{ fontSize: '0.8rem' }}>
                      {t.paymentMethod === 'online' ? '💳 Online' : '💵 Offline'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>₹{t.amount}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-outline" style={{ padding: '0.4rem', border: 'none' }} onClick={() => handleEdit(t)}>
                      <PenSquare size={18} color="var(--primary)" />
                    </button>
                    <button className="btn-outline" style={{ padding: '0.4rem', border: 'none' }} onClick={() => deleteTransaction(t._id)}>
                      <Trash2 size={18} color="var(--danger)" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
               <tr>
                 <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                   No transactions found. Add one above!
                 </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;