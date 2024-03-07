// Create New Account
function register() {
    // Fetch values
    username = document.getElementById('usrname').value;
    email = mail.value;
    password = pswd.value;

    accountDetails = {
        username,
        email,
        password,
        balance: 0
    }

    if (username in localStorage) {
        alert('User already exists!');
        // To signin form
        window.location = './index.html';
    }
    else {
        localStorage.setItem(username, JSON.stringify(accountDetails));
        alert('Account created successfully!');

        // To signin form
        window.location = './index.html';
    }
}

//Sign In
function signin() {
    username = signin_usr.value;
    password = signin_pswd.value;

    if (username in localStorage) {
        accountDetails = JSON.parse(localStorage.getItem(username));
        if (password == accountDetails.password) {
            alert('Login Successfull!');
            window.location = './calculator.html';
        }
        else {
            alert('Incorrect Password!!');
        }
    }
    else {
        alert('User does not exist! Create a new account!');
        window.location = './signup.html';
    }
}

// Profile name change
document.getElementById('profilename').innerHTML = `<i class="fa-solid fa-circle-user"></i> ${localStorage.key(0)}`;


// Income

let income = 0;
function addInc() {
    incomeType = incType.value;
    income = inc.value;
    income = Math.floor(income);
    username = localStorage.key(0);

    if (username in localStorage) {
        accountDetails = JSON.parse(localStorage.getItem(username));
        if (income <= 0 && expenseType != '') {
            alert('Value cannot be empty or negative!!');
        }
        else {
            accountDetails.balance += income;
            localStorage.setItem(username, JSON.stringify(accountDetails));
            alert('Amount added successfully!');
            balanceDis.textContent = `₹ ${accountDetails.balance}`;
            result1.innerHTML += `<tr class="details mt-3">
            <td>${incomeType}</td>
            <td style="text-align: end;" class="text-success">+ ₹${income}</td>
        </tr>`

        // Chart
        function addData(chart, label, newData) {
            chart.data.labels[0] = label;
            chart.data.datasets.forEach((dataset) => {
                dataset.data[0] = newData;
            });
            chart.update();
        }

        const addLabel = 'Total Balance';
        const addDataValue = accountDetails.balance;
        addData(myChart,addLabel,addDataValue);
        
        }
    }
    else {
        alert('Invalid account number!');
    }
}

// Expense
let expense = 0;
let totalExpense = 0;
function addExp() {
    expenseType = expType.value;
    expense = exp.value;
    expense = Math.floor(expense);
    username = localStorage.key(0);

    if (username in localStorage) {
        accountDetails = JSON.parse(localStorage.getItem(username));
        if (expense <= 0 && expenseType != '') {
            alert('Value cannot be empty or negative!!');
        }
        else {
            accountDetails.balance -= expense;
            totalExpense += expense;
            localStorage.setItem(username, JSON.stringify(accountDetails));
            alert('Amount added successfully!');
            balanceDis.textContent = `₹ ${accountDetails.balance}`;
            expDis.textContent = `- ₹${totalExpense}`;
            result2.innerHTML += `<tr class="details mt-3">
            <td>${expenseType}</td>
            <td style="text-align: end;" class="text-danger">- ₹${expense}</td>
        </tr>`

        // Chart
        function addData1(chart, label, newData) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(newData);
            });
            chart.data.datasets.forEach((dataset) => {
                dataset.data[0] = accountDetails.balance;
            });
            chart.update();
        }

        const addLabel = document.getElementById('expType').value;
        const addDataValue = document.getElementById('exp').value;
        addData1(myChart,addLabel,addDataValue);
        }
    }
    else {
        alert('Invalid account number!');
    }
}

// Clear
function clearAll() {
    username = localStorage.key(0);
    accountDetails = JSON.parse(localStorage.getItem(username));
    accountDetails.balance = 0;
    localStorage.setItem(username, JSON.stringify(accountDetails));
    balanceDis.textContent = '--';
    result1.innerHTML = '';
    expDis.textContent = '--';
    result2.innerHTML = '';
    incType.value = '';
    expType.value = '';
    inc.value = '';
    exp.value = '';
}

// Log out
function logout() {
    localStorage.clear();
    window.location = './index.html';
}

// Chart

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      data: [],
      borderWidth: 5,
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(255, 159, 64)',
        'rgba(255, 205, 86)',
        'rgba(75, 192, 192)',
        'rgba(54, 162, 235)',
        'rgba(153, 102, 255)',
        'rgba(201, 203, 207)',
        'rgba(51, 51, 255)',
        'rgba(255, 51, 51)',
      ],
    }]
  },
});