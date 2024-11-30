import styled from "styled-components";
import SearchBox from "../features/hotels/components/SearchBox";
import Container, { Length } from "../ui/Container";
import { Color, Font, Spacing } from "../ui/cssConstants";
import Header from "../ui/Header";
import Heading from "../ui/Heading";
import { SearchFormActionType } from "../context/GlobalContext";
import Text, { FontWeight, TextAlign } from "../ui/Text";
import EasyFilter from "../ui/EasyFilter";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getBookingsOfGuest } from "../services/BookingApi";
import BookingRow from "../features/booking/BookingRow";
import Flex, { FlexAlign, FlexJustify } from "../ui/Flex";
import PageLimit, { LimitOptions } from "../ui/PageLimit";
import ReactPaginate from "react-paginate";
import Button, { ButtonType } from "../ui/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../ui/Pagination.css";
import TableShimmer from "../ui/TableShimmer";
import { Table } from "../ui/Table";
import { useAuth } from "../features/Authentication/AuthProvider";
const TopHeader = styled.div`
  position: relative;
`;

const filters = [
  { label: "All", value: "" },
  { label: "Unconfrimed", value: "status=unconfirmed" },
  { label: "Check in", value: "status=checkedin" },
  { label: "Check out", value: "status=checkedout" },
  { label: "Pending", value: "paymentStatus=pending" },
  { label: "Paid", value: "paymentStatus=paid" },
];

function Bookings() {
  const [selectedFilter, setSelectedFilter] = useState<{
    label: string;
    value: string;
  }>(filters[0]);

  const [currentPage, setCurrentPage] = useState(1);

  const [maxPages, setMaxPages] = useState(0);
  const { guest } = useAuth();

  const [pageLimit, setPageLimit] = useState<{
    label: string;
    value: string | number;
  }>(LimitOptions[0]);
  console.log("guest---", guest);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: [
      "bookingsForGuest",
      currentPage,
      pageLimit,
      selectedFilter.value,
    ],
    queryFn: () =>
      getBookingsOfGuest(
        guest?._id || "",
        currentPage,
        pageLimit.value as number,
        selectedFilter.value
      ),
  });

  const { bookings, maxBookings } = bookingsData || {};

  useEffect(() => {
    if (maxBookings == undefined) return;
    setMaxPages(Math.ceil((maxBookings || 0) / (pageLimit.value as number)));
  }, [maxBookings, pageLimit]);

  function handlePageClick({ selected }: { selected: number }) {
    setCurrentPage(selected + 1);
  }

  if (!guest) return null;

  return (
    <Container>
      <TopHeader>
        <Header
          isFixed={true}
          padding={[Spacing.s24, Length.L16, Spacing.s24]}
        />
        <SearchBox
          fixed={true}
          defaultState={SearchFormActionType.stickyOnTop}
        />
      </TopHeader>
      <Container mT={Spacing.s96} padding={[Spacing.s24, Length.L16]}>
        <Heading fs={Font.fs30} fontWeight={FontWeight.Bold} mb={Spacing.s12}>
          Bookings
        </Heading>
        <Text
          color={Color.grey600}
          fontWeight={FontWeight.Medium100}
          mB={Spacing.s32}
        >
          Effortlessly Reserve Your Ideal Getaway and Experience Comfort Like
          Never Before
        </Text>
        <Container mB={Spacing.s12}>
          <EasyFilter
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            filterObject={filters}
          />
        </Container>
        <Table>
          {isLoading ? (
            new Array((pageLimit.value as number) + 3)
              .fill(0)
              .map((_, index) => <TableShimmer key={index} />)
          ) : bookings && bookings?.length > 0 ? (
            bookings?.map((booking) => <BookingRow booking={booking} />)
          ) : (
            <Text
              fontWeight={FontWeight.Medium}
              fontSize={Font.fs18}
              textAlign={TextAlign.Center}
            >
              You don't have bookings yet.
            </Text>
          )}
        </Table>
        {bookings && bookings?.length > 0 && (
          <Container width={Length.Full}>
            <Flex
              width={Length.Full}
              justify={FlexJustify.SpaceBetween}
              align={FlexAlign.Center}
              p={[Spacing.s12, Spacing.zero]}
            >
              <PageLimit
                selected={pageLimit}
                onSelected={(value) => {
                  setPageLimit(value);
                  setCurrentPage(1);
                }}
              />

              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={maxPages}
                forcePage={currentPage - 1}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />

              <Flex>
                <Button
                  buttonType={ButtonType.Outline}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  padding={[Spacing.s8, Spacing.s12]}
                  borderColor={Color.grey300}
                  disabled={maxPages == 0 || currentPage === 1}
                >
                  <Flex align={FlexAlign.Center}>
                    <MdKeyboardArrowLeft fontSize={Font.fs20} />
                    <span>Previous</span>
                  </Flex>
                </Button>
                <Button
                  buttonType={ButtonType.Outline}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  padding={[Spacing.s8, Spacing.s12]}
                  borderColor={Color.grey300}
                  disabled={maxPages == 0 || currentPage === maxPages}
                >
                  <Flex align={FlexAlign.Center}>
                    <span>Next</span>
                    <MdKeyboardArrowRight fontSize={Font.fs20} />
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default Bookings;
