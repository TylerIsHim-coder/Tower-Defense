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
    }

    timeToSpawn(group, member) {
        //How much time per group 
        var groupDuration = this.memberDelay * (this.groupSize - 1);
         //When a certain group will start 
        var groupStart = group * (groupDelay + groupDuration);
          //When a certain member will start (after its group starts) 
        var memberStart = member * memberDelay;

        if(timer == groupStart + memberStart) { 
            return true; 
        }else{ 
            return false; 
        }
    }
}