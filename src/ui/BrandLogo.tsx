import styled from "styled-components";

const StyledBrandLogo = styled.div`
  font-size: 4.4rem;
  font-family: "Kanit", sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  letter-spacing: 0.8px;
`;
const StyleSpan = styled.span`
  color: var(--color-brand-700);
`;
const StlyedBrand = styled.div`
  font-size: 2.4rem;
`;

function BrandLogo() {
  return (
    <StyledBrandLogo>
      <StlyedBrand>
        Reserve<StyleSpan>On</StyleSpan>
      </StlyedBrand>
    </StyledBrandLogo>
  );
}

export default BrandLogo;
