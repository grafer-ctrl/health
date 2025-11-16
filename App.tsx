
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Expense } from './types';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import SalaryInput from './components/SalaryInput';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SpendingVisual from './components/SpendingVisual';

const App: React.FC = () => {
  const [salary, setSalary] = useState<number>(() => {
    const savedSalary = localStorage.getItem('salary');
    // Atur gaji default 2 juta jika belum ada data tersimpan
    return savedSalary ? JSON.parse(savedSalary) : 2000000;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('salary', JSON.stringify(salary));
  }, [salary]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const remainingBalance = useMemo(() => {
    return salary - totalExpenses;
  }, [salary, totalExpenses]);

  const handleSetSalary = (amount: number) => {
    setSalary(amount);
  };

  const handleAddExpense = (description: string, amount: number) => {
    const newExpense: Expense = {
      id: new Date().getTime().toString(),
      description,
      amount,
      date: new Date().toISOString(),
    };
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
  };

  const handleDeleteExpense = (id: string) => {
    // Tambahkan konfirmasi sebelum menghapus
    if (window.confirm('Apakah Anda yakin ingin menghapus pengeluaran ini?')) {
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    }
  };
  
  const handleStartEdit = (expense: Expense) => {
    setEditingExpense(expense);
    // Gulir ke formulir secara otomatis saat tombol edit diklik
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(expense => 
        expense.id === updatedExpense.id ? { ...updatedExpense, date: expense.date } : expense
      )
    );
    setEditingExpense(null);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-gray-800">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header />

        <main>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Gaji Awal" amount={salary} colorClass="text-blue-600" />
            <SummaryCard title="Total Pengeluaran" amount={totalExpenses} colorClass="text-red-600" />
            <SummaryCard title="Sisa Gaji" amount={remainingBalance} colorClass={remainingBalance >= 0 ? "text-green-600" : "text-red-600"} />
          </section>

          <SpendingVisual salary={salary} totalExpenses={totalExpenses} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8 lg:sticky lg:top-8">
              <div ref={formRef} className="scroll-mt-8">
                 <SalaryInput salary={salary} onSetSalary={handleSetSalary} />
              </div>
              <ExpenseForm 
                onAddExpense={handleAddExpense}
                editingExpense={editingExpense}
                onUpdateExpense={handleUpdateExpense}
                onCancelEdit={handleCancelEdit}
              />
            </div>
            
            <div className="lg:col-span-1">
                 <ExpenseList 
                    expenses={expenses} 
                    onEditExpense={handleStartEdit} 
                    onDeleteExpense={handleDeleteExpense} 
                />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
