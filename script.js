document.getElementById('voucher-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const quantity = parseInt(document.getElementById('voucher-quantity').value);
    const voucherCodesList = document.getElementById('voucher-codes');
    voucherCodesList.innerHTML = '';
    
    generateVouchers(cardNumber, quantity, voucherCodesList);
});

function generateVouchers(cardNumber, quantity, voucherCodesList) {
    const url = `https://api.teeg.cloud/vouchers/campaigns/VPBE5ZJ/cards/${cardNumber}?tz=MIDAB38D4F`;
    const headers = {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imp0X1htek9Od2NqTlg0VFhjTjRvMUhNM2k5aUtpczlpSGgxYTllcEdENGsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI2ZjcyYzI3NS01MWI5LTQ2M2ItODQxMS0zYjA0OTM2Y2UxODkiLCJpc3MiOiJodHRwczovL2lkZW50aXR5LnRlZWcuY2xvdWQvYWYyMWUwNTYtMGEyMS00ZDgzLWI1ZGQtNDRjNDM5ZmE4ZjMwL3YyLjAvIiwiZXhwIjoxNzIxMTQzMTA5LCJuYmYiOjE3MjExNDIyMDksImlwQWRkcmVzcyI6IjEwNC4yOC4yNDcuMTM1Iiwib2lkIjoiNjBhOTU1MzctNjNjNy00YmU2LTliYmEtNDk2MzRjNmM4Y2JkIiwi
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({ quantity: quantity });

    fetch(url, { method: 'POST', headers: headers, body: body })
        .then(response => {
 if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.voucherCodes && Array.isArray(data.voucherCodes)) {
                data.voucherCodes.forEach(code => {
                    const listItem = document.createElement('li');
                    listItem.innerText = code;
                    voucherCodesList.appendChild(listItem);
                });
                document.getElementById('voucher-result').classList.remove('hidden');
            } else {
                throw new Error('Voucher codes not found in response');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to generate vouchers. Please try again.');
        });
}
