var TC = TC || {};

TC.LEVEL = {
    LEVEL_1:1,
    LEVEL_2:2,
    LEVEL_3:3,
    LEVEL_4:4,
    LEVEL_5:5
};

TC.TROOP_TYPE = {
    COMBATANT:      0,
    ARCHER:         1,
    HULK:           2,
    FLYING_BOMB:    3,
}

TC.CONTAINER = {
    TROOPS:[]
};

TC.ARM = [
    {
        LEVEL_1: "ARM_1_1",
        LEVEL_2: "ARM_1_2",
        LEVEL_3: "ARM_1_3",
        LEVEL_4: "ARM_1_4"
    },
    {
        LEVEL_1: "ARM_2_1",
        LEVEL_2: "ARM_2_2",
        LEVEL_3: "ARM_2_3",
        LEVEL_4: "ARM_2_4"
    },
    {
        LEVEL_1: "ARM_4_1",
        LEVEL_2: "ARM_4_2",
        LEVEL_3: "ARM_4_3",
        LEVEL_4: "ARM_4_4"
    },
    {
        LEVEL_1: "ARM_6_1",
        LEVEL_2: "ARM_6_2",
        LEVEL_3: "ARM_6_3"
    }
];

TC.atack_url = "/attack01";
TC.idle_url = "/idle";
TC.run_url = "/run";

TC.TROOP_STATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK:2
};
