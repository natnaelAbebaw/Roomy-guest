import { IoMdStarOutline } from "react-icons/io";
import styled from "styled-components";
import { Hotel } from "../../../services/hotelApi";

const StyledHotelCard = styled.div`
  width: 30rem;
  & img {
    width: 100%;
    height: 100%;
  }
  & h2 {
    font-size: 1.6rem;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & address {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1rem;
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
  & > .imgBox {
    height: 28rem;
    border-radius: 1rem;
    object-fit: cover;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  & > .HeadingBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > .HeadingBox > div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  & .price {
    font-size: 1.6rem;
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;
export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <StyledHotelCard>
      <div className="imgBox">
        <img src={hotel.mainImage} />
      </div>
      <div className="HeadingBox">
        <h2>{hotel.name}</h2>
        <div>
          <IoMdStarOutline /> <span>{hotel.ratingAverage}</span>
        </div>
      </div>
      <address>{hotel.address}</address>
      <div className="price">${hotel.priceRange.min} night-$480 total</div>
    </StyledHotelCard>
  );
}
