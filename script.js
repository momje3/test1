function fetchRacerData() {
    const username = document.getElementById('usernameInput').value.trim();
    if (username === '') {
        alert('Please enter a NitroType username.');
        return;
    }

    const url = `https://www.nitrotype.com/racer/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, 'text/html');

            const usernameElement = htmlDocument.querySelector('.user-heading h1').innerText;
            const topWPM = htmlDocument.querySelector('.speedometer-text.speedometer-avg .tsl.twb.tlh-1 span').innerText;
            const avgWPM = htmlDocument.querySelector('.tsxxl.twb.tlh-1').innerText;
            const totalRaces = htmlDocument.querySelector('.profile-totalRaces').innerText.split(/\D+/)[0];
            const level = htmlDocument.querySelector('.tc-fuel').innerText.split(/\D+/)[1];

            document.getElementById('username').innerText = usernameElement;
            document.getElementById('topWPM').innerText = topWPM;
            document.getElementById('avgWPM').innerText = avgWPM;
            document.getElementById('totalRaces').innerText = totalRaces;
            document.getElementById('level').innerText = level;

            // Determine badge based on level
            const badgeElement = document.getElementById('badge');
            if (parseInt(level) >= 250) {
                badgeElement.innerText = 'Botter';
                badgeElement.classList.add('redBadge');
            } else {
                badgeElement.innerText = 'Legit Racer';
                badgeElement.classList.add('greenBadge');
            }

            // Display car image
            const carImageSrc = htmlDocument.querySelector('.car-image img').src;
            document.getElementById('carImage').src = carImageSrc;

            document.getElementById('racerInfo').classList.remove('hidden');
        })
        .catch(error => {
            alert('Error fetching data. Please try again later.');
            console.error('Error:', error);
        });
}
