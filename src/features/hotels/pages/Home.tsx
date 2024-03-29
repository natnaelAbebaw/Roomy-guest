import styled from "styled-components";
import Search from "../components/SearchBox";
import { useEffect, useRef } from "react";
import HotelsTopFilters from "../components/HotelTopFilters";
import Hotels from "../components/Hotels";
import { useDispatch } from "react-redux";
import { setSticky } from "../hotelSlice";

const Hero = styled.div`
  padding: 0 10rem;
  color: var(--color-grey-900);
  margin-bottom: 20rem;
  margin-top: 8rem;
  h1 {
    font-size: 6.2rem;
    font-weight: 700;
    letter-spacing: 0.5px;

    text-transform: uppercase;
  }
  p {
    font-size: 2.4rem;
    letter-spacing: 2px;
    color: var(--color-grey-0);
    margin-bottom: 3rem;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  }
`;

const HeroBg = styled.div`
  padding: 5rem 0 0 5rem;
  height: 60vh;
  background-size: cover;
  background-color: rgb(255, 97, 63, 0.3);
  background-position: 100% 50%;

  background-blend-mode: multiply;
  border-radius: 2.5rem;
`;
const StyledHome = styled.div`
  height: 200vh;
`;
function Home() {
  const dispatch = useDispatch();
  const sentinelRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        dispatch(setSticky(!entry.isIntersecting));
      },
      { threshold: [0], root: null, rootMargin: "-100px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
    // };
  }, [dispatch]);
  return (
    <StyledHome>
      <Hero ref={sentinelRef}>
        <HeroBg>
          <h1>Find the best hotels</h1>
          <p>Find the best hotels in your city</p>
        </HeroBg>
        <Search />
      </Hero>

      <HotelsTopFilters />

      <Hotels />
    </StyledHome>
  );
}

export default Home;
