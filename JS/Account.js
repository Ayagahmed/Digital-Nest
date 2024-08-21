// var storedUsers = localStorage.getItem('Users');
   
const Admin = {
    "Id": 1,
    "Name": "admin",
    "Phone": "01154502546", 
    "Email": "admin@gmail.com", 
    "Password": "admin123",
    "Orders":[],
    "Admin": true
}

function InitializeAccount(){
    let CheckUsers = localStorage.getItem('Users');
   if(CheckUsers === null)
    {
        localStorage.setItem('Users',JSON.stringify([Admin]));
    }
    else{
        let JUsers = JSON.parse(CheckUsers);

        if( JUsers.find(e => e.Admin == true && e.Name == Admin.Name) === undefined)
        {
            localStorage.removeItem('Users');
            localStorage.setItem('Users',JSON.stringify([Admin]));
        }
    }
}

InitializeAccount();