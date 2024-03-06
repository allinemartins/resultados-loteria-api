module.exports.calculateStatisticalData = function (draws, game) {
    let frequencies = getStatisticalObject(game);
    if(draws.length > 0){
        draws.sort((a, b) => b.draw - a.draw);
        getLastDrawFrequencyDelay(draws, frequencies);
        getLargestGapLastFrequencies(draws, frequencies);
    }
    return frequencies;
}

function getStatisticalObject(game){
    const frequencies = {};    
    for (let number = game.nmMin; number <= game.nmMax; number++) {
        frequencies[number] = {};
        frequencies[number]['drawn'] = 0;
        frequencies[number]['delayed'] = 0;
        frequencies[number]['lastDraw'] = 0;
        frequencies[number]['largestGap'] = 0;
        frequencies[number]['largestFrequency'] = 0;
        frequencies[number]['lastFrequency'] = 0;
    }
    return frequencies;
}

function getLastDrawFrequencyDelay(draws, frequencies) {
    let lastDraw = draws[0].drawn;
    draws.forEach((draw) => {        
        draw.scores.forEach((number) => {
            frequencies[number].drawn++;
            frequencies[number].lastDraw = setLast(frequencies[number].lastDraw, draw.drawn);
            frequencies[number].delayed = getDelay(lastDraw, frequencies[number].lastDraw);
        });
    });
}

function getLargestGapLastFrequencies(draws, frequencies) {
    for (let number in frequencies) {
        const intervals = calculateIntervals(draws, Number(number));
        frequencies[number].largestGap = intervals[0];
        frequencies[number].largestFrequency = intervals[1];
        frequencies[number].lastFrequency = intervals[2];
    }
}

function setLast(lastDraw, currentDraw) {
    if (currentDraw > lastDraw) {
        return currentDraw;
    }
    return lastDraw;
}

function getDelay(lastDraw, currentDraw) {
    return lastDraw - currentDraw;
}

function calculateIntervals(draws, number) {
    let largestInterval = 0;
    let lastAppearance = -1;

    let largestConsecutiveFrequency = 0;
    let consecutiveFrequency = 0;

    let lastFrequency = 0;

    draws.forEach((list, index) => {
        if (list["scores"].includes(number)) {

            lastFrequency = lastFrequencyNumber(draws, number);

            const interval = index - lastAppearance;
            if (interval > largestInterval) {
                largestInterval = interval;
            }
            lastAppearance = index;

            consecutiveFrequency++;
            if (consecutiveFrequency > largestConsecutiveFrequency) {
                largestConsecutiveFrequency = consecutiveFrequency;
            }

        } else {
            consecutiveFrequency = 0;
        }
    });

    return [largestInterval, largestConsecutiveFrequency, lastFrequency];
}

function lastFrequencyNumber(draws, number) {
    let count = 0;

    for (let i =  0; i < draws.length; i++) {
        const list = draws[i];

        if (list["scores"].includes(number)) {
            count++;
        } else {
            break; // Stops counting if the number is not present
        }
    }

    return count;
}
