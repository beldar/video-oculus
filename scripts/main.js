function animate(a){requestAnimationFrame(animate),lastTimeMsec=lastTimeMsec||a-1e3/60;var b=Math.min(200,a-lastTimeMsec);lastTimeMsec=a,videoTexture&&(videoTexture.needsUpdate=!0),updateFcts.forEach(function(c){c(b/1e3,a/1e3)})}Detector.webgl||(console.log("No WebGL"),Detector.addGetWebGLMessage(),document.getElementById("container").innerHTML="");var renderer=new THREE.WebGLRenderer;renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(renderer.domElement);var updateFcts=[],scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.01,100);camera.position.z=3;var winResize=new THREEx.WindowResize(renderer,camera),effect=new THREE.OculusRiftEffect(renderer,{worldFactor:10,HMD:{hResolution:window.innerWidth,vResolution:window.innerHeight,hScreenSize:.14976,vScreenSize:.0936,interpupillaryDistance:.0805,lensSeparationDistance:.0805,eyeToScreenDistance:.041,distortionK:[1,.22,.24,0],chromaAbParameter:[.996,-.004,1.014,0]}});video=document.getElementById("video"),video.src="video/earth.mp4",video.setAttribute("crossorigin","anonymous"),video.load();var start=function(){document.getElementById("start").style.display="none";var a=document.documentElement,b=a.requestFullScreen||a.webkitRequestFullScreen||a.mozRequestFullScreen;b.call(a),effect.setSize(window.innerWidth,window.innerHeight),video.play(),requestAnimationFrame(animate)};document.addEventListener("touchstart",start),document.addEventListener("click",start);var videoTexture=new THREE.Texture(video),geometry=new THREE.PlaneGeometry(10,10),material=new THREE.MeshBasicMaterial({map:videoTexture,overdraw:!0,side:THREE.DoubleSide}),mesh=new THREE.Mesh(geometry,material);scene.add(mesh),updateFcts.push(function(){effect.render(scene,camera)});var lastTimeMsec=null;