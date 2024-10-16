function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': "TU5c0161f5815d5b1b9f2bf811b1b81583f51f68c75483e3bfaaf69ecae9beaa96df067c4c531bcddce753562511787760",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "UserName": username, 
            "PassWord": password 
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('stid').innerHTML = '';
        document.getElementById('emid').innerHTML = '';
        document.getElementById('message').innerText = '';


        if (data.status == true) {
            if (data.type == "student") {
                document.getElementById('stid').innerHTML = `<p>ชื่อ-นามสกุล: ${data.displayname_th}</p>
                <p>Name: ${data.displayname_en}</p>
                <p>Faculty: ${data.faculty}</p>
                <p>Department: ${data.department}</p>
                `;

            } else if (data.type == "Employee") {
                document.getElementById('emid').innerHTML = `<p>ชื่อ-นามสกุล: ${data.displayname_th}</p>
                <p>Name: ${data.displayname_en}</p>
                <p>Department: ${data.department}</p>
                <p>Organization: ${data.organization}</p>`;
            }

        } else {
            document.getElementById('message').innerText = data.message; 
        }

    })
    .catch(error => console.error('Error:', error));
}
