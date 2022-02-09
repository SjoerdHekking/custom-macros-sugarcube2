// Made by SjoerdHekking with too much help from Gwen
// SETUP
setup.circle = {
    msg: "Error".split(""),
    size: 14,
    circleY: 1,
    circleX: 1,
    letter_spacing: 5,
    diameter: 22,
    rotation: 0.2,
    speed: 0.5,
    currStep: 20,
    y: [],
    x: [],
    Y: [],
    X: [],
    circleInitnopy: false,
    circleFirstDiv: document.createElement("div"),
    circleSecondDiv: document.createElement("div"),
    circleMouse: function (e) {
      e = e || window.event;
      setup.circle.ymouse = !isNaN(e.pageY) ? e.pageY : e.clientY; // setup.circle.y-position
      setup.circle.xmouse = !isNaN(e.pageX) ? e.pageX : e.clientX; // setup.circle.x-position
    },
    makeCircle: function () { // rotation/positioning
      if (setup.circle.circleInitnopy) {
        setup.circle.circleFirstDiv.style.top = document.body.scrollTop + "px";
        setup.circle.circleFirstDiv.style.left = document.body.scrollLeft + "px";
      }
      setup.circle.currStep -= setup.circle.rotation;
      for (let i = setup.circle.n; i > -1; --i) { // makes the circle
        let d = document.getElementById("iemsg" + i).style;
        d.top = Math.round(setup.circle.y[i] + setup.circle.a * Math.sin((setup.circle.currStep + i) / setup.circle.letter_spacing) * setup.circle.circleY - 15) + "px";
        d.left = Math.round(setup.circle.x[i] + setup.circle.a * Math.cos((setup.circle.currStep + i) / setup.circle.letter_spacing) * setup.circle.circleX) + "px";
      }
    },
    circleDrag: function () { // makes the resistance
      setup.circle.y[0] = setup.circle.Y[0] += (setup.circle.ymouse - setup.circle.Y[0]) * setup.circle.speed;
      setup.circle.x[0] = setup.circle.X[0] += (setup.circle.xmouse - 20 - setup.circle.X[0]) * setup.circle.speed;
      for (let i = setup.circle.n; i > 0; --i) {
        setup.circle.y[i] = setup.circle.Y[i] += (setup.circle.y[i - 1] - setup.circle.Y[i]) * setup.circle.speed;
        setup.circle.x[i] = setup.circle.X[i] += (setup.circle.x[i - 1] - setup.circle.X[i]) * setup.circle.speed;
      }
      setup.circle.makeCircle();
    },
    circleInit: function () { // appends message divs, & sets initial values for positioning arrays
      setup.circle.n = setup.circle.msg.length - 1;
      setup.circle.a = Math.round(setup.circle.size * setup.circle.diameter * 0.20);
      setup.circle.ymouse = setup.circle.a * setup.circle.circleY + 20;
      setup.circle.xmouse = setup.circle.a * setup.circle.circleX + 20;
      setup.circle.circleFirstDiv.id = "outerCircleText";
      setup.circle.circleFirstDiv.style.fontSize = setup.circle.size + "px";
      if (!isNaN(window.pageYOffset)) {
        setup.circle.ymouse += window.pageYOffset;
        setup.circle.xmouse += window.pageXOffset;
      }
      else
        setup.circle.circleInitnopy = true;
      for (let i = setup.circle.n; i > -1; --i) {
        let d = document.createElement("div");
        d.id = "iemsg" + i;
        d.style.height = setup.circle.a + "px";
        d.style.width = setup.circle.a + "px";
        d.appendChild(document.createTextNode(setup.circle.msg[i]));
        setup.circle.circleSecondDiv.appendChild(d); setup.circle.y[i] = setup.circle.x[i] = setup.circle.Y[i] = setup.circle.X[i] = 0;
      }
      setup.circle.circleFirstDiv.appendChild(setup.circle.circleSecondDiv);
      document.body.appendChild(setup.circle.circleFirstDiv);
      setInterval(setup.circle.circleDrag, 25);
    },
    circleAscroll: function () {
      setup.circle.ymouse += window.pageYOffset;
      setup.circle.xmouse += window.pageXOffset;
      window.removeEventListener("scroll", setup.circle.circleAscroll, false);
    }
  };
  
  // MACRO
  
  Macro.add("wordwheel", {
    tags: ["fontSize", "fontsize", "circleSize", "circlesize"],
    handler: function () {
        let errorArray = [];
        if (!window.addEventListener && !window.attachEvent && !document.createElement) {errorArray.push("Unable to either add EvenListener, AttachEvent or createElement")}; 
        if(this.args.length <= 0)
            return this.error("First argument cannot be skipped, please insert a string via <<wordwheel \"Text here.\">>.");
        if(this.args[0] === "")
            return this.error("First argument cannot be an empty string.");
        if(this.args[0].length > 31)
            return this.error("Word wheel doesn't accept more than 50 characters.");
        
        setup.circle.msg = this.args[0].split("");


        for (const pay of this.payload) {
            switch (pay.name.toLowerCase()) {
            case "fontsize":
                if (pay.args[0] > 30)
                    errorArray.push("Font size cannot be bigger than 30.");
                if (pay.args[0] < 4)
                    errorArray.push("Font size cannot be negative nor below 4.");
            
                setup.circle.size = pay.args[0];
            break;
            case "circlesize":
                if (pay.args[0] > 70)
                    errorArray.push("Circle size cannot be above 70.");
                if (pay.args[0] < 20)
                    errorArray.push("Circle size cannot be below 20");

                setup.circle.diameter = pay.args[0];
            break;
            }
        }
  
        if (errorArray.length > 0)
            return this.error(errorArray.join("\n"));

        else if (window.addEventListener) {
            setup.circle.circleInit();
            document.addEventListener("mouseover", setup.circle.circleMouse, false);
            document.addEventListener("mousemove", setup.circle.circleMouse, false);
            if (/Apple/.test(navigator.vendor))
            window.addEventListener("scroll", setup.circle.circleAscroll, false);
        }
        else if (window.attachEvent) {
            // window.attachEvent("onload", setup.circle.circleInit);
            document.attachEvent("onmousemove", setup.circle.circleMouse);
        }
    }
  });