class Wave {
    constructor() {
        this.number = 0;
        this.active = false;
        this.groupAmount = 10;
        this.groupSize = 1;
        this.timer = 0;
        this.groupDelay = 60;
        this.memberDelay = 5;
        this.currentGroup = 0;
        this.currentMember = 0;
        this.enemyStrength = 1;
    }

    updateDifficulty() {
        this.groupSize = this.number % 10;
        this.enemyStrength = floor(this.number / 10) + 1;
        if(this.groupSize == 0 ) {
            this.groupSize = 10;
            this.enemyStrength -= 1;
        }
    }

    start() {
        if(this.active == false && enemies.length == 0) {
            this.number ++;
            this.active = true;
            this.timer = 0;
            this.updateDifficulty();
            checkWave();
        }
    }

    timeToSpawn(group, member) {
        //How much time per group 
        var groupDuration = this.memberDelay * (this.groupSize - 1);
         //When a certain group will start 
        var groupStart = group * (this.groupDelay + groupDuration);
          //When a certain member will start (after its group starts) 
        var memberStart = member * this.memberDelay;

        if(this.timer == groupStart + memberStart) { 
            return true; 
        }else{ 
            return false; 
        }
    }

    spawnEnemies() {
        if(this.timeToSpawn(this.currentGroup, this.currentMember)) {
            enemies.push(new Enemy(this.enemyStrength, 3, levelOneNodes));
            this.currentMember++;
            if(this.currentMember >= this.groupSize) {
                this.currentGroup ++;
                this.currentMember = 0;
                if(this.currentGroup >= this.groupAmount) {
                    this.currentGroup = 0;
                    this.active  = false;
                }
            }
        }
    }

    update() {
        if(this.active) {
            this.spawnEnemies();
            this.timer++;
        }
    }
}