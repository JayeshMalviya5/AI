function simulateEvent(probabilities, numOccurrences) {
    const outcomes = probabilities.map((prob) => {
      const outcome = Object.keys(prob)[0];
      const probability = prob[outcome];
      return { outcome, probability };
    });

    const occurrenceCounts = {};

    for (let i = 0; i < numOccurrences; i++) {
      const rand = Math.random();
      let cumulativeProb = 0;

      for (const { outcome, probability } of outcomes) {
        cumulativeProb += probability / 100;

        if (rand <= cumulativeProb) {
          occurrenceCounts[outcome] = (occurrenceCounts[outcome] || 0) + 1;
          break;
        }
      }
    }

    return occurrenceCounts;
  }

  function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (const outcome in results) {
      const count = results[outcome];
      const resultText = `On triggering the event ${numOccurrences} times, ${outcome} appeared ${count} times.`;
      const resultPara = document.createElement('p');
      resultPara.textContent = resultText;
      resultsDiv.appendChild(resultPara);
    }
  }

  const simulateBtn = document.getElementById('simulateBtn');
  simulateBtn.addEventListener('click', function() {
    const probabilitiesInput = document.getElementById('probabilities');
    const probabilities = JSON.parse(probabilitiesInput.value);
    const numOccurrences = 1000;

    const results = simulateEvent(probabilities, numOccurrences);
    displayResults(results);
  });