import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function NewExpenseForm({user, handleSetUserExpenses}){
  const [categories, setCategories] = useState([]);
  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: 0,
    paid_on: '',
    category_id: 1,
    user_id: user.id
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    fetch('/categories')
    .then(r => r.json())
    .then(category => setCategories(category))
  }, []);

  function handleChange(e) {
    const key = e.target.name
    setExpenseData({
      ...expenseData,
      [key]: e.target.value
    });
  };

  function handleExpenseSubmit(e){
    e.preventDefault();
    fetch("/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    }) .then((r) => {
      if (r.ok){
        r.json()
        .then((expense) => { handleSetUserExpenses(expense)
          setExpenseData({
            name: '',
            amount: 0,
            paid_on: '',
            category_id: 1,
            user_id: user.id
          })
          navigate("/")})
      } else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    })
  }

  return (
  <div>
    <form onSubmit={handleExpenseSubmit}>
      <div>
      <label>Category: </label>
      <select name="category_id" onChange={handleChange}>
        {categories.map((cat) => {
          return (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          )
        })}
      </select>
    </div>
    <div>
      <label>Name: </label>
      <input  name="name" value={expenseData.name} onChange={handleChange} />
    </div>
    <div>
      <label>Amount: </label>
      <input  name="amount" value={expenseData.amount} onChange={handleChange} />
    </div>
    <div>
    <label>Paid On: </label>
      <input type="date" name="paid_on" value={expenseData.date} onChange={handleChange}/>
    </div>
    <button type="submit">Create</button>
  </form>
</div>

)
}

export default NewExpenseForm