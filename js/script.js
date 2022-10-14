const cards = document.querySelectorAll('.card');
let lastBlockValue = '',
    resizeTimer,
    isExtraBlocksHidden = false;

const giveClassToBlock = (object, startIndex, isAdd) => {
    if (isAdd) {
        for (let i = startIndex; i < object.length; i++) {
            object[i].classList.add('invisible');
        }
        return;
    }
    for (let i = startIndex; i < object.length; i++) {
        object[i].classList.remove('invisible');
    }
}

const hideAndShowExtraBlocks = () => {
    cards.forEach(card => {
        const timeBlocks = card.querySelectorAll('.card__time-block'),
            timeBlock = card.querySelector('.card__benefits-item_timetable-time-blocks'),
            maxBlockHeight = Math.max(...Array.from(timeBlocks).map(i => i.clientHeight));
        if (timeBlock.clientHeight > maxBlockHeight) {
            for (let i = 0; i < timeBlocks.length; i++) {
                if (i === timeBlocks.length-1) {
                    break;
                }
                const currentBlock = timeBlocks[i];
                if (timeBlocks[i].getBoundingClientRect().left > timeBlocks[i+1].getBoundingClientRect().left && !isExtraBlocksHidden) {
                    lastBlockValue = currentBlock.textContent;
                    currentBlock.textContent = 'Ещё...';
                    isExtraBlocksHidden = true;
                    giveClassToBlock(timeBlocks, i+1, true);
                    currentBlock.addEventListener('click', () => {
                        isExtraBlocksHidden = false;
                        currentBlock.textContent = lastBlockValue;
                        giveClassToBlock(timeBlocks, i+1);
                    });
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    hideAndShowExtraBlocks();
});

window.addEventListener('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        hideAndShowExtraBlocks();
    }, 250);
});
