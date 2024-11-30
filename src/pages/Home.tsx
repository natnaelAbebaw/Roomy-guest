import styled from "styled-components";
import Search from "../features/hotels/components/SearchBox";
import { useEffect, useRef } from "react";
import HotelsTopFilters from "../features/hotels/components/HotelTopBar";
import Hotels from "../features/hotels/components/Hotels";
import Header from "../ui/Header";
import {
  SearchFormActionType,
  useGlobalContext,
} from "../context/GlobalContext";
import { Spacing } from "../ui/cssConstants";

const StyledHome = styled.div`
  height: 200vh;
`;
function Home() {
  const { dispatch } = useGlobalContext();
  const sentinelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        dispatch?.(SearchFormActionType.normal);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("isstiky", entry.isIntersecting);
        dispatch?.(
          !entry.isIntersecting
            ? SearchFormActionType.stickyOnTop
            : SearchFormActionType.normal
        );
      },
      { threshold: [0], root: null, rootMargin: "-150px" }
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
      <Header
        mb={Spacing.s24}
        isFixed={true}
        // padding={[Spacing.s24, Spacing.s96, Spacing.s64, Spacing.s96]}
      />

      <div ref={sentinelRef}>
        <Search />
      </div>

      <HotelsTopFilters />

      <Hotels />
    </StyledHome>
  );
}

export default Home;
