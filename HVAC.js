
defineVirtualDevice("HVAC_test", {
    title: 'HVAC',
    cells: {
        "enabled": {
            type: "switch",
            value: true
        }
    }
});



defineRule("switch", {
    whenChanged: "/devices/wb-gpio/controls/A1_IN",
    then: function(newValue, devName, cellName) {
        if (newValue == dev["HAVAC_test/enabled"]){
            dev["wb-gpio"]["EXT1_R3A1"] = newValue;
        }else{
            dev["wb-gpio"]["EXT1_R3A1"] = newValue;
            log("ALARM A1_IN");
        }
    }
});



defineRule("timer", {
    whenChanged: dev["HAVAC_test/enabled"],
    then: function(newValue, devName, cellName) {
        if (dev["HAVAC_test/enabled"] == true){
            setTimeout(function(){
                if(dev["wb-gpio"]["A2_IN"] == false){
                    dev["HAVAC_test/enabled"] = true;
                    log("ALARM A2_IN");
                }
            });
        }
    }
});



defineRule("temperature", {
    whenChanged: dev["HAVAC_test/enabled"],
    then: function(newValue, devName, cellName) {
        if (dev["HAVAC_test/enabled"] == true){
            if(dev["wb-w1"]["28-00000d6b460c"] > 25){
                dev["wb-mao4_209"]["Channel 1"] = 8000;
            }else{
                dev["wb-mao4_209"]["Channel 1"] = 2000;
            }
        }else{
            dev["wb-mao4_209"]["Channel 1"] = 0;
        }
    }
});