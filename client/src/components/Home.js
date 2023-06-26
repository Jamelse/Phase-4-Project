import React, {useState, useEffect } from "react";

function Home(){
  const [categories, setCategories] = useState([])
  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: 0,
    paid: false,
    category_id: 1,
    user_id: null
  })
  
  useEffect(() => {
    fetch('/categories')
    .then(r => r.json())
    .then(category => setCategories(category))
  }, [])

  function handleChange(e) {
    const key = e.target.name
    setExpenseData({
      ...expenseData,
      [key]: e.target.value
    });
  };

  console.log(expenseData)

  return (
    <form>
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
    <button type="submit">Create</button>
  </form>
  )
}

export default Home