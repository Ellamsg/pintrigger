import { useEffect, useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import './app.css'

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);
  const extraTextsRef = useRef([]);
  const headerLeftRef = useRef(null);
  const headerRightRef = useRef(null);
  const middleImageContainerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
  
    imagesRef.current = imagesRef.current.slice(0, 3);
    textsRef.current = textsRef.current.slice(0, 3);
    extraTextsRef.current = extraTextsRef.current.slice(0, 6);
  
    // Initial state for headers and images
    gsap.set([headerLeftRef.current, headerRightRef.current], {
      opacity: 5,
    });
  
    // Set initial grayscale for all images
    imagesRef.current.forEach(img => {
      gsap.set(img, {
        filter: 'grayscale(100%) brightness(30%)',
      });
    });
  
    // Animate the middle image and split headers before the container is pinned
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top top",
        scrub: 1,
      },
    })
      // Start with header opacity and split
      .to(
        [headerLeftRef.current, headerRightRef.current],
        {
          opacity: 0.5,
          duration: 1,
          ease: "power1.out",
        }
      )
      .to(
        headerLeftRef.current,
        {
          x: "-100px",
          duration: 1.5,
          ease: "power1.out",
        }
      )
      .to(
        headerRightRef.current,
        {
          x: "100px",
          duration: 1.5,
          ease: "power1.out",
        },
        "<"
      )
      // Then bring in middle image
      .fromTo(
        imagesRef.current[1],
        {
          opacity: 0,
          y: "200vh",
          rotateZ: -15,
          filter: 'grayscale(40%)',
        },
        {
          opacity: 1,
          y: "-170px",
          rotateZ: 0,
          filter: 'grayscale(400%) brightness(20%)',
          duration: 2,
          ease: "power1.out",
        }
      )
      // Immediate color return for middle image
      .to(
        imagesRef.current[1],
        {
          filter: 'grayscale(0%)',
          duration: 2,
          ease: "power2.inOut",
        },
        ">"
      )
      .fromTo(
        textsRef.current[1],
        { opacity: 0, y: "150vh" },
        { opacity: 0.3, y: "-50px", duration: 2, ease: "power1.out" },
        "-=1.5"
      );
  
    // Pin and animate the container
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=700",
        scrub: 1,
        pin: true,
      },
    });
  
    // Complete the header split while maintaining light opacity
    timeline
      .to(headerLeftRef.current, {
        x: "-200px",
        duration: 1.5,
        ease: "power2.out",
      })
      .to(
        headerRightRef.current,
        {
          x: "200px",
          duration: 1.5,
          ease: "power2.out",
        },
        0
      )
      .to(
        imagesRef.current[1],
        {
          y: "-130px",
          duration: 1.5,
          ease: "power2.out",
        },
        0
      );
  
    // Animate side images with grayscale and independent color return
    [0, 2].forEach((index) => {
      timeline
        .fromTo(
          imagesRef.current[index],
          {
            opacity: 0,
            y: "200vh",
            rotateZ: -50,
            filter: 'grayscale(90%)',
          },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            filter: 'grayscale(100%) brightness(40%)',
            duration: 3,
            ease: "power1.out",
          }
        )
        .fromTo(
          textsRef.current[index],
          { opacity: 0, y: "150vh" },
          { opacity: 0.3, y: 0, duration: 3, ease: "power1.out" },
          "-=2.5"
        )
        // Add immediate color return for each image independently
        .to(
          imagesRef.current[index],
          {
            filter: 'grayscale(0%)',
            duration: 2,
            ease: "power2.inOut",
          },
          ">"
        );
    });
  
    // Continue with remaining animations
    timeline
      .to(
        [headerLeftRef.current, headerRightRef.current],
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
        }
      )
      .to(
        textsRef.current,
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        imagesRef.current[1],
        {
          y: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        "+=0.5"
      )
      .to(
        [headerLeftRef.current, headerRightRef.current],
        {
          x: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<"
      );
  
    // Animate additional texts
    extraTextsRef.current.forEach((el, index) => {
      timeline
        .fromTo(
          el,
          { opacity: 0, y: "150vh" },
          { opacity: 0.3, y: 0, duration: 2, ease: "power1.out" },
          "+=0.5"
        )
        .to(
          el,
          { opacity: 1, duration: 1.5, ease: "power2.inOut" },
          ">"
        );
    });
  
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  return (
    <div style={{backgroundColor:"white" ,color:"black"}}>
      {/* Previous paragraph content */}



      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p style={{paddingBottom:"100px"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p style={{paddingBottom:"100px"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>

      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p style={{paddingBottom:"100px"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
      
      <div style={{ height: "220vh", backgroundColor: "white" }}>

        <div ref={containerRef} style={{ position: "relative", padding: "20px 0" }}>
          {/* Header container with increased height for animation */}
          <div  style={{ 
            height: "120px",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ 
              textAlign: "center", 
              display: "flex", 
              justifyContent: "center", 
              position: "relative",
              zIndex: 2,
              color:"black",
            }}>
              <h1 ref={headerLeftRef} style={{ margin: "0 10px" }}>Advantages</h1>
              <h1 ref={headerRightRef} style={{ margin: "0 10px" }}> of Images</h1>
            </div>
          </div>
        
          <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "white" }}>
            {[
              { label: "First Image", 
                src: "https://townsquare.media/site/812/files/2023/07/attachment-chris-brown.jpg?w=980&q=75" },
              { label: "Middle Image", 
                src: "https://townsquare.media/site/812/files/2023/07/attachment-chris-brown.jpg?w=980&q=75" },
              { label: "Last Image", 
                src: "https://townsquare.media/site/812/files/2023/07/attachment-chris-brown.jpg?w=980&q=75" },
            ].map((item, index) => (
              <div
                key={index}
                ref={index === 1 ? middleImageContainerRef : null}
                style={{ 
                
                  width: "30%", 
                  textAlign: "center",
                  position: index === 1 ? "relative" : "static",
                  zIndex: index === 1 ? 1 : "auto"
                }}
              >
                <img
                  ref={(el) => (imagesRef.current[index] = el)}
                  src={item.src}
                  alt={item.label}
                  style={{
                    width: "200px",
                    height: "300px",
                    objectFit: "cover",
                    opacity: 0,
                  }}
                />
                <p
                  ref={(el) => (textsRef.current[index] = el)}
                  style={{
                    marginTop: "20px",
                    fontSize: "1rem",
                    color: "#555",
                    opacity: 0,
                  }}
                >
                  
                </p>
              </div>
            ))}
          </div>

          {/* Extra texts */}
          {[...Array(5)].map((_, index) => (
            <div key={index} ref={(el) => (extraTextsRef.current[index] = el)}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining paragraph content */}

      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>
         <p style={{paddingBottom:"100px"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Aperiam repellendus est ipsam nulla officia facilis aliquam esse consequatur
         mollitia nemo recusandae, amet libero commodi saepe voluptates facere, vel, pariatur perspiciatis!</p>

    </div>
  )
}