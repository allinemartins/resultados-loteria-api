class StatisticalData {

    constructor(game, draws) {
        this.game = game;
        this.draws = draws;
    }

    calculateStatisticalData() {        
        let frequencies = this.getStatisticalObject(this.game);
        if (this.draws.length > 0) {
            this.draws.sort((a, b) => b.draw - a.draw);
            this.getLastDrawFrequencyDelay(this.draws, frequencies);
            this.getLargestGapLastFrequencies(this.draws, frequencies);
        }
        return frequencies;
    }

    getStatisticalObject(game) {
        const frequencies = {};
        for (let number = game.number_min; number <= game.number_max; number++) {
            frequencies[number] = {};
            frequencies[number]['draw'] = 0;
            frequencies[number]['delayed'] = 0;
            frequencies[number]['lastDraw'] = 0;
            frequencies[number]['largestGap'] = 0;
            frequencies[number]['largestFrequency'] = 0;
            frequencies[number]['lastFrequency'] = 0;
        }
        return frequencies;
    }

    getLastDrawFrequencyDelay(draws, frequencies) {
        let lastDraw = draws[0].draw;
        draws.forEach((draw) => {            
            let scores = this.parseStringForArrayNumber(draw.scores);            
            scores.forEach((number) => {
                let nb = number;//Number(number);
                frequencies[nb].draw++;
                frequencies[nb].lastDraw = this.setLast(frequencies[nb].lastDraw, draw.draw);
                frequencies[nb].delayed = this.getDelay(lastDraw, frequencies[nb].lastDraw);
            });
        });
    }

    getLargestGapLastFrequencies(draws, frequencies) {
        for (let number in frequencies) {
            const intervals = this.calculateIntervals(draws, Number(number));
            frequencies[number].largestGap = intervals[0];
            frequencies[number].largestFrequency = intervals[1];
            frequencies[number].lastFrequency = intervals[2];
        }
    }

    setLast(lastDraw, currentDraw) {
        if (currentDraw > lastDraw) {
            return currentDraw;
        }
        return lastDraw;
    }

    getDelay(lastDraw, currentDraw) {
        return lastDraw - currentDraw;
    }

    calculateIntervals(draws, number) {
        let largestInterval = 0;
        let lastAppearance = -1;

        let largestConsecutiveFrequency = 0;
        let consecutiveFrequency = 0;

        let lastFrequency = 0;

        draws.forEach((list, index) => {
            let scores = this.parseStringForArrayNumber(list["scores"]);
            if (scores.includes(number)) {
                lastFrequency = this.lastFrequencyNumber(draws, number);

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

    lastFrequencyNumber(draws, number) {
        let count = 0;
        for (let i = 0; i < draws.length; i++) {
            const list = draws[i];
            const scores = this.parseStringForArrayNumber(list["scores"]);
            if (scores.includes(number)) {
                count++;
            } else {
                break; // Stops counting if the number is not present
            }
        }
        return count;
    }

    parseStringForArrayNumber(text){
        let textReplace = text.replace(/{|}|"/g, '').replace(/,/g, '","');
        let array = JSON.parse('["' + textReplace + '"]');
        array.forEach((number, index) => {
            array[index] = Number(number);
        });
        return array;
    }
}

module.exports = StatisticalData;
