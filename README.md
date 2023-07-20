# BudgetBudE
BudgetBudE is a finance budgeter / calculator that lets you track all of your monthly incomes and expenses in an easy to read way. 

## Tech Used

Back-End

- Ruby
- Rails
- ActiveRecord
- SQL
- Active Model Serializers
- Bcrypt

Front-End

- JavaScript
- React
- React Router
- HTML
- CSS

## Installation
In your terminal run:

```sh
bundle install

# creates migrations and required seeding for categories
rails db:migrate db:seed

# start back-end server
rails s

#install front-end dependencies
npm install --prefix-client

#start front-end server
npm start --prefix-client
```

## Features

- create a user profile with a secure password
- login that persists using cookies
- ability to update user income, first name, last name, and email
- add user expenses to dynamically calculate the difference of monthly income - expenses
- expenses displayed with an easy to read pie chart that dynamically changes
- delete an individual expense or reset all of your expenses for the month anytime

## Video Walkthrough
[https://youtu.be/vbyR7BtXPqE](https://youtu.be/vbyR7BtXPqE)

## License
#### Copyright 2023 Jacob Amelse
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

