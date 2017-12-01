module.exports = [
    function(input) {
        var actions = {
            'on': function(x, y) {
                if (!this.grid[x][y]) {
                    this.grid.count++;
                    this.grid[x][y] = true;
                }
            },
            'off': function(x, y) {
                if (this.grid[x][y]) {
                    this.grid.count--;
                    this.grid[x][y] = false;
                }
            },
            'toggle': function(x, y) {
                (this.grid[x][y]) ? this.off(x, y) : this.on(x, y);
            },
            grid: initGrid(false)
        }
        
        input.map(parseCommand)
            .forEach(executeOn(actions));
        
        return actions.grid.count;
    },
    
    function(input) {
        var actions = {
            'on': function(x, y) {
                this.grid.count++;
                this.grid[x][y]++;
            },
            'off': function(x, y) {
                if (this.grid[x][y] > 0) {
                    this.grid.count--;
                    this.grid[x][y]--;
                }
            },
            'toggle': function(x, y) {
                this.grid.count = 2 + this.grid.count;
                this.grid[x][y] = 2 + this.grid[x][y];
            },
            grid: initGrid(0)
        }
        
        input.map(parseCommand)
            .forEach(executeOn(actions));
        
        return actions.grid.count;
    },
];

function initGrid(value) {
    var grid = [];
    for (var x = 0; x <= 999; x++) {
        grid[x] = [];
        for (var y = 0; y <= 999; y++) {
            grid[x][y] = value;
        }
    }
    grid.count = 0;
    return grid;
}

function parseCommand(command) {
    var tokens = command.split(' ');
    // align "toggle" with "turn on" and "turn off"
    if ('toggle' === tokens[0]) {
        tokens.unshift('toggle');
    }
    
    var start = tokens[2].split(',');
    var end = tokens[4].split(',');
    
    return {
        action: tokens[1],
        startx: parseInt(start[0], 10),
        starty: parseInt(start[1], 10),
        endx: parseInt(end[0], 10),
        endy: parseInt(end[1], 10),
        command: command
    }
}

function executeOn(actions) {
    return function(command) {
        for (var x = command.startx; x <= command.endx; x++) {
            for (var y = command.starty; y <= command.endy; y++) {
                actions[command.action](x, y);
            }
        }
        // console.log(command.command + ': ' + actions.grid.count);
    }
}
